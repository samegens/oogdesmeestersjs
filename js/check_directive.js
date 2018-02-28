define(["dice", "sprintf"], function (dice, sprintf) {
	"use strict";

	var checkController = function ($scope) {
		$scope.checkSucceeded = false;
		$scope.checkFailed = false;
		$scope.rollResult = "Klik op 'Dobbel' om de proef uit te voeren.";

		$scope.canShowButton = function () {
			return !$scope.checkSucceeded && !$scope.checkFailed;
		};
		$scope.roll = function () {
			console.log("roll");
			var r = dice.rollD20();
			$scope.checkSucceeded = r <= 13;
			$scope.checkFailed = !$scope.checkSucceeded;
			$scope.rollResult = sprintf.sprintf("%d gedobbeld, proef %s.", r, $scope.checkSucceeded ? "geslaagd" : "mislukt");
		};

		this.checkFailed = function () {
			return $scope.checkFailed;
		};
		this.checkSucceeded = function () {
			return $scope.checkSucceeded;
		};
	};

	function register(app) {
		console.log("check_directive.register");

		app.directive("check", function () {
			return {
				restrict: "E",
				templateUrl: "templates/check.html",
				transclude: true,
				scope: {},
				controller: checkController
			};
		});

		app.directive("checkSucceeded", function () {
			function linkFunction($scope, element, attributes, checkController) {
				$scope.canShow = function () {
					return checkController.checkSucceeded();
				};
			}

			return {
				restrict: "E",
				require: "^check",
				templateUrl: "templates/check-succeeded.html",
				transclude: true,
				scope: {},
				link: linkFunction
			};
		});

		app.directive("checkFailed", function () {
			function linkFunction($scope, element, attributes, checkController) {
				$scope.canShow = function () {
					return checkController.checkFailed();
				};
			}

			return {
				restrict: "E",
				require: "^check",
				templateUrl: "templates/check-failed.html",
				transclude: true,
				scope: {},
				link: linkFunction
			};
		});

	}

	return {
		register: register
	};
});
