'use strict';

app.controller('postDetailsCtrl', function($scope,$rootScope, $routeParams,$location) {
    //Call to getById() method in blogService

    $scope.current = _.find( $rootScope.posts, function(itemPost){return itemPost.id == $routeParams.postId});

    // removePost function
    $scope.removePost = function () {
        debugger;

        var  selPost = _.find($rootScope.posts, function(itemPost){return itemPost.id == $scope.current.id});
        var postIndex = $rootScope.posts.indexOf(selPost);
        $rootScope.posts.splice(postIndex, 1);

//       var post =  $scope.current = _.find( $rootScope.data, function(itemPost){return itemPost.id == $scope.current.id});
////        $rootScope.data.splice(post.indexof(post),1);
  $location.path("/posts");
    }
});

