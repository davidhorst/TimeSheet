(function() {
  'use strict';

  angular.module('app')

  .controller('categoryController', categoryController);

  categoryController.$inject = [
    'categorydataservice',
    'accountsdataservice', 
    '$mdDialog'
  ];

  function categoryController(
    categorydataservice, 
    accountsdataservice, 
    $mdDialog) {

    var vm = this;
    
    vm.showEventDialog = showEventDialog;
    vm.showTimeDialog = showTimeDialog;
    vm.showConfirmDelete = showConfirmDelete;
    vm.addEvent = addEvent
    vm.getEvents = getEvents
    vm.event = {};

    function getEvents(){
      vm.events = categorydataservice.getEvents();
    }
    vm.getEvents();


    function showEventDialog(ev, index) {

      $mdDialog.show({
        controller: DialogController,
        locals: {editEvent: vm.events[index]},
        templateUrl: 'category/eventDialog.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
      })
      .then(function() {
        console.log("After Event Sumbit Success");
        // vm.status = 'You said the information was "' + answer + '".';
      }, function() {
        console.log("Show Event Cancelled");
        // vm.status = 'You cancelled the dialog.';
      });
    };
    
    function showTimeDialog(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'tabDialog.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };

  function showConfirmDelete(ev, index) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete this entry?')
          .textContent('You\'re probably sure, right. right?')
          .ariaLabel('Delete Entry')
          .targetEvent(ev)
          .ok('Please do it!')
          .cancel('No, nvmd.');

    $mdDialog.show(confirm).then(function() {
      console.log( 'yes, please');
      return categorydataservice.deleteEvent(vm.events[index]._id)
        .then(function(data){
          vm.events.splice(index, 1);
        })
    }, function() {
      console.log('no');
    });
  };

    function DialogController($scope, $mdDialog, editEvent) {

      $scope.event = {};
      $scope.event.date = new Date();
      if (editEvent){
        $scope.event = editEvent;
        if ($scope.event.date){
          $scope.event.date = new Date($scope.event.date);
        }

      }
      console.log($scope.event);
      // $scope.hide = function() {
      //   $mdDialog.hide();
      // };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.submitEvent = function(bool) {
        vm.addEvent($scope.event);
        $mdDialog.hide();
      };
    }

    function addEvent(eventObj){
      if (!eventObj._user){
        eventObj._user = accountsdataservice.getUser()._id
      };
      // console.log(eventObj);
      return categorydataservice.addEvent(eventObj)
        .then(addEventSuccess)
        .catch(addEventFail)
        
      function addEventSuccess(response){
        if (eventObj._id){
          for(var i = 0; i < vm.events.length; i++){
            if(vm.events[i]._id == eventObj._id){
              vm.events[i] = eventObj;
            }
          }
        } else {
          vm.events.push(response.success);
        }
      }

      function addEventFail(response){
        pass;  
      }
    }

  }


})();
