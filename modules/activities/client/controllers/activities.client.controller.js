/** Created by CUIJA on 01-06-2017.*/

(function () {
  'use strict';


  angular
    .module('activities')
    .controller('ActivitiesViewController', ActivitiesViewController);

  ActivitiesViewController.$inject = ['$scope', '$state', '$log', '$window', 'activitiesService', 'Authentication', 'Notification','CommentsService' ];

  function ActivitiesViewController($scope, $state, $log, $window, activity, Authentication, Notification,CommentsService) {
    var vm = this;

    vm.activity = activity;
    vm.authentication = Authentication;
    vm.form = {};
    vm.comment = {
      activityId:vm.activity._id,
      content:''
    };
    vm.commentsService = CommentsService;
    vm.publishComment = publishComment;
    vm.toggleLike = toggleLike;
    vm.toggleCollect = toggleCollect;


    function publishComment(isValid){
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.commentForm');
        return false;
      }

      vm.commentsService.publishComment(vm.comment,function(updatedActivity){
        vm.activity = updatedActivity;
        vm.comment.content = '';

        Notification.success({
          message: '<i class="glyphicon glyphicon-ok"></i> Comment Publish Successfully!'
        });
      });
    }

    function toggleLike(){
      var activityId = vm.activity._id;
      vm.commentsService.toggleLike(activityId,function(updatedActivity){
        vm.activity = updatedActivity;
      })
    }

    function toggleCollect(){
      var activityId = vm.activity._id;
      vm.commentsService.toggleCollect(activityId,function(updatedActivity){
        vm.activity = updatedActivity;
      })
    }

  }
})();
