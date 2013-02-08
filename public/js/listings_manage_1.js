var listings = {
	
	prevFilterVal: 'all',
	
	init: function(){
		this.observeRemoveBtns();
		this.claimed();
		this.claim();
		this.reject();
		this.observeRecoverBtns();
		this.filter();
		this.prevFilterVal = $("#type_filter #type :selected").val();
		this.claimedPartner();
	},
	
	filter: function() {
		var form = $('#type_filter');
		var $this = this;
		$("#type_filter #type").change(function(){
			var type = $("#type_filter #type :selected").val();
			if($this.prevFilterVal != type) {
				form.append("<input type='hidden' name='type' value='" + type + "' >");
				form.get(0).submit();	
			}
			$this.prevFilterVal = type;
		})		
	},
	
	observeRecoverBtns: function() {
		var rmLinks = $('.recover');
		var $this = this;
		rmLinks.click(function() {
			$this.showModal1(this);
		});
	},
	
	observeRemoveBtns: function() {
		var rmLinks = $('.remove1');
		var $this = this;
		rmLinks.click(function() {
			$this.showModal(this);
		});
	},
	claimedPartner: function() {
		$('.claim-partner').click(function(){
			var id = $(this).attr('data-id');
			$.ajax({
				url: SYS.siteUrl + '/vineyards/viewclaim/',
				type: 'POST',
				dataType: 'json',
				data: {
					id: id
				},
				success: function(response) {
						$('#user').val(response.user);
						$('#claim_list').val(response.listing);
						$('#id').val(response.id);
						var claim = '<div class="claim">'+
										'<p><span class="greenText bold">Name:</span> '+response.name+'</p>'+
										'<p><span class="greenText bold">Position:</span> '+response.position+'</p>'+
										'<p><span class="greenText bold">Contact number:</span> '+response.number+'</p>'+
										'<p><span class="greenText bold">Comment:</span> '+response.comment+'</p>'+
									'</div>';
						$('.claim_body').html(claim);
				}
			});			
		})
	},
	
	claimed: function() {
		$('.claim').click(function(){
			var id = $(this).attr('data-id');
			$.ajax({
				url: SYS.siteUrl + '/vineyards/viewclaim/',
				type: 'POST',
				dataType: 'json',
				data: {
					id: id
				},
				success: function(response) {
						$('#user').val(response.user);
						$('#claim_list').val(response.listing);
						$('#id').val(response.id);
						var claim = '<div class="claim">'+
										'<p>Name: '+response.name+'</p>'+
										'<p>Position: '+response.position+'</p>'+
										'<p>Contact number: '+response.number+'</p>'+
										'<p>Comment: '+response.comment+'</p>'+
									'</div>';
						$('.claim_body').html(claim);
				}
			});			
		})
	},
	
	claim: function() {
		$('#claim_ok').click(function(){
			var user = $('#user').val();
			var listing = $('#claim_list').val();
			var id = $('#id').val();
			$.ajax({
				url: SYS.siteUrl + '/vineyards/claimed/',
				type: 'POST',
				dataType: 'json',
				data:{
					user: user,
					listing: listing,
					id: id
				},
				success: function(result) {
						window.location.href=SYS.siteUrl+"/main/managelistings";
					}
			});				
		})
	},
	
	reject: function() {
		$('#claim_rej').click(function(){
			var user = $('#user').val();
			var listing = $('#claim_list').val();
			var id = $('#id').val();
			$.ajax({
				url: SYS.siteUrl + '/vineyards/claimed/',
				type: 'POST',
				dataType: 'json',
				data:{
					user: user,
					listing: listing,
					id: id,
					reject: 'reject'
				},
				success: function(result) {
						window.location.href=SYS.siteUrl+"/main/managelistings";
					}
			});				
		})
	},
	
	showModal1: function(link) {
		link 		= $(link);
		var listID 	= link.attr('rel').replace('listing_', '');
		this.latestLink = link;
		
		var myModal = new MyModal();
		myModal.init({
			title : 'Recover Listing',
			text: "Are you sure you want to recover this listing?",
			buttons: [
			          {
					value : 'OK',
					callback: 'listings.recover('+listID+')',
					cls: 'btn-primary'
			          },
			          {
					value : 'Cancel',
					callback: 'listings.hideModal()',
					cls: ''
			          }
			]
		});
	},
	
	showModal: function(link) {
		link 		= $(link);
		var listID 	= link.attr('rel').replace('listing_', '');
		this.latestLink = link;
		
		var myModal = new MyModal();
		myModal.init({
			title : 'Delete Listing',
			text: "Are you sure you want to delete this listing?",
			buttons: [
			          {
					value : 'OK',
					callback: 'listings.remove('+listID+')',
					cls: 'btn-primary'
			          },
			          {
					value : 'Cancel',
					callback: 'listings.hideModal()',
					cls: ''
			          }
			]
		});
	},

	hideModal: function() {
		var myModal = new MyModal();
		myModal.hide();
	},

	remove: function(listID) {
		var $this = this;
		 $.ajax({
				url: SYS.siteUrl + '/vineyards/remove/',
				type: 'POST',
				//dataType: 'json',
				data: {
					remove: 'remove',
					listID: listID
				},
				 success: function(response) {
					window.location.href=SYS.siteUrl+"/main/managelistings";
					listings.hideModal();
				}
		});
	},
	
	recover: function(listID) {
		var $this = this;
		 $.ajax({
				url: SYS.siteUrl + '/vineyards/remove/',
				type: 'POST',
				//dataType: 'json',
				data: 'listID='+ listID,
				 success: function(response) {
					window.location.href=SYS.siteUrl+"/main/managelistings";
					listings.hideModal();
				}
		});
	}	
}

//init our object
$(function() {
        listings.init();
	$(".claim-partner").fancybox({
		maxWidth	: 527,
		maxHeight	: 565,
		fitToView	: false,
		autoSize	: false,	
		closeClick	: false
	});		
})