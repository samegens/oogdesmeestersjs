define(["character"], function(character) {
	function Fight(winPar, losePar) {
		this.winPar = winPar;
		this.losePar = losePar;
		this.enemies = [];
	};
	
	Fight.prototype = {
		addEnemy: function(enemy) {
			this.enemies.push(enemy);
		}
	};
	
	return {
		Fight: Fight
	};
});
