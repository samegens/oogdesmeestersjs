define(["weapon", "armor", "dice"], function (weapon, armor, dice) {
	"use strict";

	function Character(name, hp, attack, defence, special) {
		this.name = name;
		this.hp = hp;
		this.attackStat = attack;
		this.defenceStat = defence;
		this.special = special;
	}

	Character.prototype = {
		isAlive: function () {
			return this.hp > 0;
		},
		attack: function () {
			var roll = dice.rollD20();
			return {
				roll: roll,
				success: roll <= this.attackStat,
				damage: roll <= this.attackStat ? this.weapon.rollDamage() : 0
			};
		},
		defend: function () {
			var roll = dice.rollD20();
			return {
				roll: roll,
				success: roll <= this.defenceStat
			};
		},
		getEffectiveDamage: function (damage) {
			if (this.armor && this.armor.ap) {
				return Math.max(damage - this.armor.ap, 0);
			}

			return damage;
		},
		applyDamage: function (damage) {
			this.applyEffectiveDamage(this.getEffectiveDamage(damage));
		},
		applyEffectiveDamage: function (damage) {
			this.hp = Math.max(this.hp - damage, 0);
		},
		die: function () {
			this.hp = 0;
		}
	};

	return {
		Character: Character
	};
});
