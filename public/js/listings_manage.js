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
		this.removeClaim();
		this.unverListId();
		this.unvefify();
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
	
	unverListId: function() {
		$('.remove-list').click(function(){
			$('#listing-id').val($(this).attr('data-id'));
		});
	},
	
	unvefify: function(){
		$('.rem_ok').click(function(){
			$.ajax({
				url: SYS.siteUrl + '/vineyards/unverifyvineyard/',
				type: 'POST',
				dataType: 'json',
				data:{
					id: $('#listing-id').val()
				},
				success: function(result) {
						window.location.href=SYS.siteUrl+"/main/managelistings";
					}
			});
		})
		$('.rem_can').click(function(){
			window.location.href=SYS.siteUrl+"/main/managelistings";
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
						$('.claim_body').html(response.html);
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
					$('.claim_body').html(response.html);
				}
			});			
		})
	},
	
	claim: function() {
		$('.claim_ok').live('click', function(){
			$.ajax({
				url: SYS.siteUrl + '/vineyards/claimed/',
				type: 'POST',
				dataType: 'json',
				data:{
					id: $(this).attr('data-claim'),
					claim: 'claim'
				},
				success: function(result) {
					window.location.href=SYS.siteUrl+"/main/managelistings";
				}
			});				
		})
	},
	
	reject: function() {
		$('.claim_rej').live('click', function(){
			$.ajax({
				url: SYS.siteUrl + '/vineyards/claimed/',
				type: 'POST',
				dataType: 'json',
				data:{
					id: $(this).attr('data-claim'),
					reject: 'reject'
				},
				success: function(result) {
						window.location.href=SYS.siteUrl+"/main/managelistings";
					}
			});				
		})
	},
	
	removeClaim: function() {
		$('.claim_rem').live('click', function(){
			$.ajax({
				url: SYS.siteUrl + '/vineyards/claimed/',
				type: 'POST',
				dataType: 'json',
				data:{
					id: $(this).attr('data-claim'),
					remove: 'remove'
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