// //////////////////////////////////////////////
// MAIN
// //////////////////////////////////////////////
ons.ready(function() {
	console.log('[onsenuilog] ' + 'ons.ready');

	document.addEventListener("pageinit",
			function(e) {
				if (e.target.id != '') {
					console.debug("[onsenuilog] pageinit: id='" + e.target.id
							+ "'", e);
				} else if (e.target.name != null && e.target.name != '') {
					console.debug("[onsenuilog] pageinit: name='"
							+ e.target.name + "'", e);
				} else {
					console.warn("[onsenuilog] pageinit '' => ", e.target);
				}
			}, false);

	$('#splitter-page').show();
});