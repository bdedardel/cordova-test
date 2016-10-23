/**
 * The main OnsenUI app module.
 *
 * @type {angular.Module}
 */
var _ngOnsenUIModule;
var onsenuiCore;
(function (onsenuiCore) {
    'use strict';
    console.log("onsenui::init(): begin...");
    _ngOnsenUIModule = angular.module('onsenuiCore', ['onsen']);
    console.log("onsenui::init(): end!");
})(onsenuiCore || (onsenuiCore = {}));
