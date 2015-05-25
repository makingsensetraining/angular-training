/**********************************************************************
 * Login controller
 **********************************************************************/

app.controller('LoginCtrl', function($scope, $rootScope, $http, $location) {    
  // Register the login() function
  $scope.login = function(){
    $http.post('/login', {
      username: $scope.user.username,
      password: $scope.user.password,
    })
    .success(function(user){
      // No error: authentication OK
      $rootScope.message = 'Authentication successful!';
      $rootScope.isLogged = true;
      $rootScope.user = $scope.user.username;
      $location.url('/posts');
    })
    .error(function(){
      // Error: authentication failed
      $rootScope.message = 'Authentication failed. Please, try again.';
      $rootScope.isLogged = false;
      $location.url('/login');
    });
  };
});