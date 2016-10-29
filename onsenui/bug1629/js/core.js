var onsenuiCore;
(function (onsenuiCore) {
    'use strict';
    var Navigator = (function () {
        // //////////////////////////////////////////////
        // CONSTRUCTORS
        // //////////////////////////////////////////////
        function Navigator() {
        }
        // //////////////////////////////////////////////
        // CLASS METHODS
        // //////////////////////////////////////////////
        Navigator.pushPage = function (page, param) {
            console.log("[bug1629] Navigator::pushPage " + page);
            Navigator.isPopAction = false;
            if (param != null) {
                Navigator.onsOnsenUINavigator.pushPage(page, { data: param.data, animation: "none" });
            }
            else {
                Navigator.onsOnsenUINavigator.pushPage(page, { animation: "none" });
            }
        };
        Navigator.replacePage = function (page, param) {
            console.log("[bug1629] Navigator::replacePage " + page);
            Navigator.isPopAction = false;
            if (param != null) {
                Navigator.onsOnsenUINavigator.replacePage(page, { data: param.data, animation: "none" });
            }
            else {
                Navigator.onsOnsenUINavigator.replacePage(page, { animation: "none" });
            }
        };
        Navigator.popPage = function (refresh) {
            console.log("[bug1629] Navigator::popPage " + Navigator.onsOnsenUINavigator.topPage.name);
            Navigator.isPopAction = true;
            if (refresh) {
                Navigator.onsOnsenUINavigator.popPage({ refresh: true }).then(function (page) {
                    console.log("[bug1629] Navigator::popPage - " + page.name + " - reinit Navigator.isPopAction = false");
                    Navigator.isPopAction = false;
                });
            }
            else {
                Navigator.onsOnsenUINavigator.popPage().then(function (page) {
                    console.log("[bug1629] Navigator::popPage - " + page.name + " - reinit Navigator.isPopAction = false");
                    Navigator.isPopAction = false;
                });
            }
        };
        Navigator.hasPages = function () {
            var pages = Navigator.onsOnsenUINavigator.pages;
            if (pages.length <= 0) {
                console.warn("[bug1629] Navigator::hasPages = 0, should be initialization");
            }
            return pages.length > 0;
        };
        Navigator.getCurrentPage = function () {
            var pages = Navigator.onsOnsenUINavigator.pages;
            for (var i = 0; i < pages.length; i++) {
                console.log("[bug1629] Navigator::getCurrentPage - page[" + i + "] = " + pages[i].name);
            }
            if (Navigator.isPopAction == true) {
                if (Navigator.onsOnsenUINavigator.pages.length < 3) {
                    console.error("[bug1629] Navigator::getCurrentPage - pages length is " + Navigator.onsOnsenUINavigator.pages.length);
                    //                    var pages = Navigator.onsOnsenUINavigator.pages;
                    //                      for (var i=0;i<pages.length;i++) {
                    //                          console.log("[bug1629] Navigator::getCurrentPage - page["+i+"] " + pages[i].name);
                    //                      }
                    return null;
                }
                // [BUG] pop + refresh: ui not refreshed
                /*
                 * bad stack:
                 * - Navigator::getCurrentPage - page[1] view-trip.html
                 * - Navigator::getCurrentPage - page[2] edit-trip.html
                 * - Navigator::getCurrentPage - page[3] view-trip.html <= name is good here, but not selectedParam !!!
                 */
                console.log("[bug1629] Navigator::getCurrentPage => page[" + (pages.length - 3) + "] " + pages[pages.length - 3].name);
                return Navigator.onsOnsenUINavigator.pages[Navigator.onsOnsenUINavigator.pages.length - 3];
            }
            else if (Navigator.onsOnsenUINavigator.topPage == null) {
                console.error("[bug1629] Navigator::getCurrentPage - undefined top page");
                return null;
            }
            else {
                console.log("[bug1629] Navigator::getCurrentPage - top page " + Navigator.onsOnsenUINavigator.topPage.name);
                return Navigator.onsOnsenUINavigator.topPage;
            }
        };
        // //////////////////////////////////////////////
        // CLASS ATTRIBUTES
        // //////////////////////////////////////////////
        Navigator.onsOnsenUINavigator = null;
        Navigator.isPopAction = false;
        return Navigator;
    }());
    onsenuiCore.Navigator = Navigator;
})(onsenuiCore || (onsenuiCore = {}));
/// <reference path='../utils/Navigator.ts' />
/// <reference path='../_all.ts' />
var onsenuiCore;
(function (onsenuiCore) {
    'use strict';
    var MyModelController = (function () {
        // //////////////////////////////////////////////
        // CONSTRUCTORS
        // //////////////////////////////////////////////
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function MyModelController($scope, $location) {
            this.$scope = $scope;
            this.$location = $location;

            MyModelController.ID++;
            ////// init attributes
            // ons onsenui navigator
            this.onsOnsenUINavigator = $scope.onsOnsenUINavigator;
            onsenuiCore.Navigator.onsOnsenUINavigator = $scope.onsOnsenUINavigator;
            // scope
            this.scope = $scope;          
        }
        // //////////////////////////////////////////////
        // MYMODEL MAIN METHODS
        // //////////////////////////////////////////////
        MyModelController.prototype.showOnsPageBehaviour = function () {
        	console.debug('[bug1629] ' + 'MyModelController' + MyModelController.ID + '::showOnsPageBehaviour');
        	
            onsenuiCore.Navigator.pushPage('show-onspage.html');
        };
        MyModelController.prototype.showOnsTabbarBehaviour = function () {
        	console.debug('[bug1629] ' + 'MyModelController' + MyModelController.ID + '::showOnsTabbarBehaviour');
        	
            onsenuiCore.Navigator.pushPage('show-onstabbar.html');
        };

       
        MyModelController.prototype.backAction = function (mymodel) {
            console.info('[bug1629] ' + 'MyModelController#' + MyModelController.ID + '::backAction', mymodel);
            onsenuiCore.Navigator.popPage(false);
        };
       
        // //////////////////////////////////////////////
        // CLASS ATTRIBUTES
        // //////////////////////////////////////////////
        /**
         * controller id
         */
        MyModelController.ID = 0;
        return MyModelController;
    }());
    onsenuiCore.MyModelController = MyModelController;
})(onsenuiCore || (onsenuiCore = {}));

/**
 * The main OnsenUI app module.
 *
 * @type {angular.Module}
 */
var _ngOnsenUIModule;
var onsenuiCore;
(function (onsenuiCore) {
    'use strict';
    console.log("[bug1629] init(): begin...");
    _ngOnsenUIModule = angular.module('onsenuiCore', ['onsen']);
    _ngOnsenUIModule.controller('MyModelController', onsenuiCore.MyModelController);
    console.log("[bug1629] init(): end!");
})(onsenuiCore || (onsenuiCore = {}));