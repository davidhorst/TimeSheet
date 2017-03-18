(function() {
  'use strict';

  angular.module('app')

  .controller('LoginController', LoginController);

  LoginController.$inject = [
    'sessionservice',
    '$mdDialog',
    '$state'
    ];

  function LoginController(
    sessionservice,
    $mdDialog,
    $state) {

    var vm = this;
    vm.loginErrors;
    // var ev = Document.window
    vm.showLogin = login;
    // login();

    function login(ev) {
      var confirm = $mdDialog.prompt()
        .title('Who are you?')
        .textContent(vm.loginErrors)
        .placeholder('Enter your name here.')
        .ariaLabel('username')
        .ok('Let me in!')
        .cancel('I don\'t belong here.');

      $mdDialog.show(confirm)
        .then(dialogSuccess, dialogFailed);
        
      function dialogSuccess(result) {
          console.log("login Success", result)
          return sessionservice.login({username: result})
            .then(function(response){
              $state.go('index.dashboard')
            }).catch(function(result){console.log("error", result)})
        };
      function dialogFailed(error) {
        console.log("login failed", error)
      };

    };

  }

})();
