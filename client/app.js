var app = angular.module('app', ['ngRoute', 'ngMaterial', 'chart.js', 'angularMoment']);

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

    // $locationProvider.html5Mode(true);

});

app.config(function($compileProvider) {
    $compileProvider.preAssignBindingsEnabled(true);
});

  moment.relativeTimeThreshold('m', 59);
  moment.relativeTimeThreshold('h', 23);

moment.duration.fn.format.defaults.trim = false