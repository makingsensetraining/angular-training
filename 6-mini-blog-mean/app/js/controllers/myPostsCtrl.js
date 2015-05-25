'use strict';

app.controller('myPostsCtrl', function($scope, blogService, toaster) {
    //get all elements
    $scope.myPosts = blogService.getAll()
        .success(function (posts, status, headers, config) {
            $scope.posts = posts;
        })
        .error(function(data, status, headers, config) {
            toaster.pop('error', current);
        });
});