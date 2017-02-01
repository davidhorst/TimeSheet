angular
  .module('app')
  .factory('categorydataservice', categorydataservice);

categorydataservice.$inject = ['$http'];

function categorydataservice($http) {

    var self = this;

    return {
        getCategories: getCategories,
        addCategory: addCategory,
        setCategory: setCategory,
        getEvents: getEvents,
    };

    self.categories = {};
    self.currentCategory = null;

    function setCategory(index){
        console.log(index);
        self.currentCategory = index;
    }

    function getEvents(){
        // console.log(self.categories)
        // console.log(self.currentCategory);
        // console.log(self.categories[self.currentCategory])
        return self.categories[self.currentCategory]._events
    }

    function getCategories(userID) {
        return $http.get(`categories/${userID}`)
            .then(getCategoriesComplete)
            .catch(getCategoriesFailed)

        function getCategoriesComplete(response){
            console.log(response)
            self.categories = response.data.success;
            return response.data;
        }

        function getCategoriesFailed(error){
            console.log('Account Creation Failed with: ' + error.data);
        }
    }

    function addCategory(categoryObj) {
        return $http.post(`categories/`, categoryObj)
            .then(addCategoryComplete)
            .catch(addCategoryFailed);
        
        function addCategoryComplete(response) {
            console.log(response)
            return response.data;
        }
        function addCategoryFailed(error) {
            console.log('Account Creation Failed with: ' + error.data);
        }
    }
}