app.controller('editPostCtrl', function($scope, $routeParams, blogService, $location, toaster) {
    //get the element by id

    debugger;
    $scope.current = blogService.getById($routeParams.postId)
        .success(function (current, status, headers, config) {
            $scope.current = current;
         })
        .error(function(current, status, headers, config) {
            toaster.pop('error', current);
         });

    // update post information. Call to blogService.update()
    $scope.updatePost = function() {
        blogService.update($scope.current.id, $scope.current)
            .success(function (current, status, headers, config) {
                $location.path("/posts/");
                toaster.pop('success', "Post updated successfully!");
             })
            .error(function(current, status, headers, config) {
                toaster.pop('error', current);
             });            
    };
});