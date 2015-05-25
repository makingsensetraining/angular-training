'use strict';

/* Services */
app.service('blogService', function ($http, $location) {
        
        var urlBase = "/api/myPosts";
    
        //return the array
        this.getAll = function () {
           return $http.get('/api/myPosts');
        }
       
        //search by id in the current array
        this.getById = function (blogItemId) {  
            return $http.get('/api/myPosts/'+blogItemId);
        };
    
        //add a new element to array
        this.create = function (postData) {
            return $http.post('/newPost', postData);
        };   
    
        //update blogItem matching by id
        this.update = function (blogItemId, blogItem) {
            return $http.update('/editPost', blogItem);
        };
    
        //remove blogItem matching by id
        this.remove = function (blogItemId) {
            return $http.delete('/delete/'+blogItemId);
            
        };
}); 
