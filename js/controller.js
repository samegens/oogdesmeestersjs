define(["jquery", "character", "weapon", "armor", "sprintf"], function ($, character, weapon, armor, sprintf) {
	"use strict";

	function register(app) {
		app.controller("GameController", ["$scope", function ($scope) {

			function increaseVariableIfPresent(incrVarName) {
				if (incrVarName) {
					if (!$scope.variables[incrVarName]) {
						$scope.variables[incrVarName] = 1;
						console.log("Created variable " + incrVarName);
					} else {
						$scope.variables[incrVarName] += 1;
						console.log(sprintf.sprintf("Increased variable %s: %d", incrVarName, $scope.variables[incrVarName]));
					}
				}
			}

			function getVariableValue(varName) {
				var val = parseInt($scope.variables[varName], 10);
				if (isNaN(val)) {
					return 0;
				}

				return val;
			}

			function processShowAttributes(elt) {
				var elts = elt.find("[data-show]"),
					expr = "",
					exprParts = [],
					varValue = 0,
					testValue = 0,
					show = false;
				$.each(elts, function (i, elt) {
					expr = $(elt).data("show");
					exprParts = expr.split(" ");
					if (exprParts.length !== 3) {
						console.log("Can't parse expression " + expr);
					} else {
						varValue = getVariableValue(exprParts[0]);
						testValue = parseInt(exprParts[2], 10);
						if (exprParts[1] === ">") {
							show = varValue > testValue;
						} else if (exprParts[1] === "==") {
							show = varValue === testValue;
						}

						if (show) {
							$(elt).show();
						} else {
							$(elt).hide();
						}
					}
				});
			}

			function resetDamageTags(elt) {
				// Apparently the scope on the damage tag is the global scope, but all tags within have the directive scope.
				var $damageDiv = $(elt).find("damage div");
				if ($damageDiv.length > 0) {
					$damageDiv.scope().reset();
				}
			}

			function toPar(parName) {
				$("div.par").hide();
				var selector = sprintf.sprintf("div.%s", parName),
					elt = $(selector);
				processShowAttributes(elt);
				resetDamageTags(elt);
				elt.show();
			}

			$scope.player = new character.Character("Alrik", 30, 11, 8, "player");
			$scope.player.weapon = new weapon.Weapon("knuppel", 1, 2);
			$scope.currentFight = null;
			$scope.variables = {};
			$scope.par = function (parId, varToIncrement) {
				console.log(sprintf.sprintf("par(%s, %s)", parId, varToIncrement));
				increaseVariableIfPresent(varToIncrement);

				toPar("par" + parId);
			};
			$scope.dmg = function (dmgPoints) {
				$scope.player.applyDamage(dmgPoints);
			};
			$scope.weapon = function (name, nrDice, modifier) {
				$scope.player.weapon = new weapon.Weapon(name, nrDice, modifier);
			};
			$scope.armor = function (namePrefix, name, ap, special) {
				$scope.player.armor = new armor.Armor(namePrefix, name, ap, special);
			};
			$scope.restoreHP = function () {
				$scope.player.hp = 30;
			};
		}]);
	}

	return {
		register: register
	};
});
