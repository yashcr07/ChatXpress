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
    'firebase',
    'ui.bootstrap'
    
  ]);
  app.constant('FIREBASE_URL','https://chatxpress.firebaseio.com/');

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
        controller:''
      })
      .otherwise({
        redirectTo: '/'
      });
  });
