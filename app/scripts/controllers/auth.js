'use strict'

app.controller('AuthCtrl',function($scope,Auth,$location,$timeout){
    $scope.user={
      email:'',
      pass:'',
      name:''
    }

    $scope.loggedIn=Auth.signedIn;
    $scope.alert='';
    $scope.err='';
    $scope.message=false;

    $scope.authCheck=function(){
      if($scope.loggedIn)
        $location.path('/home');
    }

    $scope.register=function(){
      var frm=document.getElementsByName('reg')[0];
      frm.reset();
      Auth.register($scope.user).then(function(){
        $scope.err='';
        $scope.message=true;
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
      Auth.logout()
      $location.path('/');
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