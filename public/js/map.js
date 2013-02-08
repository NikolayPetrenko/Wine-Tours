$(document).ready(
	function initial() {
		$(".various_claim").fancybox({
			maxWidth	: 472,
			maxHeight	: 430,
			fitToView	: false,
			autoSize	: false,
			closeClick	: false
		});
		$('#name_error').hide();
		$('#number_error').hide();
		$('#position_error').hide();
		$('#comment_error').hide();
		$('.claimListing').live('click', function(){
			var val = $(this).attr('data-listing');
			$('#form_claim #claim_list').val(val);
			if($('#myModal').css('display') == 'none') {
				$('#name_error').hide();
				$('#number_error').hide();
				$('#position_error').hide();
				$('#comment_error').hide();
				$('#name').val('');
				$('#number').val('');
				$('#position').val('');
				$('#comment').val('');	
			}
		})
		$('#name').change(function(){
			var name = trim($('#name').val());
			if(name == '') {
				$('#name_error').show();
			} else {
				$('#name_error').hide();
			}			
		})
		$('#number').change(function(){
			var number = trim($('#number').val());
			if(number == '') {
				$('#number_error').show();
			} else {
				$('#number_error').hide();
			}			
		})
		$('#position').change(function(){
			var position = trim($('#position').val());
			if(position == '') {
				$('#position_error').show();
			} else {
				$('#position_error').hide();
			}
		})
		$('#comment').change(function(){
			var comment = trim($('#comment').val());			
			if(comment == '') {
				$('#comment_error').show();
			} else {
				$('#comment_error').hide();
			}				
		})
		$('#form_claim').submit(function(e){
			e.preventDefault();
			var listing = trim($('#claim_list').val());
			var name = trim($('#name').val());
			var number = trim($('#number').val());
			var position = trim($('#position').val());
			var comment = trim($('#comment').val());
			if(name == '') {
				$('#name_error').show();
			} else {
				$('#name_error').hide();
			}
			if(number == '') {
				$('#number_error').show();
			} else {
				$('#number_error').hide();
			}
			if(position == '') {
				$('#position_error').show();
			} else {
				$('#position_error').hide();
			}
			if(comment == '') {
				$('#comment_error').show();
			} else {
				$('#comment_error').hide();
			}
			
			if(name != '' && number != '' && position != '' && comment != '') {
				$.ajax({
						type: "POST",
						url: SYS.siteUrl + '/main/claim',
						data: {
							listing: listing, 
							name: name, 
							number: number, 
							position: position, 
							comment: comment
						}
				});
				$('#claim_click'+listing).remove();
				$('#name').val('');
				$('#number').val('');
				$('#position').val('');
				$('#comment').val('');
				$.fancybox().close();
			}	
		})
})
		
	function trim( str, charlist ) 
	{	
		charlist = !charlist ? ' \s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
		var re = new RegExp('^[' + charlist + ']+|[' + charlist + ']+$', 'g');
		return str.replace(re, '');
	}