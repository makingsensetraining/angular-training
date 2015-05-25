'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', [ 'ngRoute', 'toaster' ]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider    
        .when('/', 
            {
            controller: 'myPostsCtrl',
            templateUrl: 'partials/myPosts.html' 
            })
        .when('/posts', 
            {
            controller: 'myPostsCtrl',
            templateUrl: 'partials/myPosts.html' 
            })
        .when('/addpost',
            {
            controller: 'newPostCtrl',
            templateUrl: 'partials/newPost.html' })
        .when('/toaster',
            {
            controller: 'toasterCtrl',
            templateUrl: 'partials/toaster.html' })
    
        .when('/posts/:postId', 
            {
            controller: 'postDetailsCtrl',
            templateUrl: 'partials/postDetails.html'
            })    
        .when('/edit/:postId', 
            {
            controller: 'editPostCtrl',
            templateUrl: 'partials/editPost.html'
            })    
        .otherwise({redirectTo: '/'});
}]);



