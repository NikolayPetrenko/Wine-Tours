
var regions = {

	init: function(){
		this.observeRemoveBtns();
		this.filter();
	},

	filter: function() {
		var form = $('#country_filter');
		$("#country_filter #countries").change(function(){
			var country = $("#country_filter #countries :selected").val();
			form.append("<input type='hidden' name='country' value='" + country + "' >");
			 // and submit
			 form.get(0).submit();			
		})
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
		var regionID 	= link.attr('rel').replace('region_', '');
		this.latestLink = link;
		
		var myModal = new MyModal();
		myModal.init({
			title : 'Delete Region',
			text: "Are you sure you want to delete this region?",
			buttons: [
			          {
					value : 'OK',
					callback: 'regions.remove('+regionID+')',
					cls: 'btn-primary'
			          },
			          {
					value : 'Cancel',
					callback: 'regions.hideModal()',
					cls: ''
			          }
			]
		});
	},

	hideModal: function() {
		var myModal = new MyModal();
		myModal.hide();
	},

	remove: function(regionID) {
		var $this = this;
		 $.ajax({
             url: SYS.siteUrl + '/admin/deleteregion/',
             type: 'POST',
             //dataType: 'json',
             data: 'regionID='+ regionID,
             success: function(response) {
			 	//if(response.result == 1) {
			 		var tr = $this.latestLink.parents('tr');
			 		tr.fadeOut('slow', function() {
			 			tr.remove();
			 		})
			 	//}
			 	regions.hideModal();
             }
         });
	}
}

//init our object
$(function() {
        regions.init();
})