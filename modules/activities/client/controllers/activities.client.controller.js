/** Created by CUIJA on 01-06-2017.*/
/** Created by CUIJA on 01-06-2017.*/
(function () {
  'use strict';


  angular
    .module('activities')
    .controller('ActivitiesViewController', ActivitiesViewController);

  ActivitiesViewController.$inject = ['$scope', '$state', '$log', '$window', 'activitiesService', 'Authentication', 'Notification'];

  function ActivitiesViewController($scope, $state, $log, $window, activity, Authentication, Notification) {
    var vm = this;

    vm.activity = activity;
    vm.authentication = Authentication;



  }
})();
