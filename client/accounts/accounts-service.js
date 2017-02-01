angular
  .module('app')
  .factory('accountsdataservice', accountsdataservice);

accountsdataservice.$inject = ['$http'];

function accountsdataservice($http) {
    var self = this;

    return {
        getUser: getUser,
        // addUser: addUser,
        login: login,
        createAccount: createAccount,
        // getGame: getGame,
        // addGame: addGame
    };


    self.user = {};

    function getUser() {
        if (!self.user){
            return null
        } else {
            return self.user
        }

    }
    
    function login(userObj) {
        console.log("uerObj:", userObj);
        return $http.post(`/login/`, userObj)
            .then(loginComplete)
            .catch(loginFailed);
        
        function loginComplete(response) {
            // console.log("response.data: ", response.data.success.username);
            if (response.data.success){
                self.user = response.data.success;
                // console.log(self.user);
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