(function() {
  'use strict';

  angular.module('app')

  .controller('categoryController', categoryController);

  categoryController.$inject = [
    'categorydataservice',
    '$mdDialog'
  ];

  function categoryController(categorydataservice, $mdDialog) {
    var vm = this;
    
    vm.showEvent = showEvent;
    vm.status;
    vm.events = categorydataservice.getEvents();
    vm.event = {
      date: new Date()
    };
    console.log(vm.events);

    function showEvent(ev) {
    $mdDialog.show({
      controller:  function () {
        return self;
      },
      controllerAs: 'ctrl',
      templateUrl: 'category/eventDialog.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      vm.status = 'You said the information was "' + answer + '".';
    }, function() {
      vm.status = 'You cancelled the dialog.';
    });
  };
  }

})();
