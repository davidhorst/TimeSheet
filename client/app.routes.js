(function () {

    'use strict';

    angular.module("app")
    .config(routesConfig)
    
    routesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
    
    function routesConfig($stateProvider, $urlRouterProvider) {  
      
    //   $urlRouterProvider.otherwise('/login');
      
      var states = [
        {
          name: "login",
          url: "/login",
          templateUrl: "session/login.html",
          controller: "LoginController",
          controllerAs: "login",
        },
        {
          name: "index",
          url: '',
          abstract: true,
          views: {
            '': {
              templateUrl: "layout/layout.html",
              controller: "LayoutController",
              controllerAs: "layout"
            }
          },
        },
        /////////////////////////
        {
          name: "index.dashboard",
          url: '/dashboard',
          templateUrl: "dashboard/dashboard.html",
          controller: "DashboardController",
          controllerAs: "dashboard"
        },
        {
          name: "index.dashboard.category",
          url: '/category/{index}',
          templateUrl: "category/category.html",
          controller: "CategoryController",
          controllerAs: "category"
        }
      ]

      states.forEach(function(state) {
        $stateProvider.state(state);
      });
      
    }

})();