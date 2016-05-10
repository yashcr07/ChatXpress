'use strict'

app.controller('ChatCtrl',function($scope,$timeout,Auth,Chat){

    $scope.uid='';
    $scope.popup=false;
    $scope.name='';
    $scope.logout=Auth.logout;
    $scope.user=Auth.user;
    $scope.interests={}
    
    $scope.init=function(){
      $scope.getId();
      $scope.load();
    }

    $scope.getId=function(){
      $scope.uid=Auth.resolveUser().uid;
      console.log($scope.uid);
    }

    $scope.send_msg=function(mssg,to){
      $scope.number.push(5);
      $scope.msg='';  
      Chat.send_msg(mssg,to,$scope.user.profile.name);
    }

    //Loads User List

    $scope.load=function(){
      $scope.list=Chat.load_users();
    }

    //Add user Interests

    $scope.addInterest=function(){
      console.log($scope.interests);
      var intr=$scope.interests;
      $scope.interests=Auth.addInterest(intr,$scope.uid)
    }    
    //Toggles chat window

    $scope.toggle=function(name){
      if($scope.name!==name){
        $scope.popup=true;
      }
      else
        $scope.popup=false;
      $scope.name=name;
      $scope.load_msg();
    }

    //Loads chat messages

    $scope.load_msg=function(){
      $scope.msgArray=[];
      Chat.load_msg($scope.name,$scope.user.profile.name).then(function(arr){
        $scope.msgArray=arr;
        $scope.msgArray.sort(function(a,b){
          return(a.timestamp-b.timestamp)
        })
        console.log($scope.msgArray);
      },function(error){
        console.log(error);
      });

    }
})

