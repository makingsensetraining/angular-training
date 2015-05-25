/**********************************************************************
 * New Post controller
 **********************************************************************/

'use strict';

app.controller('newPostCtrl', function($scope, blogService, $location, toaster) {
    // Call to blogService.create()
    $scope.addPost = function() {
        var postData = {
            id : '',
            title : $scope.titlePost,
            text : $scope.bodyPost
        };
        blogService.create(postData)
            .success(function (current, status, headers, config) {
                $location.path("/posts");
                toaster.pop('success', "Post saved successfully!");
            })
            .error(function(current, status, headers, config) {
                toaster.pop('error', current);
            });
    };
});