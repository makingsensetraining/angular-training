'use strict';

app.controller('postDetailsCtrl', function($scope, $routeParams, blogService, $location, toaster) {
    //Call to getById() method in blogService
    blogService.getById($routeParams.postId)
        .success(function (current, status, headers, config) {
            $scope.current = current;
        })
        .error(function(current, status, headers, config) {
            toaster.pop('error', current);
         });

    // removePost function
    $scope.removePost = function () {
        blogService.remove($scope.current.id)
            .success(function (current, status, headers, config) {
                $location.path("/posts/");    
                toaster.pop('success', "Post removed successfully!");
            })
            .error(function(current, status, headers, config) {
                toaster.pop('error', current);
            });
    }
});