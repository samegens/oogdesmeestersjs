define(["QUnit", "../character"], function (QUnit, character) {
	"use strict";

	QUnit.test("isAlive", function (assert) {
		var c = new character.Character("test", 30, 11, 8, 1, 2);
		assert.equal(c.isAlive(), true);

		c.applyDamage(30);
		assert.equal(c.isAlive(), false);
	});

	QUnit.test("attack", function (assert) {
		var c = new character.Character("test", 30, 11, 8, 1, 2),
			a = {};
		while (true) {
			a = c.attack();
			if (a.success) {
				break;
			}
		}
		assert.ok(a.roll <= 11);
		assert.ok(a.damage >= 1);

		while (true) {
			a = c.attack();
			if (!a.success) {
				break;
			}
		}
		assert.ok(a.roll > 11);
		assert.equal(a.damage, 0);
	});

	QUnit.test("defend", function (assert) {
		var c = new character.Character("test", 30, 11, 8, 1, 2),
			a = {};
		while (true) {
			a = c.defend();
			if (a.success) {
				break;
			}
		}
		assert.ok(a.roll <= 8);

		while (true) {
			a = c.defend();
			if (!a.success) {
				break;
			}
		}
		assert.ok(a.roll > 8);
	});

});
