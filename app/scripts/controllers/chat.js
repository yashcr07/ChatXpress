'use strict'

app.controller('ChatCtrl',function($scope,$timeout,Auth,Chat){

    $scope.uid='';
    $scope.popup=false;
    $scope.name='';
    $scope.logout=Auth.logout;
    $scope.user=Auth.user;

    $scope.init=function(){
      $scope.getId();
      $scope.load();
    }

    $scope.getId=function(){
      $scope.uid=Auth.resolveUser().uid;
      console.log($scope.uid);
    }

    $scope.send_msg=function(mssg,to){
      //console.log("Sent")
      $scope.msg='';  
      Chat.send_msg(mssg,$scope.uid,$scope.user.profile.name);
    }
    $scope.load=function(){
      $scope.list=Chat.load_users();
      console.log($scope.list);
    }
    
    //Toggles chat window

    $scope.toggle=function(name){
      if($scope.name!==name){
        $scope.popup=true;
        $scope.load_msg();
      }
      else
        $scope.popup=false;
      $scope.name=name;
      
    }

    $scope.load_msg=function(){
      $scope.msgArray=Chat.load_msg($scope.name);
      //console.log($scope.msgArray);
    }
})

