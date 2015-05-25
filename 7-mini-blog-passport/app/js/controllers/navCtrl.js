/**********************************************************************
 * Nav controller
 **********************************************************************/

app.controller ('navCtrl', function ($scope, $location, $rootScope, $http){
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
    
    $scope.init = function(){
        //redirect to home as default
        $location.path("/");                
        $http.get('/loggedin').success(function(response){
            $scope.response = response;
            if ($scope.response != 0){            
                $rootScope.user = response.name;
                $rootScope.isLogged = true;
            }
            else
                $rootScope.isLogged = false;                
        });                
        $scope.isPostSelected = false;                
    };
    
    $scope.init();
});


