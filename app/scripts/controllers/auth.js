'use strict'

app.controller('AuthCtrl',function($scope,Auth,$location){
    $scope.user={
      email:'',
      pass:'',
      name:''
    }

    $scope.register=function(){
      Auth.register($scope.user,$scope).then(function(){
        $scope.message="Account Successfully created Hooman !!"
        $scope.user.email=$scope.user.pass=$scope.user.name='';
      });
    };

    $scope.login=function(){
      Auth.login($scope.user).then(function(){
        $location.path('/home');
      });
    };
  })