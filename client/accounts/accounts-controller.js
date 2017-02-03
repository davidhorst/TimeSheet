(function() {
  'use strict';

  angular.module('app')

  .controller('AccountsController', AccountsController);

  AccountsController.$inject = [
    'accountsdataservice',
    'categorydataservice', 
    '$location',
    '$route', 
    '$mdDialog', 
    '$mdSidenav'
    ];

  function AccountsController(
    accountsdataervice,
    categorydataservice, 
    $location,
    $route, 
    $mdDialog, 
    $mdSidenav) {

    var vm = this;
    vm.username = null;
    vm.showLogin = showLogin;
    vm.loginErrors = null;
    vm.toggleMenu = toggleMenu;
    vm.closeMenu = closeMenu;
    vm.createCategory = createCategory;
    vm.status;
    vm.categories = {};
    vm.toolbarHeading = "Dashboard";
    vm.showCategory = showCategory;
    vm.goHome = goHome;
    // vm.totalEventMinutes = totalEventMinutes;

    activate()

    // Private Methods
    function activate(){
      console.log("looking for existing account");
      if(!accountsdataervice.getUser()){
        $location.url('/login');
      }
    }

    function goHome(){
      vm.closeMenu();
      vm.toolbarHeading = "Dashboard";
      $location.url('/dashboard')
      $route.reload();
    }

    function showLogin(ev) {
      var confirm = $mdDialog.prompt()
        .title('Who are you?')
        .textContent(vm.loginErrors)
        .placeholder('Enter your name here.')
        .ariaLabel('username')
        .ok('Let me in!')
        .cancel('I don\'t belong here.');

      $mdDialog.show(confirm).then(function(result) {
          return accountsdataervice.login({username: result})
            .then(function(response){
              vm.username = response.username;
              $location.url('/dashboard')
              // populate categories for sidenav
              return categorydataservice.getCategories(response._id)
                .then(function(returnedCategories){
                  vm.categories = returnedCategories;

                });
            })
        }, function() {
          vm.status = 'You didn\'t name your dog.';
      });
    };

    function toggleMenu(navID) {
       $mdSidenav('left').toggle()
    }

    function closeMenu (navID) {
      $mdSidenav('left').close()
    };

    function createCategory(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.prompt()
        .title('Name your new Category')
        .textContent('Keep it General')
        .placeholder('ex. Law Clinic Client')
        .ariaLabel('category')
        .targetEvent(ev)
        .ok('Create Category')
        .cancel('shit. nevermind.');

      $mdDialog.show(confirm).then(function(result) {
        var categoryObj = {
          _user: accountsdataervice.getUser()._id,
          name: result
        };
        console.log(categoryObj);
        return categorydataservice.addCategory(categoryObj)
          .then(addCategorySuccess)
          .catch(addCategoryFail)
          
          function addCategorySuccess(response){
            console.log("Added Category: ", response);
              return categorydataservice.getCategories(response.success._user)
                .then(function(returnedCategories){
                  console.log("returned Categories: ", returnedCategories)
                  vm.categories = returnedCategories;
                  vm.toggleMenu('left')
                });
          }

          function addCategoryFail(response){
            console.log("add cat fail: ", response);
            pass;  
          }

      }, function() {
        vm.status = 'You didn\'t name your dog.';
      });
    };

    function showCategory(index){
      vm.toggleMenu()
      vm.toolbarHeading = vm.categories[index].name;
      categorydataservice.setCategory(index);
      $location.url('/category');
      $route.reload();
      // console.log(index);
    }

  }

})();
