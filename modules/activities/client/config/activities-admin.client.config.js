/** Created by CUIJA on 01-06-2017.*/
(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('activities.admin')
    .run(menuConfig)
  ;

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Activities',
      state: 'admin.activities.list'
    });
  }
}());
