/** Created by CUIJA on 01-06-2017.*/
(function () {
  'use strict';


  angular
    .module('activities.admin')
    .controller('ActivitiesAdminController', ActivitiesAdminController)
    .config(customEditorConfig)
  ;

  ActivitiesAdminController.$inject = ['$scope', '$state', '$log', '$window',  'activitiesService', 'Authentication', 'Notification'];

  function ActivitiesAdminController($scope, $state, $log, $window, activity, Authentication, Notification) {
    var vm = this;

    vm.editorToolbarOptions = [
      [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'html'
      ],
      [
        'quote', 'bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'undo', 'redo', 'clear'
      ],
      [
        'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent', 'uploadImage', 'insertLink'
      ]
    ];

    vm.activity = activity;
    vm.authentication = Authentication;

    vm.form = {};

    vm.save = save;

    function save(isValid) {
      if (!isValid) {
        $log.info('activity form valid fail');
        $scope.$broadcast('show-errors-check-validity', 'vm.form.activityForm');
        return false;
      }

      $log.info('saving activity...');

      vm.activity.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $log.info('save activity response:', res);
        $state.go('admin.activities.list');
        Notification.success({
          message: '<i class="glyphicon glyphicon-ok"></i> Activity saved successfully!'
        });
      }

      function errorCallback(res) {
        $log.info('save activity response:', res);
        Notification.error({
          message: res.data.message,
          title: '<i class="glyphicon glyphicon-remove"></i> Activity save error!'
        });
      }
    }


  }

  customEditorConfig.$inject = ['$provide'];

  function customEditorConfig($provide) {
    $provide.decorator('taOptions', ['taRegisterTool', '$delegate','$log','$uibModal', function (taRegisterTool, taOptions,$log,$uibModal) {
      taRegisterTool('uploadImage', {
        iconclass: "glyphicon glyphicon-picture",
        action: function () {
          //when open image upload callback insert the image link
          //and add item to vm.activity.attachments.
          var self = this;
          var uploadImageModalInstance = $uibModal.open({
            templateUrl:'/modules/activities/client/views/admin/attachment.upload.client.view.html',
            controller:'AttachmentsController',
            controllerAs:'vm'
          });

          uploadImageModalInstance.result.then(
            function closeCallback(uploadResponse){
              $log.info('uploadResponse:',uploadResponse);
              var imgLink = '<img src="/'+uploadResponse.attachmentUrl+'">';
              self.$editor().wrapSelection('inserthtml', imgLink);

            },
            function dismissCallback(){

            }
          );


        }
      });
      return taOptions;
    }]);
  }


})();
