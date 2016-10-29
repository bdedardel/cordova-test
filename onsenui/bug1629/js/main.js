// //////////////////////////////////////////////
// MAIN
// //////////////////////////////////////////////
ons.ready(function() {
	console.log('[bug1629] ' + 'ons.ready');

	document.addEventListener("pageinit",
			function(e) {
				if (e.target.id != '') {
					console.debug("[bug1629] pageinit: id='" + e.target.id
							+ "'", e);
				} else if (e.target.name != null && e.target.name != '') {
					console.debug("[bug1629] pageinit: name='"
							+ e.target.name + "'", e);
				} else {
					console.warn("[bug1629] pageinit '' => ", e.target);
				}
			}, false);

	//$('#splitter-page').show();
});