/** Created by CUIJA on 01-06-2017.*/
(function () {
  'use strict';

  angular
    .module('activities.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.activities', {
        abstract: true,
        url: '/activities',
        template: '<ui-view></ui-view>'
      })
      .state('admin.activities.list', {
        url: '',
        templateUrl: '/modules/activities/client/views/admin/list-activities.client.view.html',
        controller:'ActivitiesAdminListController',
        controllerAs:'vm',
        data: {
          roles: ['admin'],
          pageTitle: 'Activities'
        }
      })
      .state('admin.activities.create', {
        url: '/create',
        templateUrl: '/modules/activities/client/views/admin/form-activity.client.view.html',
        controller: 'ActivitiesAdminController',
        controllerAs: 'vm',
        resolve: {
          activitiesService: createActivity
        },
        data: {
          roles: ['admin'],
          pageTitle: 'New Activity'
        }
      })
      .state('admin.activities.edit', {
        url: '/:activityId/edit',
        templateUrl: '/modules/activities/client/views/admin/form-activity.client.view.html',
        controller: 'ActivitiesAdminController',
        controllerAs: 'vm',
        resolve: {
          activitiesService: getActivity
        },
        data: {
          roles: ['admin']
        }
      })
    ;
  }

  getActivity.$inject = ['$stateParams', 'ActivitiesService'];
  createActivity.$inject = ['ActivitiesService'];

  function getActivity($stateParams, ActivitiesService) {
    var activityId = $stateParams.activityId;
    return ActivitiesService.get({
      activityId: activityId
    }).$promise;

  }

  function createActivity(ActivitiesService) {
    return new ActivitiesService();
  }


})();
