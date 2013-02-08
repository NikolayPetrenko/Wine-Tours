var geocoder = new google.maps.Geocoder();
var marker;
var center;
$(document).ready(
	function initialize() {
		if(loc_y != '' && loc_z != '') {
			center = new google.maps.LatLng(loc_y, loc_z);
		} else {
			center = new google.maps.LatLng(0, 0);
		}
		var myOptions = {
						streetViewControl: false,
						zoomControl: false,
						zoom: 4,
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						center: center,
						mapTypeControl: false
		}

		map = new google.maps.Map(document.getElementById("view_country"), myOptions);
		marker = new google.maps.Marker({
										animation: google.maps.Animation.DROP, 
										position: center,
										map: map
									});		
		if(loc_y == '' && loc_z == '') {
			geocod();
		}							
	}	
);	
	function geocod() {
		geocoder.geocode( {'address': country}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				marker.setPosition(results[0].geometry.location);
			}
		})
	}