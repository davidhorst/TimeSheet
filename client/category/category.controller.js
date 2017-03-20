(function() {
  'use strict';

  angular.module('app')

  .controller('CategoryController', CategoryController);

  CategoryController.$inject = [
    'categoryservice',
    'sessionservice', 
    '$mdDialog',
    '$stateParams',
    '$state'
  ];

  function CategoryController(
    categoryservice, 
    sessionservice, 
    $mdDialog,
    $stateParams,
    $state) {

    var vm = this;
    
    vm.showEventDialog = showEventDialog;
    vm.showConfirmDelete = showConfirmDelete;
    vm.showConfirmDeleteCategory = showConfirmDeleteCategory;
    vm.addEvent = addEvent
    vm.getEvents = getEvents
    vm.event = {};
    vm.events = {};

    function getEvents(){
      return categoryservice.getEvents($stateParams.index)
        .then(function(events){
          vm.events = events;
        });
      console.log(vm.events)
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
      return categoryservice.deleteEvent(vm.events[index]._id)
        .then(function(){
          vm.events.splice(index, 1);
        })
    }, function() {
      console.log('no');
    });
  };

  function showConfirmDeleteCategory(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete this category?')
          .textContent('This will delete all events logged in this category')
          .ariaLabel('Delete category')
          .targetEvent(ev)
          .ok('Please do it!')
          .cancel('No, nvmd.');

    $mdDialog.show(confirm).then(function() {
      console.log( 'yes, please');
      return categoryservice.deleteCategory($stateParams.index)
        .then(function(){
            $state.go('index.dashboard')
        })
    }, function() {
      console.log('no');
    });
  };

    function DialogController($scope, $mdDialog, editEvent) {

      $scope.event = {};
      $scope.event.date = new Date();
      if (editEvent){
        // if an event was passed into the dialog, load it into the scope
        $scope.event = editEvent;
        if ($scope.event.date){
          // if the date is a string, convert it
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
      console.log("event obj at start of add event", eventObj)
      if (!eventObj._user){
        eventObj._user = sessionservice.getUserID()
      };
      if (!eventObj.hours){
        eventObj.hours = 0;
      }
      if(!eventObj.minutes){
        eventObj.minutes = 0;
      }
      eventObj.totalMinutes = eventObj.minutes + eventObj.hours * 60;
      console.log("total Minutes: ", eventObj.totalMinutes);

      return categoryservice.addEvent(eventObj, $stateParams.index)
        .then(addEventSuccess)
        .catch(addEventFail)
        
      function addEventSuccess(response){
        console.log("after event add success", eventObj);
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
        console.log("event add failure", response);
      }
    }

  }


})();
