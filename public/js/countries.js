var geocoder = new google.maps.Geocoder();
var marker;

$(document).ready(
	function initialize() {
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
		map = new google.maps.Map(document.getElementById("map_country"), myOptions);
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
			map.setZoom(5)
		}
		

		google.maps.event.addListener(map, 'click', function(event) {
			placeMarker(event.latLng);
			map.setCenter(event.latLng);
			map.setZoom(5)
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
	$('#edit_country #loc_y').val(location.$a);
	$('#edit_country #loc_z').val(location.ab);
}
	
$(function() {
	$("#regions").multiselect({
			noneSelectedText: 'Select Regions',
			selectedList: 25
	}).multiselectfilter();
});

$(function () {
    'use strict';
    var filesList = {}
    $('#edit_country').fileupload({
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