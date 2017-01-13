/** Created by CUIJA on 01-06-2017.*/
(function () {
  'use strict';

  angular
    .module('activities.services')
    .factory('ActivitiesService', ActivitiesService);

  ActivitiesService.$inject = ['$resource', '$log'];

  function ActivitiesService($resource,$log) {
    var Activity = $resource(
      '/api/activities/:activityId',
      {
        activityId: '@_id'
      },
      {
        query:{
          isArray:true,
          method: 'GET',
          params: {},
          transformResponse:function(response){
            return angular.fromJson(response).data;
          }
        },
        get:{
          transformResponse:function(response){
            return angular.fromJson(response).data;
          }
        },
        update:{
          method:'PUT'
        }
      }
    );

    angular.extend(Activity.prototype,{
      createOrUpdate : function(){
        var activity = this;
        return createOrUpdate(activity);
      }
    });

    return Activity;



    function createOrUpdate(activity){
     if(activity._id){
        return activity.$update(onSuccess,onError);
      }
      else{
        return activity.$save(onSuccess, onError);
      }
      // Handle successful response
      function onSuccess(activity) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }

    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }

})();
