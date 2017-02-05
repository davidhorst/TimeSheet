var app = angular.module('app', ['ngRoute', 'ngMaterial', 'chart.js']);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/',{
        templateUrl: 'dashboard/dashboard.html',
        controller:  'dashboardController',
        controllerAs: 'vm',
    })
    .when('/login',{
        templateUrl: 'accounts/accounts.html'
    })
    .when('/category',{
        templateUrl: 'category/category.html',
        controller:  'categoryController',
        controllerAs: 'vm',
    })

    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);

});

app.config(function($compileProvider) {
    $compileProvider.preAssignBindingsEnabled(true);
});
