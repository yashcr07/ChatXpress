'use strict'

app.controller('AuthCtrl',function($scope,Auth,$location,$timeout){
    $scope.user={
      email:'',
      pass:'',
      name:''
    }

    $scope.alert='';
    $scope.err='';

    $scope.register=function(){
      var frm=document.getElementsByName('reg')[0];
      frm.reset();
      Auth.register($scope.user).then(function(){
        $scope.err='';
        $scope.message="Account Successfully created Hooman !!"
      },function(error){
        $scope.err=error;
      });
    };

    $scope.login=function(){
      Auth.login($scope.user).then(function(){
        $location.path('/home');
      },function(error){
        console.log(error);
      });
    };

    $scope.logout=function(){
      Auth.logout().then(function(){
        $location.path('/');
      },function(error){
        console.log(error);
      });
      
    }

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