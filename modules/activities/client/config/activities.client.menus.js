/** Created by CUIJA on 01-06-2017.*/
(function () {
  'use strict';

  angular
    .module('activities')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

    menuService.addMenuItem('topbar', {
      title: 'Activities',
      state: 'activities',
      type: 'dropdown',
      roles: ['*']
    });


    menuService.addSubMenuItem('topbar', 'activities', {
      title: 'Activities',
      state: 'activities.list',
      roles: ['*']
    });

  }
})();
