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
    vm.printToCSV = printToCSV;

    var chartOptions = {
        scales: {
            // xAxes: [{
            //     type: 'time',
            //     unit: 'hour',
            //     time: {
            //       format: false,
            //       unit: false,
            //       displayFormats: {
            //           'millisecond': 'HH:mm:ss',
            //           'second': 'HH:mm:ss',
            //           'minute': 'HH:mm:ss',
            //           'hour': 'HH:mm:ss'
            //       },
            //       // Sets the display format used in tooltip generation
            //       tooltipFormat: ''
            //     }
            // }]
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
        vm.categories[i].formattedTime = moment.duration(vm.categories[i].totalMinutes, "minutes")
        vm.categories[i].formattedTime = humanizeDuration(vm.categories[i].formattedTime, {units: ['h', 'm']})
        vm.chartLabels.push(categories[i].name);
        // vm.chartData.push(vm.categories[i].formattedTime);
        vm.chartData.push(moment.duration(categories[i].totalMinutes, "minutes"));
        tempTotal += categories[i].totalMinutes;
        vm.categories.totalMinutes = tempTotal;
        vm.categories.duration = moment.duration(tempTotal, "minutes");
        vm.categories.formattedTime = humanizeDuration(vm.categories.duration._milliseconds, { units: ['h', 'm'] })
        vm.categories.remainingTime = moment.duration(7200-tempTotal, "minutes")
        vm.categories.remainingTime = humanizeDuration(vm.categories.remainingTime._milliseconds, { units: ['h', 'm']})
      }
      vm.chartLabels.push("Remaining Time");
      vm.chartData.push(moment.duration(7200-tempTotal, "minutes"));
      console.log("completed chart data: ", vm.categories) 
    }

    function printToCSV(){
      var csvData = "ID, Date, Duration, Project, Description\r\n";
      
      function minuteFormatter(minute){
        if(minute < 10){
          minute = "0" + minute;
        }
        return minute
      }

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
    }
    
  }

})();
