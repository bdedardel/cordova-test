[bug#1623] blank page at init with ons-splitter + ons-navigator
===============================================================

I made some new tests on initialization.
Here are the results, without being able to analyse them without you!


Firefox - angular-onsenui before onsenui in head
--------------------------------------

### index.html

```
<head>
	...
	<script src="js/devDeps/angular.js"></script>
	<script src="js/devDeps/angular-onsenui.js"></script>
	<script src="js/devDeps/onsenui.js"></script>
	...
</head>
<body>
	...
	<script src="js/core.js"></script>
	<script src="js/main.js"></script>
</body>
```

### result

- No blank page
- There is an error: **TypeError: ons._readyLock is undefined**

```
angular-onsenui waitOnsenUILoad... 
TypeError: ons._readyLock is undefined angular...enui.js (ligne 118, col. 6)
core::init(): begin... 
core::init(): end! 
[main] ons.ready 
```

Firefox - angular-onsenui after onsenui in head
--------------------------------------

### index.html

```
<head>
	...
	<script src="js/devDeps/angular.js"></script>	
	<script src="js/devDeps/onsenui.js"></script>
	<script src="js/devDeps/angular-onsenui.js"></script>
	...
</head>
<body>
	...
	<script src="js/core.js"></script>
	<script src="js/main.js"></script>
</body>
```

### result

- No blank page
- There is an error: **TypeError: view is undefined** in js/devDeps/angular-onsenui.js (ligne 11061, col. 7) due to *angular.element(element).data('ons-splitter-content') is undefined* in js/devDeps/angular-onsenui.js (ligne 11056)

```
angular-onsenui waitOnsenUILoad... 
core::init(): begin... 
core::init(): end! 
angular-onsenui - window.ons.SplitterContentElement.rewritables.link angular.element(element) is ok: Object[ons-splitter-content] 
angular-onsenui - window.ons.SplitterContentElement.rewritables.link angular.element(element).data('ons-splitter-content') is NOK: undefined
[main] ons.ready 
angular-onsenui - window.ons.NavigatorElement.rewritables.link angular.element(navigatorElement) is ok
angular-onsenui - window.ons.NavigatorElement.rewritables.link angular.element(navigatorElement).data('ons-navigator') is ok
angular-onsenui - window.ons.SplitterContentElement.rewritables.link angular.element(element) is ok
angular-onsenui - window.ons.SplitterContentElement.rewritables.link angular.element(element).data('ons-splitter-content') is ok

some few seconds later:

TypeError: view is undefined angular...enui.js (ligne 11061, col. 7)
```

Firefox - angular-onsenui after onsenui in body
--------------------------------------

### index.html

```
<body>
	...
	<script src="js/devDeps/angular.js"></script>
	<script src="js/devDeps/angular-onsenui.js"></script>	
	<script src="js/devDeps/onsenui.js"></script>	
	<script src="js/core.js"></script>
	<script src="js/main.js"></script>
</body>
```

### result

- There is a **blank page**
- There is an error: **TypeError: view is undefined** in js/devDeps/angular-onsenui.js (ligne 8493, col. 2) due to *angular.element(navigatorElement).data('ons-navigator') undefined* in js/devDeps/angular-onsenui.js (ligne 8489)
- and another error: **TypeError: this._backButtonHandler is undefined** in onsenui.js (ligne 22337, col. 10)

**Note**:

*angular.element(element).data('ons-splitter-content')* is fine, after *ons.ready* call

```
angular-onsenui waitOnsenUILoad...
angular-onsenui - window.ons.NavigatorElement.rewritables.link angular.element(navigatorElement) is ok
angular-onsenui - window.ons.NavigatorElement.rewritables.link angular.element(navigatorElement).data('ons-navigator') is NOK: undefined
TypeError: this._backButtonHandler is undefined onsenui.js (ligne 22337, col. 10)
core::init(): begin...
core::init(): end!
[main] ons.ready
angular-onsenui - window.ons.SplitterContentElement.rewritables.link angular.element(element) is ok
angular-onsenui - window.ons.SplitterContentElement.rewritables.link angular.element(element).data('ons-splitter-content') is ok

and some few seconds later: 

TypeError: view is undefined angular...enui.js (ligne 8493, col. 2)
``` 