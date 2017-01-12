/* Created by Aquariuslt on 2017-01-08.*/
/* Created by Aquariuslt on 2017-01-08.*/
(function () {
  'use strict';

  angular
    .module('activities.services')
    .factory('ActivitiesActionService', ActivitiesActionService);


  ActivitiesActionService.$inject = ['$http', '$log'];


  function ActivitiesActionService($http, $log) {
    $log.info('comment service is running');

    var svc = this;
    svc.publishComment = publishComment;
    svc.toggleLike = toggleLike;
    svc.toggleCollect = toggleCollect;
    svc.doVote = doVote;

    function publishComment(comment, callback) {
      var publishCommentApiUrl = '/api/activities/comments/publish/'+comment.activityId;

      $http({
        url:publishCommentApiUrl,
        method:'POST',
        data:comment
      }).then(
        function successCallback(response) {
          $log.info('publish comment response:',response.data);
          callback(response.data);
        },
        function errorCallback(response){

        }
      );
    }

    function toggleLike(activityId,callback){
      var toggleLikeApiUrl = '/api/activities/action/like/'+activityId;
      $http({
        url:toggleLikeApiUrl,
        method:'GET'
      }).then(
        function successCallback(response) {
          $log.info('toggle like response:',response.data);
          callback(response.data);
        },
        function errorCallback(response){

        }
      );
    }

    function toggleCollect(activityId,callback){
      var toggleCollectApiUrl = '/api/activities/action/collect/'+activityId;
      $http({
        url:toggleCollectApiUrl,
        method:'GET'
      }).then(
        function successCallback(response) {
          $log.info('toggle collect response:',response.data);
          callback(response.data);
        },
        function errorCallback(response){

        }
      );
    }

    function doVote(activityId,votingIndex,votingSelection,callback){
      var doVoteApiUrl = '/api/activities/action/vote/'+activityId+'/'+votingIndex;
      $http({
        url:doVoteApiUrl,
        method:'POST',
        data:{
          selection:votingSelection
        }
      }).then(
        function successCallback(response) {
          $log.info('do voting response:',response.data);
          callback(response.data);
        },
        function errorCallback(response){

        }
      );
    }

    return svc;
  }

})();
