'use strict';

// Declare app level module which depends on views, and core components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.version'
]);
myApp.
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  // $routeProvider.otherwise({redirectTo: '/view1'});
}]);

myApp.controller("mainCtrl",function ($scope,$http,$interval,participantService) {
    $scope.countDown=0;
    $scope.participantList=[];
    $scope.randomParticipant="";
    $scope.countDownOver= false;
    $scope.startGame=function () {
        $scope.countDown=0;
        $scope.countDownOver= false;
        var promise = $interval(function () {
            $scope.countDown = $scope.countDown +1;
        },1000, 2).then(function () {
            $scope.countDownOver= true;
            // alert("CountDownComplete");
        });
        participantService.getParticipantList().then(function(response){
            $scope.participantList = response;
            $scope.randomParticipant=$scope.participantList[0].name;
            // alert("completed");
        });

        // alert("do");

    };
})

myApp.service("participantService",function ($http,$q,$timeout) {
    /*this.getParticipantList= $http.get("/getParticipant").then(function (response) {
        return response;
    });*/
    this.getParticipantList=function () {
        var deferred = $q.defer();
        var partList=[
                {
                    name:"Robin Mathur",
                    empId:"123",
                    dept:"HSM"
                },
                {
                    name:"Satish Mathur",
                    empId:"124",
                    dept:"CCC"
                },
                {
                    name:"Sanjeev Mathur",
                    empId:"125",
                    dept:"CRYP"
                }];
        // $timeout(function () {
            deferred.resolve(partList);
        // },4000);
        return deferred.promise;
    };
    this.winner= function (empId) {
        /*$http.get("/winner/"+empId);*/
    }
})