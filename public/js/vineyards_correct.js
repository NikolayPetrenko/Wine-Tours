var map;
var center;
var zoom;
var marker;
var map2;
var center2;
var zoom2;
var marker2;
$(document).ready(
	function initialize() {
		center = new google.maps.LatLng(loc_yc, loc_zc);

		var myOptions = {
						streetViewControl: false,
						zoomControl: false,
						zoom: 14,
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						center: center,
						mapTypeControl: false
		}

		map = new google.maps.Map(document.getElementById("map_correct"), myOptions);
		
			marker = new google.maps.Marker({
//										animation: google.maps.Animation.DROP, 
										position: center,
										map: map
//										icon: '/images/vineyard.gif'
									});

		center2 = new google.maps.LatLng(loc_y, loc_z);
		var myOptions2 = {
						streetViewControl: false,
						zoomControl: false,
						zoom: 14,
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						center: center2,
						mapTypeControl: false
		}

		map2 = new google.maps.Map(document.getElementById("map_canvas"), myOptions2);
		marker2 = new google.maps.Marker({
//										animation: google.maps.Animation.DROP, 
										position: center2,
										map: map2
//										icon: '/images/vineyard.gif'
									});

	}	
);	

var corrects = {
	init: function(){
		this.automatical();
		this.cancel();
		this.edit();
	},
	
	cancel: function() {
		$('#can_cor').click(function(){
			corrects.remove();
		})
	},
	
	automatical: function(){
		$('#auto').click(function(){
			 $.ajax({
				url: SYS.siteUrl + '/vineyards/infocorrect/',
				type: 'POST',
				//dataType: 'json',
				data: {
					listing_id: $('#listing_id').val(),
					success: 'success',
					correct: $('#correct_id').val(),
					user: $('#user_id').val(),
					listing: $('#name').val(),
					loc_y: loc_yc,
					loc_z: loc_zc,
					individuals: $('#individuals_c').val(),
					visits: $('#visits_c').val(),
					groups: $('#groups_c').val(),
					appointment: $('#appointment_c').val(),
					tasting: $('#tasting_c').val(),
					tour: $('#tour_c').val(),
					sales: $('#sales_c').val(),
					workshops: $('#workshops_c').val(),
					restaurant: $('#restaurant_c').val(),
					accommodation: $('#accommodation_c').val(),
					weddings: $('#weddings_c').val(),
					seminars: $('#seminars_c').val(),
					spoken: $('#spoken_c').val(),
					wines: $('#wines_c').val()
				},
				success: function(response) {
					window.location.href=SYS.siteUrl+"/main/managechanges";
				}
			});
		})
	},
	
	edit: function(){
		$('#edit').click(function(){
			var list_alias = $('#list_alias').val();
			 $.ajax({
				url: SYS.siteUrl + '/vineyards/infocorrect/',
				type: 'POST',
				//dataType: 'json',
				data: {
					edit_comment: $('#edit_comment').val(),
					listing_id: $('#listing_id').val(),
					success: 'success',
					correct: $('#correct_id').val(),
					user: $('#user_id').val(),
					listing: $('#name').val(),
					loc_y: loc_yc,
					loc_z: loc_zc,
					individuals: $('#individuals_c').val(),
					visits: $('#visits_c').val(),
					groups: $('#groups_c').val(),
					appointment: $('#appointment_c').val(),
					tasting: $('#tasting_c').val(),
					tour: $('#tour_c').val(),
					sales: $('#sales_c').val(),
					workshops: $('#workshops_c').val(),
					restaurant: $('#restaurant_c').val(),
					accommodation: $('#accommodation_c').val(),
					weddings: $('#weddings_c').val(),
					seminars: $('#seminars_c').val(),
					spoken: $('#spoken_c').val(),
					wines: $('#wines_c').val()
				},
				success: function(response) {
					window.location.href=SYS.siteUrl+"/en/vineyards/editvineyard/"+list_alias;
				}
			});
		})
	},
	
	remove: function(){
			 $.ajax({
				url: SYS.siteUrl + '/vineyards/infocorrect/',
				type: 'POST',
				//dataType: 'json',
				data: {
					cancel: 'cancel',
					correct: $('#correct_id').val(),
					user: $('#user_id').val(),
					listing: $('#name').val(),
					comment: $('#reject_comment').val()
				},
				success: function(response) {
					window.location.href=SYS.siteUrl+"/main/managechanges";
				}
			});
	}
}

$(function(){
	corrects.init();
})