$(function(){
	if(correct != 'a') {
		$('.info').hide();
		$('.info-edit').show();
		$('.correct').text('Send the correct information');
		$('.correct').hide();
	}
	var loc = window.location.hash;
	var loc1 = loc + 1;
	if(loc != '') {
		$('#tab-content .active').addClass('inactive');
		$('#tab-content .active').removeClass('active');
		$(loc1).removeClass('inactive');
		$(loc1).addClass('active');
		$('.tab .active').removeClass('active');
		$("a[href^='" + loc + "']").parent('.tab-top').addClass('active');
	} else {
		window.location.hash = '#visiting';
	}
	
	$(".various_claim").fancybox({
		maxWidth	: 472,
		maxHeight	: 430,
		fitToView	: false,
		autoSize	: false,
		closeClick	: false
	});
	$('.claimListing').click(function(){
		if($('#myModal').css('display') == 'none') {
			$('#name_error').hide();
			$('#number_error').hide();
			$('#position_error').hide();
			$('#comment_error').hide();
//			$('#name').val('');
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
			$('.various_claim').remove();
			$('#name').val('');
			$('#number').val('');
			$('#position').val('');
			$('#comment').val('');
			$.fancybox().close();
		}	
	})

	$('.correct').click(function(){
		$('.correct').text('Send the correct information');
		$('.info').hide();
		$('.info-edit').show();
		$('.correct').hide();
	});
	
	$('.tab-top a').click(function (e) {
		e.preventDefault();
		window.location.hash = $(this).attr('href');
		var loc = $(this).attr('href') + 1;
		$('#tab-content .active').addClass('inactive');
		$('#tab-content .active').removeClass('active');
		$(loc).removeClass('inactive');
		$(loc).addClass('active');
		$('.tab .active').removeClass('active');
		$(this).parent('.tab-top').addClass('active');
	})
	
	var defaultVal = [];
	$('.oneLineRightSide input:radio').each(function() {
		if(this.checked) {
			defaultVal.push({'obj': $(this), 'value':  $(this).val()});
		}
	});
	
	$('.jNiceWrapper select').change(function(){
		$('.correct').fancybox({
			maxWidth	: 495,
			maxHeight	: 330,
			fitToView	: false,
			autoSize	: false,
			closeClick	: false
		});		
	});
	
	$('.oneLineRightSide input').change(function(){
		var currentInput = false;
		for(var i = 0; i < defaultVal.length; i++) {
			if($(this).attr('name') ===  defaultVal[i].obj.attr('name')) {
				currentInput = defaultVal[i];
				break;
			}
		}

		if(currentInput) {
			if(!(currentInput.obj.attr('name') === $(this).attr('name') && currentInput.obj.val() === $(this).val()) ){
				$(this).parents('.oneLineRightSide').find('.editBlock').show();
				$('.correct').addClass('cor');
				$('.correct').show();
				$('.cor').fancybox({
					maxWidth	: 495,
					maxHeight	: 330,
					fitToView	: false,
					autoSize	: false,
					closeClick	: false
				});
			} else {
				$(this).parents('.oneLineRightSide').find('.editBlock').hide();
				var a = 0;
				$.each($('.editBlock'), function(){
					if($(this).css('display') == 'block') {
						a = 1;
					}
				});
				if(a == 0) {
					$('.correct').removeClass('cor');
					$('.correct').hide();
				}
			}
		} else {
			$(this).parents('.oneLineRightSide').find('.editBlock').show();
			$('.correct').addClass('cor');
			$('.correct').show();
			$('.cor').fancybox({
				maxWidth	: 495,
				maxHeight	: 330,
				fitToView	: false,
				autoSize	: false,
				closeClick	: false
			});
		}
	})

	$('.editBlock').hover(
	function(){
		if(jQuery.browser.version = 7) {
			$(this).children('.editBlockHelp').css('left', '-145');
		}
		$(this).children('.editBlockHelp').show();
	}, function(){
		$(this).children('.editBlockHelp').hide();
	});	
	
	$('#coin-slider').coinslider({
		width: 568,
		height: 427,
		spw: 1,
		sph:1
	});
});

var map;
var maps;
var initialLocation;
var default_center = new google.maps.LatLng(-1.777954793195064, -15.592067241668701);
var center;
var zoom;
var loc_y = '';
var loc_z = '';
geocoder = new google.maps.Geocoder();
var marker;

$(document).ready(
	function initialize() {
		if(loc_y != '' && loc_z != '') {
			center = new google.maps.LatLng(loc_y, loc_z);
			zoom = 14;
		} else {
			center = default_center;
			zoom = 1;
		}
		var myOptions = {
						streetViewControl: false,
						zoomControl: false,
						zoom: zoom,
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						center: center,
						mapTypeControl: false
		}

		map = new google.maps.Map(document.getElementById("correct_vineyard"), myOptions);
		
		if(loc_y != '' && loc_z != '') {
			marker = new google.maps.Marker({
										position: center,
										map: map 
									});
		}

		google.maps.event.addListener(map, 'click', function(event) {
			console.log($('.correct').text());
			if($('.correct').text() == 'Send the correct informationSend the correct information') {
				$('.info').hide();
				$('.info-edit').show();
				$('.correct').addClass('cor');
				$('.correct').show();
				$('.cor').fancybox({
					maxWidth	: 495,
					maxHeight	: 330,
					fitToView	: false,
					autoSize	: false,
					closeClick	: false
				});
				placeMarker(event.latLng);
			}
		});
});

function placeMarker(location) {
	if ( marker ) {
		marker.setPosition(location);
	} else {
		marker = new google.maps.Marker({
										animation: google.maps.Animation.DROP, 
										position: location,
										map: map
									});
		map.setCenter(location);							
	}
	var infowindow = new google.maps.InfoWindow();
	geocoder.geocode({'latLng': location}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[1]) {
				$('#city').val(results[1].address_components[0].long_name);
				$('#city').parents('.oneLine').find('.error').hide();
			}
		}
	});
	$('#correct #loc_y').val(location.lat());
	$('#correct #loc_z').val(location.lng());
}