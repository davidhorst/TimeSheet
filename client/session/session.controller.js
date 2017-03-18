(function() {
  'use strict';

  angular.module('app')

  .controller('SessionController', SessionController);

  SessionController.$inject = [
    'sessionservice',
    ];

  function SessionController(
    sessionervice) {

    var vm = this;

  }

})();
