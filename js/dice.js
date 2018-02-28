define(function () {
	"use strict";

	function roll(nrPips, nrDice, modifier) {
		nrDice = typeof nrDice === 'undefined' ? 1 : nrDice;
		modifier = modifier || 0;
		var r = 0,
			i = 0;
		for (i = 0; i < nrDice; i += 1) {
			r += Math.floor(Math.random() * nrPips) + 1;
		}
		return Math.max(0, r + modifier);
	}
	
	function parse(str) {
		var parts = str.split("D"),
			nrDice = parseInt(parts[0]),
			modifier = parts[1] ? parseInt(parts[1]) : 0;
			
		return {
			nrDice: nrDice,
			modifier: modifier
		};
	}

	function rollD6(nrDice, modifier) {
		return roll(6, nrDice, modifier);
	}

	function rollD20(nrDice, modifier) {
		return roll(20, nrDice, modifier);
	}

	return {
		rollD6: rollD6,
		rollD20: rollD20,
		parse: parse
	};
});
