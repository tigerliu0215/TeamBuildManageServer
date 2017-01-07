/** Created by CUIJA on 01-06-2017.*/
(function () {
  'use strict';

  angular
    .module('activities.admin')
    .controller('ActivitiesAdminListController', ActivitiesAdminListController);

  ActivitiesAdminListController.$inject = ['ActivitiesService'];

  function ActivitiesAdminListController(ActivitiesService) {
    var vm = this;

    vm.activities = ActivitiesService.query();

  }
}());
