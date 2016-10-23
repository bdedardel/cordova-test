// //////////////////////////////////////////////
// MAIN
// //////////////////////////////////////////////
ons.ready(function() {
	console.debug('[onsenuilog] ' + 'ons.ready');

  // comment => blank page
	console.warn("[bug#1623] js/main.js: comment $('#splitter-page').show(); to see blank page");
	$('#splitter-page').show();
});
