define(["jquery", "angular", "directives", "controller"], function ($, angular, directives, controller) {
	"use strict";

	var app = angular.module("game", []);
	console.log("Created angular module game");
	controller.register(app);
	directives.register(app);

	angular.bootstrap(document, ["game"]);
	
	// Player stats are hidden by default to prevent seeing the ugly Angular expressions.
	// Angular is done now, so we can show the stats again.
	$("#playerStats").show();

	$(function () {
		angular.element($("[ng-controller]")).scope().par(1);
	});
});
