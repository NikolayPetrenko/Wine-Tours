var grapes = {

	init: function(){
		this.observeRemoveBtns();
	},

	observeRemoveBtns: function() {
		var rmLinks = $('.remove');
		var $this = this;
		rmLinks.click(function() {
			$this.showModal(this);
		});
	},

	showModal: function(link) {
		link 		= $(link);
		var grapeID 	= link.attr('rel').replace('grape_', '');
		this.latestLink = link;
		
		var myModal = new MyModal();
		myModal.init({
			title : 'Delete Grape',
			text: "Are you sure you want to delete this grape?",
			buttons: [
			          {
					value : 'OK',
					callback: 'grapes.remove('+grapeID+')',
					cls: 'btn-primary'
			          },
			          {
					value : 'Cancel',
					callback: 'grapes.hideModal()',
					cls: ''
			          }
			]
		});
	},

	hideModal: function() {
		var myModal = new MyModal();
		myModal.hide();
	},

	remove: function(grapeID) {
		var $this = this;
		 $.ajax({
             url: SYS.siteUrl + '/admin/deletegrape/',
             type: 'POST',
             //dataType: 'json',
             data: 'grapeID='+ grapeID,
             success: function(response) {
			 	//if(response.result == 1) {
			 		var tr = $this.latestLink.parents('tr');
			 		tr.fadeOut('slow', function() {
			 			tr.remove();
			 		})
			 	//}
			 	grapes.hideModal();
             }
         });
	}
}

//init our object
$(function() {
	$('#characteristics').redactor();
        grapes.init();
})