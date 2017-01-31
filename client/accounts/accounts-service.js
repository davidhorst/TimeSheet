angular
  .module('app')
  .factory('accountsdataservice', accountsdataservice);

accountsdataservice.$inject = ['$http'];

function accountsdataservice($http) {

    return {
        getUser: getUser,
        // addUser: addUser,
        login: login,
        createAccount: createAccount,
        // getGame: getGame,
        // addGame: addGame
    };


    this.user = {};

    function getUser() {
        if (!this.user){
            return null
        } else {
            return this.user.username
        }

    }
    
    function login(userObj) {
        console.log("uerObj:", userObj);
        return $http.post(`/login/`, userObj)
            .then(loginComplete)
            .catch(loginFailed);
        
        function loginComplete(response) {
            console.log("response.data: ", response.data.success.username);
            if (response.data.success){
                console.log("success found")
                this.user = response.data.success;
            };
            console.log("double check: ", response.data.success.username);
            return response.data.success.username;
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
            console.log(response)
            return response.data;
        }
        function createAccountFailed(error) {
            console.log('Account Creation Failed with: ' + error.data);
        }
    }
    // function getGame() {
    //     return $http.get(_urlPrefixes.API + "games/:game_id/")
    //         .then(getGameComplete)
    //         .catch(getGameFailed);

    //     function getGameComplete(response) {
    //         return response.data;
    //     }

    //     function getGameFailed(error) {
    //         // logger.error('XHR Failed for getAvengers.' + error.data);
    //     }
    // }

    // function addGame(newGameObj) {
    //     console.log("newGameObj", newGameObj)
    //     return $http.post(_urlPrefixes.API + "games/", newGameObj)
    //         .then(getGameComplete)
    //         .catch(getGameFailed);

    //     function getGameComplete(response) {
    //         return response.data;
    //     }

    //     function getGameFailed(error) {
    //         // logger.error('XHR Failed for getAvengers.' + error.data);
    //     }
    // }
}