/** Created by CUIJA on 01-06-2017.*/

(function () {
  'use strict';


  angular
    .module('activities')
    .controller('ActivitiesMobileViewController', ActivitiesMobileViewController);

  ActivitiesMobileViewController.$inject = ['$rootScope','$scope', '$state', '$log', '$window', 'activitiesService', 'Authentication', 'Notification','CommentsService' ];

  function ActivitiesMobileViewController($rootScope,$scope, $state, $log, $window, activity, Authentication, Notification,CommentsService) {
    var vm = this;

    vm.activity = activity;
    vm.authentication = Authentication;
    vm.form = {};


    $rootScope.$broadcast('$hideHeader',{});

  }
})();
