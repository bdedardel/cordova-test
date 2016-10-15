var onsenuiCore;
(function (onsenuiCore) {
    'use strict';
    var AppController = (function () {
        // //////////////////////////////////////////////
        // CONSTRUCTORS
        // //////////////////////////////////////////////
        function AppController($scope, $location, onsenuiStorage) {
            this.$scope = $scope;
            this.$location = $location;
            this.onsenuiStorage = onsenuiStorage;
            console.log("AppController::constructor(): begin...");
            this.onsOnsenUINavigator = $scope.onsOnsenUINavigator;
            this.scope = $scope;
            this.storage = onsenuiStorage;
            console.log("AppController::constructor(): end!");
        }
        return AppController;
    }());
    onsenuiCore.AppController = AppController;
})(onsenuiCore || (onsenuiCore = {}));

var onsenuiCore;
(function (onsenuiCore) {
    'use strict';
    var MyModelItem = (function () {
        // //////////////////////////////////////////////
        // CONSTRUCTORS
        // //////////////////////////////////////////////
        function MyModelItem() {
            // //////////////////////////////////////////////
            // ATTRIBUTES
            // //////////////////////////////////////////////
            /**
                * Form validation
                */
            this._isValid = true;
            this._id = -1;
            this._field1 = '';
        }
        // //////////////////////////////////////////////
        // CLASS METHODS
        // //////////////////////////////////////////////
        MyModelItem.copy = function (mymodel) {
            var res = new MyModelItem();
            res.id = mymodel.id;
            res.field1 = mymodel.field1;
            return res;
        };
        MyModelItem.type = function (mymodel) {
            if (mymodel instanceof MyModelItem) {
                return mymodel;
            }
            return MyModelItem.copy(mymodel);
        };
        Object.defineProperty(MyModelItem.prototype, "id", {
            ////////////////////////////////////////////////
            //ACCESSORS
            ////////////////////////////////////////////////
            get: function () {
                return this._id;
            },
            set: function (id) {
                if (id == null) {
                    console.warn("MyModelItem::setId(null)", id);
                }
                else if (typeof (id) == "string") {
                    console.warn("MyModelItem::setId(" + typeof (id) + " != Number) => parse it", id);
                    this._id = parseInt('' + id);
                }
                else if (typeof (id) != "number") {
                    console.error("MyModelItem::setId(" + typeof (id) + " != Number)", id);
                }
                else {
                    this._id = id;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MyModelItem.prototype, "field1", {
            get: function () {
                return this._field1;
            },
            set: function (field1) {
                var log = '';
                if (field1 != null) {
                    if (field1.length < 10) {
                        log = field1;
                    }
                    else {
                        log = field1.substring(0, 10) + '...';
                    }
                }
                if (field1 != null) {
                    if (typeof (field1) == 'string') {
                        this._field1 = field1.trim();
                    }
                    else {
                        this._field1 = JSON.stringify(field1);
                    }
                }
                else {
                    console.debug("MyModelItem::setField1(): undefined field1");
                    this._field1 = '';
                }
            },
            enumerable: true,
            configurable: true
        });
        // //////////////////////////////////////////////
        // PRIVATE METHODS
        // //////////////////////////////////////////////
        MyModelItem.prototype.getTitle = function () {
            return this._field1;
        };
        // //////////////////////////////////////////////
        // PUBLIC METHODS
        // //////////////////////////////////////////////
        MyModelItem.prototype.toSummary = function () {
            return this.getTitle();
        };
        MyModelItem.prototype.toString = function () {
            var res = '';
            res = 'MyModel#' + this.id;
            if (this.field1 != null && this.field1.length > 10) {
                res += ' - field1=' + this.field1.substring(0, 10) + '...';
            }
            else {
                res += ' - field1=' + this.field1;
            }
            return res;
        };
        MyModelItem.prototype.toObject = function () {
            var res = {
                id: this._id,
                field1: this._field1
            };
            return res;
        };
        MyModelItem.prototype.clone = function () {
            var res = new MyModelItem();
            res.id = this.id;
            res.field1 = this.field1;
            return res;
        };
        MyModelItem.prototype.entityName = function () {
            return 'MyModel';
        };
        MyModelItem.prototype.isValid = function () {
            var res = true;
            if (this.field1 == null || this.field1.length <= 0) {
                console.debug("MyModelItem::isValid(): empty property field1");
                return false;
            }
            return res;
        };
        return MyModelItem;
    }());
    onsenuiCore.MyModelItem = MyModelItem;
})(onsenuiCore || (onsenuiCore = {}));
/// <reference path='../_all.ts' />

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
            console.log("[onsenuilog] Navigator::pushPage " + page);
            Navigator.isPopAction = false;
            if (param != null) {
                Navigator.onsOnsenUINavigator.pushPage(page, { data: param.data, animation: "none" });
            }
            else {
                Navigator.onsOnsenUINavigator.pushPage(page, { animation: "none" });
            }
        };
        Navigator.replacePage = function (page, param) {
            console.log("[onsenuilog] Navigator::replacePage " + page);
            Navigator.isPopAction = false;
            if (param != null) {
                Navigator.onsOnsenUINavigator.replacePage(page, { data: param.data, animation: "none" });
            }
            else {
                Navigator.onsOnsenUINavigator.replacePage(page, { animation: "none" });
            }
        };
        Navigator.popPage = function (refresh) {
            console.log("[onsenuilog] Navigator::popPage " + Navigator.onsOnsenUINavigator.topPage.name);
            Navigator.isPopAction = true;
            if (refresh) {
                Navigator.onsOnsenUINavigator.popPage({ refresh: true }).then(function (page) {
                    console.log("[onsenuilog] Navigator::popPage - " + page.name + " - reinit Navigator.isPopAction = false");
                    Navigator.isPopAction = false;
                });
            }
            else {
                Navigator.onsOnsenUINavigator.popPage().then(function (page) {
                    console.log("[onsenuilog] Navigator::popPage - " + page.name + " - reinit Navigator.isPopAction = false");
                    Navigator.isPopAction = false;
                });
            }
        };
        Navigator.hasPages = function () {
            var pages = Navigator.onsOnsenUINavigator.pages;
            if (pages.length <= 0) {
                console.warn("[onsenuilog] Navigator::hasPages = 0, should be initialization");
            }
            return pages.length > 0;
        };
        Navigator.getCurrentPage = function () {
            var pages = Navigator.onsOnsenUINavigator.pages;
            for (var i = 0; i < pages.length; i++) {
                console.log("[onsenuilog] Navigator::getCurrentPage - page[" + i + "] = " + pages[i].name);
            }
            if (Navigator.isPopAction == true) {
                if (Navigator.onsOnsenUINavigator.pages.length < 3) {
                    console.error("[onsenuilog] Navigator::getCurrentPage - pages length is " + Navigator.onsOnsenUINavigator.pages.length);
                    //                    var pages = Navigator.onsOnsenUINavigator.pages;
                    //                      for (var i=0;i<pages.length;i++) {
                    //                          console.log("[onsenuilog] Navigator::getCurrentPage - page["+i+"] " + pages[i].name);
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
                console.log("[onsenuilog] Navigator::getCurrentPage => page[" + (pages.length - 3) + "] " + pages[pages.length - 3].name);
                return Navigator.onsOnsenUINavigator.pages[Navigator.onsOnsenUINavigator.pages.length - 3];
            }
            else if (Navigator.onsOnsenUINavigator.topPage == null) {
                console.error("[onsenuilog] Navigator::getCurrentPage - undefined top page");
                return null;
            }
            else {
                console.log("[onsenuilog] Navigator::getCurrentPage - top page " + Navigator.onsOnsenUINavigator.topPage.name);
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
        function MyModelController($scope, $location, onsenuiStorage) {
            this.$scope = $scope;
            this.$location = $location;
            this.onsenuiStorage = onsenuiStorage;
            MyModelController.ID++;
            ////// init attributes
            // ons onsenui navigator
            this.onsOnsenUINavigator = $scope.onsOnsenUINavigator;
            onsenuiCore.Navigator.onsOnsenUINavigator = $scope.onsOnsenUINavigator;
            // scope
            this.scope = $scope;
            // storage
            this.storage = onsenuiStorage;
            var currentPage = null;
            var isList = false;
            if (!onsenuiCore.Navigator.hasPages()) {
                isList = true;
            }
            else {
                currentPage = onsenuiCore.Navigator.getCurrentPage();
                if (currentPage == null) {
                    var pages = onsenuiCore.Navigator.onsOnsenUINavigator.pages;
                    console.error("[onsenuilog] MyModelController#" + MyModelController.ID + "::constructor() - undefined current page pages=", pages);
                    for (var i = 0; i < pages.length; i++) {
                        console.log("[onsenuilog] MyModelController#" + MyModelController.ID + "::constructor() - page[" + i + "] " + pages[i].name);
                    }
                    return;
                }
                if (currentPage.name == 'new-mymodel.html' || currentPage.name == 'view-mymodel.html' || currentPage.name == 'edit-mymodel.html') {
                    isList = false;
                }
                else {
                    isList = true;
                }
            }
            if (currentPage != null) {
                console.log("[onsenuilog] MyModelController#" + MyModelController.ID + "::constructor(): page: " + currentPage.name);
            }
            else {
                console.log("[onsenuilog] MyModelController#" + MyModelController.ID + "::constructor(): page: initialization...");
            }
            if (isList) {
                // console.log("[onsenuilog] MyModelController#" + MyModelController.ID + "::constructor(): mymodel index');
                if (currentPage != null && currentPage.data != null && currentPage.data.selectedItems != null) {
                    console.log("[onsenuilog] MyModelController#" + MyModelController.ID + "::constructor(): selectedItems3 = " + currentPage.data.selectedItems.length);
                    this.scope.items = currentPage.data.selectedItems;
                }
                else {
                    this.scope.items = this.storage.getMyModelItems();
                }
            }
            else {
                if ($scope.onsOnsenUINavigator != null && currentPage != null) {
                    if (currentPage.data != null && currentPage.data.selectedParam != null) {
                        console.log("[onsenuilog] MyModelController#" + MyModelController.ID + "::constructor(): selected item", currentPage.data.selectedParam);
                        this.scope.mymodel = onsenuiCore.MyModelItem.copy(currentPage.data.selectedParam);
                        this.scope.initialMyModel = onsenuiCore.MyModelItem.copy(this.scope.mymodel);
                    }
                    else {
                        console.log("[onsenuilog] MyModelController#" + MyModelController.ID + "::constructor(): " + currentPage.name + " create new item");
                        this.scope.mymodel = new onsenuiCore.MyModelItem();
                        this.scope.initialMyModel = new onsenuiCore.MyModelItem();
                    }
                }
                else {
                    console.warn("[onsenuilog] MyModelController#" + MyModelController.ID + "::constructor(): undefined navigator");
                    this.scope.mymodel = new onsenuiCore.MyModelItem();
                    this.scope.initialMyModel = new onsenuiCore.MyModelItem();
                }
            }
        }
        // //////////////////////////////////////////////
        // MYMODEL MAIN METHODS
        // //////////////////////////////////////////////
        MyModelController.prototype.edit = function (selectedItem) {
            if (selectedItem == null) {
                console.error('[onsenuilog] ' + 'MyModelController' + MyModelController.ID + '::editMyModelListItemAction: undefined parameter');
                this.onsOnsenUINavigator.replacePage('index.html', null);
                return;
            }
            else if (!(selectedItem instanceof onsenuiCore.MyModelItem)) {
                selectedItem = onsenuiCore.MyModelItem.copy(selectedItem);
            }
            console.log('[onsenuilog] ' + 'MyModelController' + MyModelController.ID + '::editMyModelListItemAction[' + selectedItem.id + ']');
            // push selected item
            onsenuiCore.Navigator.pushPage('edit-mymodel.html', { data: { selectedParam: selectedItem } });
        };
        MyModelController.prototype.newAction = function () {
            console.log('[onsenuilog] ' + 'MyModelController' + MyModelController.ID + '::newAction');
            // get selected item
            var newItem = new onsenuiCore.MyModelItem();
            // push selected item
            onsenuiCore.Navigator.pushPage('new-mymodel.html', { data: { selectedParam: newItem } });
        };
        // //////////////////////////////////////////////
        // MYMODEL FORM METHODS
        // //////////////////////////////////////////////
        MyModelController.prototype.showAction = function (mymodel) {
            console.info('[onsenuilog] ' + 'MyModelController#' + MyModelController.ID + '::showAction', mymodel);
            var selectedMyModel = mymodel;
            // push selected item
            onsenuiCore.Navigator.pushPage('view-mymodel.html', { data: { selectedParam: selectedMyModel } });
        };
        MyModelController.prototype.editAction = function (mymodel) {
            console.info('[onsenuilog] ' + 'MyModelController#' + MyModelController.ID + '::editAction', mymodel);
            var selectedMyModel = mymodel;
            // push selected item
            onsenuiCore.Navigator.pushPage('edit-mymodel.html', { data: { selectedParam: selectedMyModel } });
        };
        MyModelController.prototype.saveAction = function (form) {
            if (form == null) {
                console.error("MyModelController::saveAction(): undefined parameter");
                onsenuiCore.Navigator.replacePage('index.html', null);
                return;
            }
            if (!(form instanceof onsenuiCore.MyModelItem)) {
                form = onsenuiCore.MyModelItem.copy(form);
                console.log("MyModelController::saveAction(): copy form=", form);
            }
            if (!form.isValid()) {
                console.error("MyModelController::saveAction(): invalid form");
                return;
            }
            console.info('[onsenuilog] ' + 'MyModelController#' + MyModelController.ID + '::saveAction', form);
            if (form.id != null && form.id > -1) {
                this.onsenuiStorage.updateMyModel(form);
            }
            else {
                var id = this.onsenuiStorage.addMyModel(form);
                form.id = id;
            }
            // [BUG] pop + refresh: ui not refreshed
            /*
             * due to a bad stack:
             * - page[0] null
             * - page[1] view-trip.html
             * - page[2] edit-trip.html <= do not use topPage: this.onsOnsenUINavigator.topPage.data.selectedParam = form;
             * ... but pages-1
             *
             */
            var pages = this.onsOnsenUINavigator.pages;
            pages[pages.length - 2].data.selectedParam = form;
            // for (var i=0;i<pages.length;i++) {
            //     console.log('[onsenuilog] '+'MyModelController#' + MyModelController.ID + '::saveAction - page['+i+'] ' + pages[i].name,pages[i]);
            // }
            onsenuiCore.Navigator.popPage(true);
        };
        MyModelController.prototype.deleteAction = function (mymodel) {
            // TODO use macro
            console.log('[onsenuilog] ' + 'MyModelController#' + MyModelController.ID + '::deleteAction#' + mymodel.toString());
            this.onsenuiStorage.deleteMyModel(mymodel.id);
            onsenuiCore.Navigator.popPage(true);
        };
        MyModelController.prototype.backAction = function (mymodel) {
            console.info('[onsenuilog] ' + 'MyModelController#' + MyModelController.ID + '::backAction', mymodel);
            onsenuiCore.Navigator.popPage(false);
        };
        // //////////////////////////////////////////////
        // MYMODEL GOTO METHODS
        // //////////////////////////////////////////////
        MyModelController.prototype.indexAction = function () {
            this.onsOnsenUINavigator.resetToPage('splitter.html');
        };
        MyModelController.prototype.gotoIndex = function () {
            this.indexAction();
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

var onsenuiCore;
(function (onsenuiCore) {
    'use strict';
    /**
     * Services that persists and retrieves OnsenUI from localStorage.
     */
    var OnsenUIStorage = (function () {
        // //////////////////////////////////////////////
        // CONSTRUCTORS
        // //////////////////////////////////////////////
        function OnsenUIStorage() {
            // //////////////////////////////////////////////
            // ATTRIBUTES
            // //////////////////////////////////////////////
            this._db = null;
            this._mymodels = null;
            console.log('[onsenuilog] ' + 'OnsenUIStorage::init(LokiOnsenUIStorage)');
            // create db
            this._db = new loki('onsenui-db');
            // load db
            this._db.loadDatabase('onsenui-db', function () {
                console.log('[onsenuilog] ' + 'OnsenUIStorage::init()' + " load database");
            });
            // load mymodel collection
            this._mymodels = this._db.getCollection('mymodels');
            if (this._mymodels == null) {
                console.log('[onsenuilog] ' + 'OnsenUIStorage::init()' + " add 'mymodels' collection ");
                this._mymodels = this._db.addCollection('mymodels');
            }
            else {
                console.log('[onsenuilog] ' + 'OnsenUIStorage::init()' + " get 'mymodels' collection ");
            }
            if (OnsenUIStorage.SINGLETON == null) {
                OnsenUIStorage.SINGLETON = this;
            }
        }
        ////////////////////////////////////////////////
        // MYMODEL METHODS
        ////////////////////////////////////////////////
        OnsenUIStorage.prototype.getMyModelItems = function (callback) {
            var res = null;
            if (this._mymodels != null) {
                res = this.findMyModelItems();
                console.log('[onsenuilog] ' + 'OnsenUIStorage::getMyModelItems() => ' + res.length);
            }
            else {
                this.getMyModelItemsCallback(this, callback);
            }
            return res || [];
        };
        OnsenUIStorage.prototype.findMyModelItems = function (query, sort) {
            if (query != null) {
                if (sort != null) {
                    var view = this._mymodels.addDynamicView('mymodelsView');
                    view.applyFind(query);
                    view.applySimpleSort(sort);
                    return view.data();
                }
                else {
                    return this._mymodels.find(query);
                }
            }
            return this._mymodels.find();
        };
        OnsenUIStorage.prototype.saveMyModelItems = function (mymodelList) {
            console.log('[onsenuilog] ' + 'OnsenUIStorage::saveMyModelItems()');
            this._db.saveDatabase(function () {
                console.log('[onsenuilog] ' + 'OnsenUIStorage::saveMyModelItems()' + " save database ");
            });
        };
        OnsenUIStorage.prototype.getMyModel = function (index) {
            console.log('[onsenuilog] ' + 'OnsenUIStorage::getMyModel(' + index + ')');
            return this._mymodels.get(index);
        };
        OnsenUIStorage.prototype.addMyModel = function (newMyModel) {
            console.log('[onsenuilog] ' + 'OnsenUIStorage::addMyModel: ' + newMyModel.toString());
            var obj = this._mymodels.insert(newMyModel.toObject());
            obj.id = obj.$loki;
            this.saveMyModelItems();
            return obj.$loki;
        };
        OnsenUIStorage.prototype.updateMyModel = function (mymodel) {
            console.log('[onsenuilog] ' + 'OnsenUIStorage::updateMyModel: ' + mymodel.toString());
            var obj = this._mymodels.get(mymodel.id);
            this.syncMyModelDatas(mymodel, obj);
            this._mymodels.update(obj);
            this.saveMyModelItems();
        };
        OnsenUIStorage.prototype.deleteMyModel = function (id) {
            console.log('[onsenuilog] ' + 'OnsenUIStorage::deleteMyModel(' + id + ')...');
            var obj = this._mymodels.get(id);
            // cascade first
            //this._mymodels.remove(obj);
            this._mymodels.remove(id);
            obj = this._mymodels.get(id);
            // this._mymodels.flushChanges();
            if (obj != null) {
                console.error('[onsenuilog] ' + 'OnsenUIStorage::deleteMyModel fail to delete MyModel#' + id, obj);
            }
            this.saveMyModelItems();
            obj = this._mymodels.get(id);
            if (obj != null) {
                console.error('[onsenuilog] ' + 'OnsenUIStorage::deleteMyModel fail to delete(2) MyModel#' + id, obj);
            }
            else {
                console.info('[onsenuilog] ' + 'OnsenUIStorage::deleteMyModel #' + id);
            }
        };
        OnsenUIStorage.prototype.syncMyModelDatas = function (ngItem, dbItem) {
            dbItem.id = ngItem.id;
            dbItem.field1 = ngItem.field1;
        };
        OnsenUIStorage.prototype.getMyModelItemsCallback = function (self, callback) {
            // SOLUTION 1 (error with staic items)
            //ngHook.getScope().items = res;
            //ngHook.getScope().$apply();
            // SOLUTION 2: OK, but bad dependency here !
            //MyModelController.reload(res);
            // SOLUTION 3: callback
            if (callback == null) {
                return;
            }
            var timeout = 100;
            console.log('[onsenuilog] ' + 'OnsenUIStorage::getMyModelItemsCallback(' + timeout + ')...');
            setTimeout(function () {
                if (self._mymodels == null) {
                    self.getMyModelItemsCallback(self, callback);
                }
                else {
                    var res = self.findMyModelItems();
                    console.log('[onsenuilog] ' + 'OnsenUIStorage::getMyModelItemsCallback(done) => ' + res.length);
                    // http://recurial.com/programming/understanding-callback-functions-in-javascript/
                    // callback.call(res);
                    callback(res);
                }
            }, timeout);
        };
        return OnsenUIStorage;
    }());
    onsenuiCore.OnsenUIStorage = OnsenUIStorage;
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
    console.log("onsenui::init(): begin...");
    _ngOnsenUIModule = angular.module('onsenuiCore', ['onsen']);
    _ngOnsenUIModule.controller('AppController', onsenuiCore.AppController);
    _ngOnsenUIModule.controller('MyModelController', onsenuiCore.MyModelController);
    _ngOnsenUIModule.service('onsenuiStorage', onsenuiCore.OnsenUIStorage);
    console.log("onsenui::init(): end!");
})(onsenuiCore || (onsenuiCore = {}));