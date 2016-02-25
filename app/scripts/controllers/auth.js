'use strict'

app.controller('AuthCtrl',function($scope,Auth,$location){
    $scope.user={
      email:'',
      pass:''
    }

    $scope.register=function(){
      Auth.register($scope.user);
    };

    $scope.login=function(){
      Auth.login($scope.user).then(function(){
        $location.path('/home');
      });
    };
  })