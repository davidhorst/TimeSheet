(function() {
  'use strict';

  angular.module('app')

  .controller('dashboardController', dashboardController);

  dashboardController.$inject = ['categorydataservice', 'accountsdataservice'];

  function dashboardController(categorydataservice, accountsdataservice) {

    var vm = this;

    vm.categories = {};
    vm.createChartData = createChartData;
    vm.chartLabels = [];
    vm.chartData = [];

    function activate(){
      var userID = accountsdataservice.getUser()._id
      return categorydataservice.getCategories(userID)
        .then(function(returnedData){
          vm.categories = returnedData;
          vm.createChartData(vm.categories);
        })
    }

    activate();

    function createChartData(categories){
      console.log(categories);
      var tempTotal = 0;
      for (var i = 0; i < categories.length; i++){
        vm.chartLabels.push(categories[i].name);
        vm.chartData.push(categories[i].totalMinutes);
        tempTotal += categories[i].totalMinutes;
      }
      vm.chartLabels.push("Remaining Time");
      vm.chartData.push(7200-tempTotal);

    }
    
  }

})();
