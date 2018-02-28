define(["jquery", "dice", "sprintf"], function ($, dice, sprintf) {
	"use strict";

	function Armor(namePrefix, name, ap, special) {
		this.namePrefix = namePrefix;
		this.name = name;
		this.ap = ap;
		this.special = special;
	}

	Armor.prototype = {
		toString: function () {
			if (!this.name) {
				return "-";
			}
			return sprintf.sprintf("%s, %d BW", this.name, this.ap);
		},

		applySpecialAtStartOfRound: function (enemies) {
			var results = [],
				roll = 0,
				resultLine = "",
				armorNamePrefix = this.namePrefix,
				armorName = this.name;
			switch (this.special) {
			case "voodooSchild":
				$.each(enemies, function (i, enemy) {
					roll = dice.rollD6();
					resultLine = sprintf.sprintf("%s dobbelt %d voor %s %s", enemy.name, roll, armorNamePrefix, armorName);
					if (roll === 6) {
						resultLine += " en lost op in donkerbruine rook.";
						enemy.die();
					} else {
						resultLine += ", er gebeurt niks.";
					}
					results.push(resultLine);
				});
				break;
			}

			return results;
		}
	};

	return {
		Armor: Armor
	};
});