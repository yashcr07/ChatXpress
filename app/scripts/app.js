'use strict';

/**
 * @ngdoc overview
 * @name chatXpressApp
 * @description
 * # chatXpressApp
 *
 * Main module of the application.
 */
var app=angular
  .module('chatXpressApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngTagsInput',
    'flow',
    'filereader',
    'angular-filepicker',
    'firebase',
    'ui.bootstrap'
    
  ]);
  app.constant('FIREBASE_URL','https://chatxpress.firebaseio.com/');

  app.filter('interest',function(){
    return function(input,expr){
      if(expr==="all")
        return input;
      var filteredList=[];
      angular.forEach(input,function(user){
        var ok=true;
        angular.forEach(expr,function(cIntr){
          if(!angular.isUndefined(user.interests)&&expr.length){
            angular.forEach(user.interests,function(uIntr){
              if(ok){
                if(uIntr===cIntr.text){
                  filteredList.push(user);
                  ok=false;
                }
              }
            });
          }
        });
      });
      return filteredList;
    }
  });

  app.filter('convert', function(){
    return function(input){
    var months={'01':"Jan",'02':"Feb",'03':"Mar",'04':"Apr",'05':"May",'06':"Jun",'07':"Jul",'08':"Aug",'09':"Sep",'10':"Oct",'11':"Nov",'12':"Dec"};   
    var mm=String(input[4]+input[5]);
    var output=input[6]+input[7]+' '+months[mm]+' '+input[0]+input[1]+input[2]+input[3];
    return output; 
    };
  });
  
  app.directive('alert',function(){
    return{
      restrict:"A",
      link:function(scope,elem,attr){
        
      }
    }
  })

  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl',        
      })
      .when('/home',{
        templateUrl:'views/home.html',
        controller:'ChatCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
