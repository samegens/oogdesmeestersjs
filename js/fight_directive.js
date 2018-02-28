define(["jquery", "fight", "character", "weapon", "armor", "sprintf"], function ($, fight, character, weapon, armor, sprintf) {
	"use strict";

	console.log("fight_directive loading");

	var fightController = function ($scope) {

		function addEnemy(enemy) {
			console.log("fight.controller.addEnemy");
			$scope.enemies.push(enemy);

			if (enemy.special === "mirrorDemon") {
				enemy.hp = $scope.player.hp;
				enemy.attackStat = $scope.player.attackStat;
				enemy.defenceStat = $scope.player.defenceStat;
				enemy.weapon = $scope.player.weapon;
			}
		}

		function processPlayerAttack(enemy) {
			var playerAttackResult = $scope.player.attack(),
				roundStatus = sprintf.sprintf("Aanval op %s: %s (%d gedobbeld). ", enemy.name, playerAttackResult.success ? "gelukt" : "mislukt", playerAttackResult.roll),
				enemyDefendResult = {};

			if (playerAttackResult.success) {
				enemyDefendResult = enemy.defend();
				roundStatus += sprintf.sprintf("Verdediging: %s (%d gedobbeld). ", enemyDefendResult.success ? "gelukt" : "mislukt", enemyDefendResult.roll);
				if (enemyDefendResult.success) {
					roundStatus += "Geen schade. ";
				} else {
					roundStatus += sprintf.sprintf("%d levenspunten schade (%d gedobbeld). ", enemy.getEffectiveDamage(playerAttackResult.damage), playerAttackResult.damage);
					enemy.applyDamage(playerAttackResult.damage);
				}
			}
			$scope.roundResults.push(roundStatus);
		}

		function processEnemiesAttack() {
			$.each($scope.enemies, function (i, enemy) {
				if (enemy.isAlive() && $scope.player.isAlive()) {
					var enemyAttackResult = enemy.attack(),
						roundStatus = sprintf.sprintf("Aanval van %s: %s (%d gedobbeld). ", enemy.name, enemyAttackResult.success ? "gelukt" : "mislukt", enemyAttackResult.roll),
						playerDefendResult = {},
						specialResults = [];

					if (enemyAttackResult.success) {
						playerDefendResult = $scope.player.defend();
						roundStatus += sprintf.sprintf("Verdediging: %s (%d gedobbeld). ", playerDefendResult.success ? "gelukt" : "mislukt", playerDefendResult.roll);
						if (playerDefendResult.success) {
							roundStatus += "Geen schade. ";
						} else {
							roundStatus += sprintf.sprintf("%d levenspunten schade (%d gedobbeld). ", $scope.player.getEffectiveDamage(enemyAttackResult.damage), enemyAttackResult.damage);
							$scope.player.applyDamage(enemyAttackResult.damage);

							specialResults = enemy.weapon.applySpecialOnHit($scope.player, enemyAttackResult.damage);
							roundStatus += specialResults.join(" ");
						}
					}

					$scope.roundResults.push(roundStatus);
				}
			});
		}

		function updateFightStatus() {
			if (!$scope.player.isAlive()) {
				$scope.isLost = true;
			}

			var anyEnemyAlive = false;
			$.each($scope.enemies, function (i, enemy) {
				anyEnemyAlive = anyEnemyAlive || enemy.isAlive();
			});
			$scope.isWon = !anyEnemyAlive;
		}

		function attack(enemy) {
			console.log("fight.controller.fight " + enemy.name);

			$scope.roundResults = [];
			if ($scope.player.armor) {
				var armorResults = $scope.player.armor.applySpecialAtStartOfRound($scope.enemies);
				if (armorResults && armorResults.length > 0) {
					$scope.roundResults.push.apply($scope.roundResults, armorResults);
				}
			}
			processPlayerAttack(enemy);
			processEnemiesAttack();
			updateFightStatus();
		}

		function isFightLost() {
			return $scope.isLost;
		}

		console.log("fight.controller");

		$scope.isWon = false;
		$scope.isLost = false;
		$scope.player = $scope.$parent.player;	//SAMTODO: player uit een service halen
		$scope.fight = new fight.Fight($scope.parWinId, $scope.parLoseId);
		$scope.enemies = [];

		$scope.roundResults = ["Klik op 'Val aan' om een monster aan te vallen."];
		$scope.par = $scope.$parent.par;

		this.addEnemy = addEnemy;
		this.attack = attack;
		this.isFightLost = isFightLost;
	};

	function register(app) {
		console.log("fight_directive.register");

		app.directive("fight", function () {
			return {
				restrict: "E",
				templateUrl: "templates/fight.html",
				transclude: true,
				scope: {
					parWinId: "=winPar",
					parLoseId: "=losePar"
				},
				controller: fightController
			};
		});

		app.directive("enemy", function () {
			var linkFunction = function ($scope, element, attributes, fightCtrl) {
				console.log("enemy.linkFunction");

				$scope.enemy = new character.Character($scope.name, parseInt($scope.hp, 10), parseInt($scope.attack, 10), parseInt($scope.defence, 10), $scope.special);
				if ($scope.weaponName) {
					$scope.weaponDice = $scope.weaponDice || 0;
					$scope.weaponModifer = $scope.weaponModifier || 0;
					$scope.enemy.weapon = new weapon.Weapon($scope.weaponName, parseInt($scope.weaponDice, 10), parseInt($scope.weaponModifier, 10), $scope.weaponSpecial);
				}
				if ($scope.armorName) {
					$scope.enemy.armor = new armor.Armor($scope.armoreNamePrefix, $scope.armorName, parseInt($scope.armorAp, 10));
				}
				fightCtrl.addEnemy($scope.enemy);

				$scope.attackEnemy = function () {
					console.log("enemy.attackEnemy");
					fightCtrl.attack($scope.enemy);
				};
				$scope.canAttackEnemy = function () {
					return $scope.enemy.isAlive() && !fightCtrl.isFightLost();
				};
			};

			return {
				require: "^fight",
				restrict: "E",
				templateUrl: "templates/enemy.html",
				link: linkFunction,
				scope: {
					name: "@",
					hp: "@",
					attack: "@",
					defence: "@",
					weaponName: "@",
					weaponDice: "@",
					weaponModifier: "@",
					weaponSpecial: "@",
					armorNamePrefix: "@",
					armorName: "@",
					armorAp: "@",
					special: "@"
				}
			};
		});
	}

	return {
		register: register
	};
});