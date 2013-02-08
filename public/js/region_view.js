var geocoder = new google.maps.Geocoder();
var marker;
$(document).ready(
	function initialize() {
		var center = new google.maps.LatLng(loc_y, loc_z);
		var myOptions = {
						streetViewControl: false,
						zoomControl: false,
						zoom: 10,
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						center: center,
						mapTypeControl: false
		}

		map = new google.maps.Map(document.getElementById("view_region"), myOptions);
		
		marker = new google.maps.Marker({
										animation: google.maps.Animation.DROP, 
										position: center,
										map: map
									});
	}
);