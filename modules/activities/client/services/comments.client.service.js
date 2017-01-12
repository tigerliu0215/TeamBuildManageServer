/* Created by Aquariuslt on 2017-01-08.*/
/* Created by Aquariuslt on 2017-01-08.*/
(function () {
  'use strict';

  angular
    .module('activities.services')
    .factory('CommentsService', CommentsService);


  CommentsService.$inject = ['$http', '$log'];


  function CommentsService($http, $log) {
    $log.info('comment service is running');

    var svc = this;
    svc.publishComment = publishComment;
    svc.toggleLike = toggleLike;
    svc.toggleCollect = toggleCollect;

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

    return svc;
  }

})();
