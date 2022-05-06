getUserLanguage = function() {
	// return navigator.language || navigator.userLanguage || 'tr';
	return navigator.languages[1]; // or it returns 'tr'
}
if(Meteor.isClient) {
	Meteor.startup(function() {
		TAPi18n.setLanguage(getUserLanguage());
	})
}
