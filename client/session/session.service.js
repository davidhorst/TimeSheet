angular
  .module('app')
  .factory('sessionservice', sessionservice);

sessionservice.$inject = ['$http'];

function sessionservice($http) {
    var self = this;

    return {
        getUserID: getUserID,
        login: login,
        createAccount: createAccount,
    };


    self.user = {};

    function getUserID() {
        if (!localStorage.getItem("user_id")){
            return null
        } else {
            console.log("found user")
            return localStorage.getItem("user_id")
        }

    }
    
    function logout(){
        localStorage.removeItem("user_name")
        localStorage.removeItem("user_id")
    }

    function login(userObj) {
        return $http.post(`/login/`, userObj)
            .then(loginComplete)
            .catch(loginFailed);
        
        function loginComplete(response) {
            // console.log("response.data: ", response.data.success.username);
            if (response.data.success){
                self.user = response.data.success;
                localStorage.setItem("user_name", self.username)
                localStorage.setItem("user_id", self.user._id)
                console.log(localStorage.getItem("user_id"));
            };
            return response.data.success;
        }

        function loginFailed(error) {
            // logger.error('XHR Failed for getAvengers.' + error.data);
        }
    }

    function createAccount(userObj) {
        return $http.post(`login/`, userObj)
            .then(createAccountComplete)
            .catch(createAccountFailed);
        
        function createAccountComplete(response) {
            // console.log(response)
            return response.data;
        }
        function createAccountFailed(error) {
            console.log('Account Creation Failed with: ' + error.data);
        }
    };
}