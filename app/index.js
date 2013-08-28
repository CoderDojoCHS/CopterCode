var JSHINT = require('jshint').JSHINT;
var arDrone = require('ar-drone');
var vm = require('vm');
var base = [
  "var arDrone = require('ar-drone');",
  "var client = arDrone.createClient();",
  "client.takeoff();",
  "client.after(5000, function() {",
  "  this.clockwise(0.5);",
  "})",
  ".after(3000, function() {",
  "  this.stop();",
  "  this.land();",
  "});"].join('\n');
angular.module("App", ['ui.codemirror'])
  .controller('MainCtrl', function($scope) {
    $scope.errors = [];

    var code = localStorage.getItem('code');
    $scope.code = code ? code : base;

    $scope.run = function() {
      if (JSHINT($scope.code, {})) {
        vm.runInNewContext($scope.code, { require: require });
      } else {
        $scope.errors = JSHINT.errors;
      }
    };

    $scope.reset = function() {
      window.location.reload();
    };

    $scope.stop = function() {
      var arDrone = require('ar-drone');
      var client = arDrone.createClient();
      client.stop();
      client.land();
    };

    $scope.save = function() {
      localStorage.setItem('code', $scope.code);
    };
  });