/** Created by CUIJA on 01-06-2017.*/
(function () {
  'use strict';


  angular
    .module('activities.admin')
    .controller('ActivitiesAdminController', ActivitiesAdminController);

  ActivitiesAdminController.$inject = ['$scope', '$state', '$log', '$window', 'activitiesService', 'Authentication', 'Notification'];

  function ActivitiesAdminController($scope, $state, $log, $window, activity, Authentication, Notification) {
    var vm = this;

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
})();
