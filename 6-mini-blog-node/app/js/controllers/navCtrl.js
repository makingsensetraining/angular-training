app.controller ('navCtrl', function ($scope, $location){
    //redirect to home as default
    $location.path("/");
    //Mark "My posts" selected as default
    $scope.isPostSelected = true;
    //Mark Post as selected
    $scope.markPostSelected = function(){
        $scope.isHomeSelected = false;
        $scope.isPostSelected = true;
    };
    //Unmark all options
    $scope.unmarkAll = function(){
        $scope.isHomeSelected = false;
        $scope.isPostSelected = false;
    };
});
