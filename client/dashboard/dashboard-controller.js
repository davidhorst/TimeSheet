

(function() {
  'use strict';
  angular.module('app')
  .controller('dashboardController', dashboardController);

  dashboardController.$inject = [
    'categorydataservice', 
    'accountsdataservice',
    ];

  function dashboardController(
    categorydataservice, 
    accountsdataservice) {

    var vm = this;

    vm.categories = {};
    vm.createChartData = createChartData;
    vm.chartLabels = [];
    vm.chartData = [];
    vm.chartOptions = chartOptions;
    var momenttest = moment.duration(3, "minutes");
    console.log("momentTest:", momenttest)
    var chartOptions = {
        scales: {
            xAxes: [{
                type: 'time',
                unit: 'hour',
                time: {
                  format: false,
                  unit: false,
                  displayFormats: {
                      'millisecond': 'HH:mm:ss',
                      'second': 'HH:mm:ss',
                      'minute': 'HH:mm:ss',
                      'hour': 'HH:mm:ss'
                  },
                  // Sets the display format used in tooltip generation
                  tooltipFormat: ''
                }
            }]
        }
    };

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
        vm.chartData.push(moment.duration(categories[i].totalMinutes, "minutes"));
        tempTotal += moment.duration(categories[i].totalMinutes, "minutes");
      }
      vm.chartLabels.push("Remaining Time");
      vm.chartData.push(moment.duration(moment.duration(7200, "minutes") - tempTotal, "milliseconds"));
      console.log("completed chart data: ", vm.chartData) 
    }
    
  }

})();
