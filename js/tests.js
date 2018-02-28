"use strict";
require.config({
	baseUrl: 'js',
    paths: {
		"jquery" : "lib/jquery.min",
        'QUnit': 'http://code.jquery.com/qunit/qunit-1.15.0',
		"sprintf" : "lib/sprintf"
    },
    shim: {
       'QUnit': {
           exports: 'QUnit',
           init: function() {
               QUnit.config.autoload = false;
               QUnit.config.autostart = false;
           }
       } 
    }
});

require(["QUnit", "tests/character", "tests/dice"], function(QUnit, characterTest, diceTest) {
	QUnit.load();
	QUnit.start();
});
