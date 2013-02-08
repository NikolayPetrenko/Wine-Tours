var geocoder = new google.maps.Geocoder();
var marker;
$(document).ready(
	function initialize() {
		$('#acknowledgements').redactor();
		$('#description').redactor();
		var zoom = 1;
		var center = new google.maps.LatLng(-1.777954793195064, -15.592067241668701);			
		var myOptions = {
						streetViewControl: false,
						zoomControl: false,
						zoom: zoom,
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						center: center,
						mapTypeControl: false
		}
		map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		var loc_y = $('#loc_y').val();
		var loc_z = $('#loc_z').val();
		
		if(loc_y != '' && loc_z != '') {
			var loc =  new google.maps.LatLng(loc_y, loc_z);
			marker = new google.maps.Marker({
								animation: google.maps.Animation.DROP, 
								position: loc,
								map: map
							});
			map.setCenter(loc);
			map.setZoom(8)
		}
		
		$('#add_region #country').change(function () {
			geocod($('#country option:selected').text(), 4)
		});

		google.maps.event.addListener(map, 'click', function(event) {
			placeMarker(event.latLng);
			map.setCenter(event.latLng);
		});	
	}	
);


function placeMarker(location) {
	if ( marker ) {
		marker.setPosition(location);
	} else {
		marker = new google.maps.Marker({
										animation: google.maps.Animation.DROP, 
										position: location,
										map: map
									});
	}
	geocoder.geocode({'latLng': location}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[1]) {
				$('#city').val(results[1].address_components[0].long_name);
			}
		} else {
			alert("Geocoder failed due to: " + status);
		}
	});
	$('#add_region #loc_y').val(location.$a);
	$('#add_region #loc_z').val(location.ab);
}

function geocod(address, zoom) {
	geocoder.geocode( {'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			map.setZoom(zoom);
		}
	});		 
}		
	
$(function() {
	$("#grapes").multiselect({
			noneSelectedText: 'Select Grapes Grown',
			selectedList: 25
	}).multiselectfilter();
	
	$("#partners").multiselect({
			noneSelectedText: 'Select Partners',
			selectedList: 25
	}).multiselectfilter();
	
	$('#add_region #country').attr('disabled', false);
	
	$('.add_link').click( function(event) {
		event.preventDefault();
		var link = $('.link-region-tmp').clone();
		$(link).attr('class', '');
		$(link).find('.link_reg').attr('name', 'links[]')
		$(link).find('.text_reg').attr('name', 'texts[]')
		$(link).show();
		$('.links-region').append(link);
	});
	
	$('#delete-image').click(function(){
		var region = $('#region_id').val();
		$.ajax({
				url: SYS.siteUrl + '/admin/deleteimage',
				type: 'POST',
				dataType: 'json',
				data: "region=" + region,
				success: function(result) {
			 		$('#country_image').fadeOut('slow', function() {
			 			$('#country_image').remove();
			 		})					
				}
		});		
	});
	
	$('#country').change(function(){
		var country = $(this).val();
		if(country != '') {
			$.ajax({
					url: SYS.siteUrl + '/admin/gettreeregions',
					type: 'POST',
					dataType: 'json',
					data: "country=" + country,
					success: function(result) {
						if(result.error == 0) {
							$('.tree_body').html(result.html);
							$('.associated').show();
							$('#tree h3').html($('#country option:selected').text()+' Tree Regions');
						} else {
							$('.associated').hide();
						}
					}
			});			
		} else {
			$('.associated').hide();
		}
	});
});


$(function () {
    'use strict';
    var filesList = {}
    $('#add_region').fileupload({
       url: SYS.siteUrl + '/admin/uploadcountry',
       multipart: true,
       singleFileUploads: false,
       add: function(e,data) {
         var jqXHR = data.submit()
                .success(function(result, textStatus, jqXHR) {
//				var logo = $('<img/>').attr({'src':result[0].url, 'alt': result[0].name, 'title': result[0].name});
				$('#country_image').html('<img src="'+result[0].url+'">'+'<input type="hidden" name="image" id="count_image" value="">');
				$('#country_image #count_image').val(result[0].name);
				$('#link').val('http://');
                })
                .error(function (jqXHR, textStatus, errorThrown) {
                })
                .complete(function (result, textStatus, jqXHR) {
                });
       },
       
       progress: function(e, data) {
         var progress = parseInt(data.loaded / data.total * 100, 10);
       }
    });
});