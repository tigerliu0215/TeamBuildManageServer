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

    return svc;
  }

})();
