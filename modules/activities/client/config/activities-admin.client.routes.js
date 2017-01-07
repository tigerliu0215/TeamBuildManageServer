/** Created by CUIJA on 01-06-2017.*/
(function(){
  'use strict';

  angular
    .module('activities.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider){
    $stateProvider
      .state('admin.activities',{
        abstract:true,
        url:'/activities',
        template:'<ui-view></ui-view>'
      })
      .state('admin.activities.list',{
        url:'',
        templateUrl:'/modules/activities/client/views/admin/list-activities.client.view.html',
        data:{
          roles:['admin']
        }
      })
      .state('admin.activities.create',{
        url:'/create',
        templateUrl:'/modules/activities/client/views/admin/form-activity.client.view.html',
        data:{
          roles:['admin']
        }
      })
      .state('admin.activities.edit',{
        url:'/edit',
        templateUrl:'/modules/activities/client/views/admin/form-activity.client.view.html',
        data:{
          roles:['admin']
        }
      })
  }
})();
