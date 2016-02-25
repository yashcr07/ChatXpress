'use strict';

/**
 * @ngdoc function
 * @name chatXpressApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatXpressApp
 */
angular.module('chatXpressApp')
  .controller('MainCtrl', function ($scope,$location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.go=function(path){
      console.log("Gonjer")
      $location.path(path);
    };
  });
