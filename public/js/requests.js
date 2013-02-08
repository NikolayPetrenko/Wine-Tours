var requests = {

	init: function(){
		this.observeRemoveBtns();
		this.filterType();
		this.filterDate();
	},

	filterDate: function() {
		var form = $('#date_filter');
		$("#date_filter #dates").change(function(){
			var date = $("#date_filter #dates :selected").val();
			var type = $("#type_filter #types :selected").val();
			form.append("<input type='hidden' name='date' value='" + date + "'>");
			form.append("<input type='hidden' name='type' value='" + type + "'>");
			form.get(0).submit();			
		})
	},

	filterType: function() {
		var form = $('#type_filter');
		$("#type_filter #types").change(function(){
			var type = $("#type_filter #types :selected").val();
			var date = $("#date_filter #dates :selected").val();
			form.append("<input type='hidden' name='date' value='" + date + "'>");
			form.append("<input type='hidden' name='type' value='" + type + "'>");
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
		var requestID 	= link.attr('rel').replace('request_', '');
		this.latestLink = link;
		
		var myModal = new MyModal();
		myModal.init({
			title : 'Enable Request',
			text: "Are you sure you want to enable this request?",
			buttons: [
			          {
					value : 'OK',
					callback: 'requests.remove('+requestID+')',
					cls: 'btn-primary'
			          },
			          {
					value : 'Cancel',
					callback: 'requests.hideModal()',
					cls: ''
			          }
			]
		});
	},

	hideModal: function() {
		var myModal = new MyModal();
		myModal.hide();
	},

	remove: function(requestID) {
		var $this = this;
		 $.ajax({
				url: SYS.siteUrl + '/admin/enablerequest/',
				type: 'POST',
				//dataType: 'json',
				data: 'requestID='+ requestID,
				success: function(response) {
					window.location.href=SYS.siteUrl + '/admin/managerequests/';
				}
         });
	}
}

//init our object
$(function() {
        requests.init();
});