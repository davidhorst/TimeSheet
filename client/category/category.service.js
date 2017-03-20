angular
  .module('app')
  .factory('categoryservice', categoryservice);

categoryservice.$inject = ['$http', '$q'];

function categoryservice($http, $q) {

    var self = this;
    // self.currentCategory = null; // index of current category

    return {
        getCategories: getCategories,
        addCategory: addCategory,
        // setCategory: setCategory,
        getEvents: getEvents,
        addEvent: addEvent,
        deleteEvent: deleteEvent,
        deleteCategory: deleteCategory,
    };


    // function setCategory(index){
    //     self.currentCategory = index;
    // }

    function includeMinuteTotals(categoriesArr){
        for (var i = 0; i < categoriesArr.length; i++){
            var totalMinutes = 0;
            for(var p = 0; p < categoriesArr[i]._events.length; p++){
                totalMinutes += categoriesArr[i]._events[p].totalMinutes;
            }
            categoriesArr[i].totalMinutes = totalMinutes;
        }

        return categoriesArr;
    }

    function addCategory(categoryObj) {
        return $http.post(`categories/`, categoryObj)
            .then(addCategoryComplete)
            .catch(addCategoryFailed);
        
        function addCategoryComplete(response) {
            // console.log(response)
            return response.data;  // just the new category object?
        }
        function addCategoryFailed(error) {
            console.log('add Category Failed with: ' + error);
        }
    }

    function getCategories(userID) {
        return $http.get(`categories/${userID}`)
            .then(getCategoriesComplete)
            .catch(getCategoriesFailed)

        function getCategoriesComplete(response){
            self.categories = includeMinuteTotals(response.data.success);
            return self.categories;
        }

        function getCategoriesFailed(error){
            console.log('Get Categories failed with  ', error);
        }
    }

    function getEvents(index){
        var index = index
        if (self.categories){
          return $q.resolve(self.categories[index]._events)
        } else {
          return getCategories(localStorage.getItem('user_id'))
            .then(function(){
              return self.categories[index]._events
            })
        }
    }

    function addEvent(eventObj, categoryIndex) {

        if (!eventObj._category){
            eventObj._category = self.categories[categoryIndex]._id
        }

        console.log("at service: ", eventObj)

        return $http.post(`events/`, eventObj)
            .then(addEventComplete)
            .catch(addEventFailed);
        
        function addEventComplete(response) {
            console.log("event submit success response: ", response);
            return response.data;
        }
        function addEventFailed(error) {
            console.log('add event Failed with: ', error);
        }
    }

    function deleteEvent(eventID) {
        return $http.delete(`events/${eventID}`)
            .then(deleteEventComplete)
            .catch(deleteEventFailed);
        
        function deleteEventComplete(response) {
            console.log("event submit success response: ", response);
            return response.data;
        }
        function deleteEventFailed(error) {
            console.log('Delete event Failed with: ' + error);
        }
    }

    function deleteCategory(index) {
        return $http.delete(`categories/${self.categories[index]._id}`)
            .then(deleteCategoryComplete)
            .catch(deleteCategoryFailed);
        
        function deleteCategoryComplete(response) {
            console.log("event submit success response: ", response);
            return response.data;
        }
        function deleteCategoryFailed(error) {
            console.log('Delete event Failed with: ' + error);
        }
    }
}