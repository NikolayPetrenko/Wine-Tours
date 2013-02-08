var pages = {
	init: function(){
		this.redactor();
	},
	
	redactor: function() {
		$('#text').redactor();
	}
};

$(function() {
	pages.init();
});