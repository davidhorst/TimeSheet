var app = angular.module('app', ['ui.router', 'ngMaterial', 'chart.js', 'angularMoment']);


// app.config(function($compileProvider) {
//     $compileProvider.preAssignBindingsEnabled(true);
// });

app.run(runBlock)

runBlock.$inject = ['sessionservice', '$state', '$rootScope']

function runBlock(sessionservice, $state, $rootScope){

     console.log("check for user at run block", localStorage.getItem("user_id"))   
     if (!localStorage.getItem("user_id")){
         console.log("no user")
         $state.go('login')
     } else {
        //  localStorage.removeItem("user_id")
        //  console.log("user")
         $state.go('index.dashboard')
     }
     
    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
        console.log("toState", toState)
    });
};

//   moment.relativeTimeThreshold('m', 59);
//   moment.relativeTimeThreshold('h', 23);
  
// moment.duration.fn.format.defaults.trim = false