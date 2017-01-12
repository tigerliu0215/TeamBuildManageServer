/** Created by CUIJA on 01-06-2017.*/

(function () {
  'use strict';


  angular
    .module('activities')
    .controller('ActivitiesViewController', ActivitiesViewController);

  ActivitiesViewController.$inject = ['$scope', '$state', '$log', '$window', 'activitiesService', 'Authentication', 'Notification','ActivitiesActionService' ];

  function ActivitiesViewController($scope, $state, $log, $window, activity, Authentication, Notification,ActivitiesActionService) {
    var vm = this;

    vm.activity = activity;
    vm.authentication = Authentication;
    vm.form = {};
    vm.comment = {
      activityId:vm.activity._id,
      content:''
    };
    vm.activitiesActionService = ActivitiesActionService;
    vm.publishComment = publishComment;
    vm.toggleLike = toggleLike;
    vm.toggleCollect = toggleCollect;
    vm.toggleVotingSelection = toggleVotingSelection;
    vm.doVote = doVote;

    function publishComment(isValid){
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.commentForm');
        return false;
      }

      vm.activitiesActionService.publishComment(vm.comment,function(updatedActivity){
        vm.activity = updatedActivity;
        vm.comment.content = '';

        Notification.success({
          message: '<i class="glyphicon glyphicon-ok"></i> Comment Publish Successfully!'
        });
      });
    }

    function toggleLike(){
      var activityId = vm.activity._id;
      vm.activitiesActionService.toggleLike(activityId,function(updatedActivity){
        vm.activity = updatedActivity;
      })
    }

    function toggleCollect(){
      var activityId = vm.activity._id;
      vm.activitiesActionService.toggleCollect(activityId,function(updatedActivity){
        vm.activity = updatedActivity;
      })
    }

    function toggleVotingSelection(selection,sequence){
      $log.info('toggle votingSelection:',selection);
      $log.info('sequence:',sequence);
      if(!_.isArray(selection)){
        selection = [];
      }
      var idx = selection.indexOf(sequence);

      if (idx > -1) {
        selection.splice(idx, 1);
      }
      else {
        selection.push(sequence);
      }
      $log.info('after toggle selection:',selection);
    }

    function doVote(votingIndex,selection){
      $log.info('do voting for:',votingIndex);
      $log.info(selection);
      var activityId = vm.activity._id;
      vm.activitiesActionService.doVote(activityId,votingIndex,selection,function(updatedActivity){
        vm.activity = updatedActivity;
      });
    }
  }
})();
