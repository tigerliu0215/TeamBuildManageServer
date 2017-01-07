/** Created by CUIJA on 01-06-2017.*/
(function () {
  'use strict';

  angular
    .module('activities.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('activities', {
        abstract: true,
        url: '/activities',
        template: '<ui-view></ui-view>'
      })
      .state('activities.list', {
        url:'',
        templateUrl:'/modules/activities/client/views/list-activities.client.view.html',
        controller:'ActivitiesListController',
        controllerAs:'vm',
        data:{
          pageTitle:'Activities'
        }
      })
      .state('activities.view',{
        url:'/:activityId',
        templateUrl:'/modules/activities/client/views/view-activity.client.view.html',
        controller:'ActivitiesViewController',
        controllerAs:'vm',
        resolve:{
          activitiesService : getActivity
        },
        data:{
          pageTitle:'Activity : '
        }
      })
  }

  getActivity.$inject = ['$stateParams', 'ActivitiesService'];

  function getActivity($stateParams, ActivitiesService) {
    var activityId = $stateParams.activityId;
    return ActivitiesService.get({
      activityId: activityId
    }).$promise;

  }


})();
