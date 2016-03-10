(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($log, auth, $rootScope, $state) {
    var vm = this;

    vm.login = function() {
      var onSuccess = function(response) {
        $log.debug('login success');

        vm.loginErrorMsg = undefined;

        // if the next state is login, it will go to profile state
        if ($rootScope.toState.name == 'login') {
          $state.go('profile');
        } else {
          if (angular.isDefined($rootScope.toStateParams)) {
            $state.go($rootScope.toState.name, $rootScope.toStateParams);
          } else {
            $state.go($rootScope.toState.name);
          }
        }
      };
      var onFailure = function(response) {
        $log.debug('login error');

        if (response.status == 401) {
          vm.loginErrorMsg = '帳號或密碼錯誤';
        } else {
          vm.loginErrorMsg = '伺服器錯誤';
        }
      };
      auth.authenticate(vm.credentials).then(onSuccess).catch(onFailure);
    }
  }
})();
