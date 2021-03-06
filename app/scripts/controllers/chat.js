'use strict'

app.controller('ChatCtrl',function($scope,$timeout,Auth,Chat,$location,$filter){

    $scope.uid='';
    $scope.popup=false;
    $scope.name='';
    $scope.user=Auth.user;
    $scope.filteredUser='all';
    $scope.loader=true;
    $scope.stat=Auth.signedIn;

    $scope.authCheck=function(){
      console.log($scope.stat);
      if(angular.isUndefined($scope.uid))
        $location.path('/')

    }
    
    $scope.init=function(){
      $scope.getId();
      $scope.load();
      $scope.loadInterest();
    }

    //Update Filtered User List

    $scope.uFilter=function(){
      if($scope.filteredUser==="interest")
        $scope.filteredUser=$scope.interests;
      $scope.popup=false;
    }    

    //Current user uid

    $scope.getId=function(){
      $scope.uid=Auth.resolveUser().uid;
      console.log($scope.uid);
    }

    $scope.send_msg=function(mssg,to){
      $scope.msg='';
      if(mssg==="")  
        return;
      Chat.send_msg(mssg,to,$scope.user.profile.name);
      $scope.toTheBottom();
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
      Chat.loadInterest($scope.uid).then(function(intr){
        $scope.interests=intr;
        $scope.loader=false;
      },function(err){
        console.log(err);
        $scope.loader=false;
      });
    }    
    //Toggles chat window

    $scope.toggle=function(name){
      if($scope.name===name){
        $scope.popup=!$scope.popup;
      }
      else
        $scope.popup=true;
      $scope.name=name;
      if($scope.popup)
        $scope.load_msg();
    }

    $scope.uploadImage=function(files){
      angular.forEach(files, function(flowFile){
       var fileReader = new FileReader();
        fileReader.onload = function (event) {
          var uri = event.target.result;
          $scope.image = uri;
          Chat.uploadImage($scope.image,$scope.uid);
        };
        fileReader.readAsDataURL(flowFile.file)
      });

    };

    //Loads chat messages

    $scope.load_msg=function(){
      $scope.msgArray=[];
      Chat.load_msg($scope.name,$scope.user.profile.name).then(function(arr){
        console.log("load after send")
        $scope.msgArray=arr;
        /*$scope.msgArray.sort(function(a,b){
          return(a.timestamp-b.timestamp)
        })*/
      },function(error){
        console.log(error);
      });

    }

    $scope.toTheBottom = function() {
        
        $timeout(function() {$(".content").animate({scrollTop:900*$scope.iterate},500)});
        //$(".content").animate({scrollTop:$scope.scrolled},500);
        console.log("toTheBottom called");
  };
})

