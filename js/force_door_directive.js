define(["dice", "sprintf"], function (dice, sprintf) {
	"use strict";

	function register(app) {
		console.log("forceDoor.register");

		app.directive("forceDoor", function () {

			var linkFunction = function ($scope, element, attributes) {
				$scope.player = $scope.$parent.player;	//SAMTODO: retrieve player from service.
				$scope.isDoorOpen = false;
				$scope.damageOnFail = 1;
				$scope.rollResult = "Klik op 'Dobbel' om te proberen de deur te forceren.";
				$scope.canShow = function () {
					return !$scope.isDoorOpen;
				};
				$scope.canShowContinueMessage = function () {
					return $scope.isDoorOpen;
				};
				$scope.roll = function () {
					console.log("forceDoor.roll");
					var r = dice.rollD20();
					$scope.rollResult = sprintf.sprintf("%d gedobbeld, proef %s. ", r, r <= 10 ? "geslaagd" : "mislukt");
					if (r <= 10) {
						$scope.isDoorOpen = true;
					} else {
						$scope.rollResult += sprintf.sprintf("%d schadepunt%s.", $scope.damageOnFail, $scope.damageOnFail > 1 ? "en" : "");
						$scope.player.applyEffectiveDamage($scope.damageOnFail);
						$scope.damageOnFail += 1;
					}
				};
			};

			return {
				restrict: "E",
				templateUrl: "templates/force-door.html",
				transclude: true,
				link: linkFunction,
				scope: { }
			};
		});
	}

	return {
		register: register
	};
});
