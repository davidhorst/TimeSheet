(function() {
  'use strict';

  angular.module('app')

  .controller('AccountsController', AccountsController);

  AccountsController.$inject = ['accountsdataservice', '$location', '$mdDialog'];

  function AccountsController(accountsdataervice, $location, $mdDialog) {

    var vm = this;
    vm.username;
    vm.showLogin = showLogin;
    vm.loginErrors = null;

    activate()

    // Private Methods
    function activate(){
      console.log("looking for existing account");
      if(!accountsdataervice.getUser()){
        $location.url('/login');
      }
    }

    function showLogin(ev) {
      var confirm = $mdDialog.prompt()
        .title('Who are you?')
        .textContent(vm.loginErrors)
        .placeholder('Enter your name here.')
        .ariaLabel('username')
        // .initialValue('Buddy')
        // .parent(angular.element(document.body))
        // .targetEvent(ev)
        .ok('Let me in!')
        .cancel('I don\'t belong here.');

      $mdDialog.show(confirm).then(function(result) {
          return accountsdataervice.login({username: result})
            .then(function(response){

              vm.username = response;
              $location.url('/dashboard')
            })
        }, function() {
          vm.status = 'You didn\'t name your dog.';
      });
    };

  }

})();
