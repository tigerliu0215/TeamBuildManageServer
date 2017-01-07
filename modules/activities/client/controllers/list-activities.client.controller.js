/** Created by CUIJA on 01-06-2017.*/
/** Created by CUIJA on 01-06-2017.*/
(function () {
  'use strict';

  angular
    .module('activities')
    .controller('ActivitiesListController', ActivitiesListController);

  ActivitiesListController.$inject = ['ActivitiesService'];

  function ActivitiesListController(ActivitiesService) {
    var vm = this;

    vm.activities = ActivitiesService.query();

  }
}());
