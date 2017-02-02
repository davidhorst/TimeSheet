(function() {
  'use strict';

  angular.module('app')

  .controller('dashboardController', dashboardController);

  dashboardController.$inject = ['categorydataservice', 'accountsdataservice'];

  function dashboardController(categorydataservice, accountsdataservice) {

    var vm = this;

    vm.categories = {};

    function activate(){
      var userID = accountsdataservice.getUser()._id
      return categorydataservice.getCategories(userID)
        .then(function(returnedData){
          vm.categories = returnedData;
        })
    }

    activate();
    
  }

})();
