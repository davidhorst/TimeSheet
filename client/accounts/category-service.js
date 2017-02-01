angular
  .module('app')
  .factory('categorydataservice', categorydataservice);

categorydataservice.$inject = ['$http'];

function categorydataservice($http) {

    var self = this;
    // self.observerCallbacks = [];
    self.categories = {};
    self.currentCategory = null;
    return {
        getCategories: getCategories,
        addCategory: addCategory,
        setCategory: setCategory,
        getEvents: getEvents,
        addEvent: addEvent,
        deleteEvent: deleteEvent,
    };


    function setCategory(index){
        // console.log(index);
        self.currentCategory = index;
        // self.notifyObservers();
    }

    function includeMinuteTotals(){
        console.log("starting update: ", self.categories)
        var totalMinutes = 0;
        for (var i = 0; i < self.categories.length; i++){
            for(var p = 0; p < self.categories._events.length; p++){
                var convertHours = self.categories._events[p].hours * 60;
                totalMinutes += convertHours;
                totalMinutes += self.categories._events[p].minutes;
            }
            self.categories[i].totalMinutes = totalMinutes;
        }
        console.log("after conversion", self.categories);

        return self.categories;
    }

    function getEvents(){
        return self.categories[self.currentCategory]._events
    }

    function getCategories(userID) {
        console.log(userID);
        return $http.get(`categories/${userID}`)
            .then(getCategoriesComplete)
            .catch(getCategoriesFailed)

        function getCategoriesComplete(response){
            console.log(response)
            self.categories = response.data.success;
            // includeMinuteTotals();
            console.log(self.categories)
            return self.categories;
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

    function addEvent(eventObj) {
        if (!eventObj._category){
            eventObj._category = self.categories[self.currentCategory]._id
        }
        // console.log("eventObj at categoryController: ", eventObj);
        return $http.post(`events/`, eventObj)
            .then(addEventComplete)
            .catch(addEventFailed);
        
        function addEventComplete(response) {
            console.log(response)
            return response.data;
        }
        function addEventFailed(error) {
            console.log('Account Creation Failed with: ' + error.data);
        }
    }

    function deleteEvent(eventID) {
        // if (!eventObj._category){
        //     eventObj._category = self.categories[self.currentCategory]._id
        // }
        // console.log("eventObj at categoryController: ", eventObj);
        return $http.delete(`events/${eventID}`)
            .then(deleteEventComplete)
            .catch(deleteEventFailed);
        
        function deleteEventComplete(response) {
            console.log("after delete: ", response)
            return response.data;
        }
        function deleteEventFailed(error) {
            console.log('Account Creation Failed with: ' + error);
        }
    }
}