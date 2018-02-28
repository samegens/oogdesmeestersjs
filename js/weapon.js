define(["dice", "sprintf"], function (dice, sprintf) {
	"use strict";

	function Weapon(name, nrDice, modifier, special) {
		this.name = name;
		this.nrDice = nrDice;
		this.modifier = modifier;
		this.special = special;
	}

	Weapon.prototype = {
		rollDamage: function () {
			return dice.rollD6(this.nrDice, this.modifier);
		},
		getDamageDescription: function () {
			var description = this.nrDice + "D";
			if (this.modifier > 0) {
				description += "+" + this.modifier;
			} else if (this.modifier < 0) {
				description += this.modifier;
			}
			return description;
		},
		applySpecialOnHit: function (target, damage) {
			var results = [];
			if (this.special === "minimizeDagger" && damage === 1) {
				target.die();
				results.push(sprintf.sprintf("De dolk verandert %s in een klein gouden figuurtje. ", target.name));
			}
			return results;
		},
		toString: function () {
			return sprintf.sprintf("%s:%dD+%d", this.name, this.nrDice, this.modifier);
		}
	};

	return {
		Weapon: Weapon
	};
});
