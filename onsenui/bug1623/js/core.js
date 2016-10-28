/**
 * The main OnsenUI app module.
 *
 * @type {angular.Module}
 */
var onsenuiCore;
(function (onsenuiCore) {
    'use strict';
    console.log("core::init(): begin...");
    var ngOnsenUIModule = angular.module('onsenuiCore', ['onsen']);
    console.log("core::init(): end!");
})(onsenuiCore || (onsenuiCore = {}));
