define(["jquery", "dice", "weapon", "sprintf"], function ($, dice, weapon, sprintf) {
	"use strict";

	var attackLockController = function ($scope) {
		$scope.lockIsLocked = true;
		$scope.weaponIsWhole = true;
		$scope.attackResult = "Klik op 'Sla tegen het slot' om te proberen het slot open te slaan.";
		$scope.player = $scope.$parent.player;	//SAMTODO: player uit een service halen

		$scope.canShowButton = function () {
			return $scope.lockIsLocked && $scope.weaponIsWhole;
		};
		$scope.attackLock = function () {
			console.log("attackLock");
			var attackResult = $scope.player.attack(),
				damage = 0,
				missedRoll = 0;

			$scope.attackResult = sprintf.sprintf("Aanval %s (%d gegooid). ", attackResult.success ? "gelukt" : "mislukt", attackResult.roll);
			if (attackResult.success) {
				damage = dice.rollD6(1, 0);
				$scope.attackResult += sprintf.sprintf("%d trefpunt%s. ", damage, damage === 1 ? "" : "en");
				if (damage === 6) {
					$scope.lockIsLocked = false;
				}
			}

			if ($scope.lockIsLocked) {
				missedRoll = dice.rollD6(1, 0);
				$scope.attackResult += sprintf.sprintf("%d gedobbeld voor afbreken.", missedRoll);
				if (missedRoll === 1) {
					$scope.weaponIsWhole = false;
					$scope.player.weapon = new weapon.Weapon("vuisten", 1, -2);
					$scope.player.attackStat = 7;
					$scope.player.defenceStat = 0;
				}
			}
		};

		this.lockIsLocked = function () {
			return $scope.lockIsLocked;
		};
		this.weaponIsWhole = function () {
			return $scope.weaponIsWhole;
		};
	};

	function register(app) {
		console.log("attack_lock_directive.register");

		app.directive("attackLock", function () {
			return {
				restrict: "E",
				templateUrl: "templates/attack-lock.html",
				transclude: true,
				scope: {},
				controller: attackLockController
			};
		});

		app.directive("lockOpened", function () {
			function linkFunction($scope, element, attributes, attackLockController) {
				$scope.canShow = function () {
					return !attackLockController.lockIsLocked();
				};
			}

			return {
				restrict: "E",
				require: "^attackLock",
				templateUrl: "templates/lock-opened.html",
				transclude: true,
				scope: {},
				link: linkFunction
			};
		});

		app.directive("weaponBroken", function () {
			function linkFunction($scope, element, attributes, attackLockController) {
				$scope.canShow = function () {
					return !attackLockController.weaponIsWhole();
				};
			}

			return {
				restrict: "E",
				require: "^attackLock",
				templateUrl: "templates/weapon-broken.html",
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