(function() {
  'use strict';

  angular.module('app')

  .controller('LayoutController', LayoutController);

  LayoutController.$inject = ['$mdDialog', 'sessionservice', 'categoryservice', '$state'];

  function LayoutController($mdDialog, sessionservice, categoryservice, $state) {

    var vm = this;
    vm.categories;
    vm.goHome = goHome;
    vm.printToCSV = printToCSV;
    vm.logout = logout;
    vm.createCategory = createCategory;

    activate();

    function activate(){
        console.log("layout activated")
        vm.user = sessionservice.getUserID();
        return categoryservice.getCategories(sessionservice.getUserID())
          .then(function(categories){ 
            vm.categories = categories;
          })
          .catch(function(error){
            console.log("get categories failed with ", error)
          });
    }

    function goHome(){
      $state.go('index.dashboard', {}, {reload: true})
    }

    function createCategory(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
      console.log("create Cat")
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
          _user: sessionservice.getUserID(),
          name: result
        };
        console.log(categoryObj);
        return categoryservice.addCategory(categoryObj)
          .then(addCategorySuccess)
          .catch(addCategoryFail)
          
          function addCategorySuccess(response){
            console.log("Added Category: ", response);
              return categoryservice.getCategories(response.success._user)
                .then(function(returnedCategories){
                  console.log("returned Categories: ", returnedCategories)
                  vm.categories = returnedCategories;
                  vm.toggleMenu('left')
                });
          }

          function addCategoryFail(response){
            console.log("add cat fail: ", response);
          }

      }, function() {
        console.log("cancelled 'add category' event")
      });
    };

    function printToCSV(){
    // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
            .title('Print this to CSV?')
            // .textContent('All of the banks have agreed to forgive you your debts.')
            .ariaLabel('Lucky day')
            .targetEvent(Document.body)
            .ok('Yes!')
            .cancel('Absolutely Not!');

      $mdDialog.show(confirm).then(function() {
        createCSV();
      }, function() {
        console.log("user said, 'nope'")
      });
        
        var csvData = "ID, Date, Duration, Project, Description\r\n";
        
        function minuteFormatter(minute){
          if(minute < 10){
            minute = "0" + minute;
          }
          return minute
        }

      function createCSV(){
        for (var i = 0; i < vm.categories.length; i++){
          if (vm.categories[i]._events.length > 0){
            var categoryName = vm.categories[i].name;
            for (var p = 0; p < vm.categories[i]._events.length; p++){
              var row = "";
              row += vm.categories[i]._events[p]._id;
              row += ','; 
              row += moment(vm.categories[i]._events[p].date).format('MM/DD/YYYY');
              row += ',';
              row += vm.categories[i]._events[p].hours + ":" + minuteFormatter(vm.categories[i]._events[p].minutes);
              row += ',';
              row += categoryName
              row += ',';
              row += vm.categories[i]._events[p].description;
              row += '\r\n'
              csvData += row;
            }
          }
        }
        var blob = new Blob([csvData], {type: "text/csv;charset=utf-8"});
        saveAs(blob, "timesheet-data.csv");
      }; 
    };

    function logout(){
       var confirm = $mdDialog.confirm()
            .title('Logout')
            // .textContent('All of the banks have agreed to forgive you your debts.')
            .ariaLabel('Lucky day')
            .targetEvent(Document.body)
            .ok('Yes!')
            .cancel('Absolutely Not!');

        $mdDialog.show(confirm).then(function() {
          removeUser();
        }, function() {
          console.log("user said, 'nope'")
        });

        function removeUser(){
          localStorage.removeItem("user_id")
          localStorage.removeItem("username")
          $state.go('login');
        }
      }

  };

})();