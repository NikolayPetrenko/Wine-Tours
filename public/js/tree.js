var tree = {
	init: function(){
		this.hideChildren();
	},

	hideChildren: function() {
		var pids = $('.tree_body').find('.pid');
		console.log(pids);
	}
}

//init our object
$(function() {
        tree.init();
});