'use strict'

app.controller('AuthCtrl',function($scope,Auth,$location,$timeout){
    $scope.user={
      email:'',
      pass:'',
      name:''
    }

    $scope.alert='';

    $scope.register=function(){
      Auth.register($scope.user,$scope).then(function(){
        $scope.message="Account Successfully created Hooman !!"
        $scope.user.email=$scope.user.pass=$scope.user.name='';
      });
    };

    $scope.login=function(){
      Auth.login($scope.user).then(function(){
        $location.path('/home');
      },function(error){
        console.log(error);
      });
    };

    $scope.uNameCheck=function(){
      
      $timeout(function(){
        Auth.check($scope.user.name).then(function(msg){
          $scope.alert=msg;
          console.log("resolve")
        },function(msg){
          $scope.alert=msg;
          console.log("reject")
        });
        
      },1500)
      
    }
  })