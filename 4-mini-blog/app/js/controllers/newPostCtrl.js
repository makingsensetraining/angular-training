'use strict';

app.controller('newPostCtrl', function($scope, $rootScope, $location) {
    // Call to blogService.create()

    $scope.addPost = function() {   
        var postData = {
             id : ++$rootScope.cont,
            title : $scope.titlePost,
            text : $scope.bodyPost
        };

        $rootScope.posts.push(postData);
        $location.path("/posts");
    };
});