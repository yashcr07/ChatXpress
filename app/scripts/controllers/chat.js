'use strict'

app.controller('ChatCtrl',function($scope,$timeout,Auth,Chat,$location,$filter){

    $scope.uid='';
    $scope.popup=false;
    $scope.name='';
    $scope.logout=Auth.logout;
    $scope.user=Auth.user;
    
    
    $scope.init=function(){
      $scope.getId();
      $scope.load();
      $scope.loadInterest();
    }

    $scope.uFilter=function(){
      if($scope.filteredUser==="interest")
        $scope.filteredUser=$scope.interests;
    }    

    $scope.getId=function(){
      $scope.uid=Auth.resolveUser().uid;
      if(!$scope.uid)
        $location.path('/');
      console.log($scope.uid);
    }

    $scope.send_msg=function(mssg,to){
      $scope.msg='';  
      Chat.send_msg(mssg,to,$scope.user.profile.name);
    }

    //Loads User List

    $scope.load=function(){
      $scope.list=Chat.load_users();
    }

    //Add user Interests

    $scope.addInterest=function(){
      $timeout(function() {
        Chat.addInterest($scope.interests,$scope.uid)
      }, 100);
      
    }

    //$filter('filter')($scope.list,$scope.alu);
    
    //Load Interests

    $scope.loadInterest=function(){
      $scope.interests=Chat.loadInterest($scope.uid);
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

    $scope.uploadImage=function(files){
      angular.forEach(files, function(flowFile){
       var fileReader = new FileReader();
        fileReader.onload = function (event) {
          var uri = event.target.result;
          $scope.image = uri;
          console.log(uri);
          Chat.uploadImage($scope.image,$scope.uid);
        };
        fileReader.readAsDataURL(flowFile.file)
    });

  };

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

