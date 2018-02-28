define(["weapon", "sprintf"], function (weapon, sprintf) {
	"use strict";

	function register(app) {
		app.directive("damage", function () {

			var controller = function ($scope) {
				$scope.player = $scope.$parent.player;	//SAMTODO: retrieve player from service.
				$scope.hasRolled = false;
				$scope.canShow = function () {
					return !$scope.hasRolled;
				};
				$scope.canShowContinueMessage = function () {
					return $scope.hasRolled;
				};
				$scope.roll = function () {
					console.log("damage.roll");
					var w = new weapon.Weapon("dummy", parseInt($scope.dice, 10), parseInt($scope.modifier, 10)),
						damage = w.rollDamage();
					$scope.rollResult = sprintf.sprintf("%d schadepunt%s.", damage, damage === 1 ? "" : "en");
					$scope.player.applyDamage(damage);
					$scope.hasRolled = true;
				};
				$scope.reset = function () {
					console.log("damage.reset");
					$scope.hasRolled = false;
					$scope.rollResult = "Klik op 'Dobbel' om te dobbelen voor het aantal schadepunten.";
				};

				this.playerIsAlive = function () {
					return $scope.player.isAlive();
				};
			};

			return {
				restrict: "E",
				templateUrl: "templates/damage.html",
				transclude: true,
				controller: controller,
				scope: {
					dice: "@",
					modifier: "@"
				}
			};
		});

		app.directive("damageDie", function () {
			function linkFunction($scope, element, attributes, damageController) {
				$scope.canShow = function () {
					return !damageController.playerIsAlive();
				};
			}

			return {
				restrict: "E",
				require: "^damage",
				templateUrl: "templates/damage-die.html",
				transclude: true,
				scope: {},
				link: linkFunction
			};
		});

		app.directive("damageLive", function () {
			function linkFunction($scope, element, attributes, damageController) {
				$scope.canShow = function () {
					return damageController.playerIsAlive();
				};
			}

			return {
				restrict: "E",
				require: "^damage",
				templateUrl: "templates/damage-live.html",
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