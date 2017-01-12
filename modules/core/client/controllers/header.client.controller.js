(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', '$log','Authentication', 'menuService'];

  function HeaderController($scope, $state, $log, Authentication, menuService) {
    var vm = this;

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');
    vm.isHide = false;

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);
    $scope.$on('$hideHeader',hideHeader);


    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
      // showHeader();
    }

    function hideHeader(){
      $log.info('detect $rootScope hide header request');
      vm.isHide = true;
    }

    function showHeader(){
      $log.info('show header at current state');
      vm.isHide = false;
    }
  }
}());
