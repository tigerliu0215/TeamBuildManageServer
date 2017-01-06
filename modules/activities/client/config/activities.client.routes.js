/** Created by CUIJA on 01-06-2017.*/
(function(){
  'use strict';

  angular
    .module('activities.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider){
    $stateProvider
      .state('activities',{
      abstract:true,
      url:'/activities',
      template:'<ui-view></ui-view>'
    })
  }

})();
