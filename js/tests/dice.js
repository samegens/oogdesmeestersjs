define(["QUnit", "../dice"], function (QUnit, dice) {
	"use strict";

	QUnit.test("zero dice", function (assert) {
		assert.equal(dice.rollD6(0, 1), 1);
		assert.equal(dice.rollD20(0, 1), 1);
	});

});
