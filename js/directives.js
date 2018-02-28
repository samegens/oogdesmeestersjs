define(["fight_directive", "damage_directive", "attack_lock_directive", "force_door_directive", "check_directive"], function (fightDirective, damageDirective, attackLockDirective, forceDoorDirective, checkDirective) {
	function register(app) {
		fightDirective.register(app);
		damageDirective.register(app);
		attackLockDirective.register(app);
		forceDoorDirective.register(app);
		checkDirective.register(app);
	}
	
	return {
		register: register
	};
});
