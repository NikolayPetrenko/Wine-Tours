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

		map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		
		if(loc_y != '' && loc_z != '') {
			marker = new google.maps.Marker({
										position: center,
										map: map 
									});
		}

		google.maps.event.addListener(map, 'click', function(event) {
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
		});
	$('#add_listing #continent').live('change', function () {
		var continent = $(this).val();
		var cont_text = $('#continent option:selected').text();
		if (continent == '0') {
			$('#country').html('');
			$('#country').attr('disabled', true);
			return(false);
		}
		if(continent != '') {
			$('#country').attr('disabled', true);
			$('#country').html('<option>loading...</option>');
			$.ajax({
				url: SYS.siteUrl + 'ajaxselect',
				type: 'POST',
				dataType: 'json',
				data: "continent=" + continent,
				success: function(result) {
					var options = '';
					var select   =  '<select name="country" id="country">';
					var selectval	=	$('#country').val();
					$(result.country).each(function() {
						if(selectval == $(this).attr('id')) {
							options += '<option selected="selected" value="' + $(this).attr('id') + '">' + $(this).attr('title') + '</option>';
						} else {
							options += '<option value="' + $(this).attr('id') + '">' + $(this).attr('title') + '</option>';
						}										
					});
					select	+=	options;
					select	+=	'</select>';
					var zindex = $('#country').parents('.jNiceWrapper').css('z-index');
					$('#country').closest('.jNiceWrapper').replaceWith(select);
					$('#country').closest('.oneLine').jNice(function(el) {
						el.parents('.jNiceWrapper').css({'z-index': zindex});
					});
					
					geocod(cont_text, 2);
				}	
			});
		}	
		
	});		

	$('#add_listing #country').live('change', function () {
		var country = $(this).val();
		var count_text = $('#country option:selected').text();
		if (country == '0') {
			$('#ass_region').html('');
			$('#ass_region').attr('disabled', true);
			return(false);
		} else {
			$.ajax({
				url: SYS.siteUrl + '/main/getcoordinates',
				type: 'POST',
				dataType: 'json',
				data: {
					type: 'country',
					param: country
				},
				success: function(result) {
					if(result.tel_code != '') {
						$('#country_code').val(result.tel_code);
						$('#country_code').parents('.oneLine').find('.error').hide();
					}
					if(result.error == 'error') {
						geocod(count_text, 4);
					} else {
						map.setCenter(new google.maps.LatLng(result.loc_y, result.loc_z));
						map.setZoom(4);
					}
				}	
			});
		}
//		if(country != '') {
			$('#ass_region').attr('disabled', true);
			$('#ass_region').html('<option>loading...</option>');
			$.ajax({
				url: SYS.siteUrl + 'ajaxselect',
				type: 'POST',
				dataType: 'json',
				data: "country=" + country,
				success: function(result) {
						var options = '';
						var select		=  '<select name="ass_region" id="ass_region">';
						var selectval	=	$('#ass_region').val();
						$(result.ass_region).each(function() {
							if(selectval == $(this).attr('id')) {
								options += '<option selected="selected" value="' + $(this).attr('id') + '">' + $(this).attr('title') + '</option>';
							} else {
								options += '<option value="' + $(this).attr('id') + '">' + $(this).attr('title') + '</option>';
							}
						});	
						select	+=	options;
						select	+=	'</select>';	
						var zindex = $('#ass_region').parents('.jNiceWrapper').css('z-index');
						$('#ass_region').closest('.jNiceWrapper').replaceWith(select);
						$('#ass_region').closest('.oneLine').jNice(function(el) {
							el.parents('.jNiceWrapper').css({'z-index': zindex});
						});
//						$('#ass_region').closest('.oneLine').jNice();
				}
			});
//		}	
	});
	$('#add_listing #ass_region').live('change', function () {
		var region	= $(this).val();
		var region_text = $('#ass_region option:selected').text();
		if(region != 0){
			$.ajax({
				url: SYS.siteUrl + '/main/getcoordinates',
				type: 'POST',
				dataType: 'json',
				data: {
					type: 'region',
					param: region
				},
				success: function(result) {
					if(result.error == 'error') {
						geocod(region_text, 10);
					} else {
						map.setCenter(new google.maps.LatLng(result.loc_y, result.loc_z));
						map.setZoom(10);
					}
				}	
			});
		}
	});
		
		
	$('#edit_vineyard #continent').live('change', function () {
		var continent = $(this).val();
		var cont_text = $('#continent option:selected').text();
		if (continent == '0') {
			$('#country').html('');
			$('#country').attr('disabled', true);
			return(false);
		}
		
			$('#country').attr('disabled', true);
//			$('#country').html('<option>loading...</option>');
			$.ajax({
				url: SYS.siteUrl + '/vineyards/ajaxselect',
				type: 'POST',
				dataType: 'json',
				data: "continent=" + continent,
				success: function(result) {
					var options = '';
					var select   =  '<select name="country" id="country">';
					var selectval	=	$('#country').val();
					$(result.country).each(function() {
						if(selectval == $(this).attr('id')) {
							options += '<option selected="selected" value="' + $(this).attr('id') + '">' + $(this).attr('title') + '</option>';
						} else {
							options += '<option value="' + $(this).attr('id') + '">' + $(this).attr('title') + '</option>';
						}										
					});
					select	+=	options;
					select	+=	'</select>';
					var zindex = $('#country').parents('.jNiceWrapper').css('z-index');
					$('#country').closest('.jNiceWrapper').replaceWith(select);
					$('#country').closest('.oneLine').jNice(function(el) {
						el.parents('.jNiceWrapper').css({'z-index': zindex});
					});
					
					geocod(cont_text, 2);
				}	
			});
		
//		$('.jNiceWrapper').css({'z-index':0});
	});		

	$('#edit_vineyard #country').live('change', function () {
		var country = $(this).val();
		var count_text = $('#country option:selected').text();
		if (country == '0') {
			$('#ass_region').html('');
			$('#ass_region').attr('disabled', true);
			return(false);
		} else {
			$.ajax({
				url: SYS.siteUrl + '/main/getcoordinates',
				type: 'POST',
				dataType: 'json',
				data: {
					type: 'country',
					param: country
				},
				success: function(result) {
					if(result.tel_code != '') {
						$('#country_code').val(result.tel_code);
						$('#country_code').parents('.oneLine').find('.error').hide();
					}	
					if(result.error == 'error') {
						geocod(count_text, 4);
					} else {
						map.setCenter(new google.maps.LatLng(result.loc_y, result.loc_z));
						map.setZoom(4);
					}
				}	
			});
		}
//		if(country != '') {
			$('#ass_region').attr('disabled', true);
//			$('#ass_region').html('<option>loading...</option>');
			$.ajax({
				url: SYS.siteUrl + '/vineyards/ajaxselect',
				type: 'POST',
				dataType: 'json',
				data: "country=" + country,
				success: function(result) {
						var options = '';
						var select		=  '<select name="ass_region" id="ass_region">';
						var selectval	=	$('#ass_region').val();
						$(result.ass_region).each(function() {
							if(selectval == $(this).attr('id')) {
								options += '<option selected="selected" value="' + $(this).attr('id') + '">' + $(this).attr('title') + '</option>';
							} else {
								options += '<option value="' + $(this).attr('id') + '">' + $(this).attr('title') + '</option>';
							}
						});	
						select	+=	options;
						select	+=	'</select>';	
						var zindex = $('#ass_region').parents('.jNiceWrapper').css('z-index');
						$('#ass_region').closest('.jNiceWrapper').replaceWith(select);
						$('#ass_region').closest('.oneLine').jNice(function(el) {
							el.parents('.jNiceWrapper').css({'z-index': zindex});
						});
//						$('#ass_region').closest('.jNiceWrapper').replaceWith(select);
//						$('#ass_region').closest('.oneLine').jNice();
				}
			});
//		}	
	});
	$('#edit_vineyard #ass_region').live('change', function () {
		var region	= $(this).val();
		var region_text = $('#ass_region option:selected').text();
		if(region != 0){
			$.ajax({
				url: SYS.siteUrl + '/main/getcoordinates',
				type: 'POST',
				dataType: 'json',
				data: {
					type: 'region',
					param: region
				},
				success: function(result) {
					if(result.error == 'error') {
						geocod(region_text, 10);
					} else {
						map.setCenter(new google.maps.LatLng(result.loc_y, result.loc_z));
						map.setZoom(10);
					}
				}	
			});
		}
	});	
	}
);	
	function geocod(address, zoom) {
		geocoder.geocode( {'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				map.setZoom(zoom);
			} 
		});		 
	}	


function placeMarker(location) {
//	console.log(location);
	if ( marker ) {
		marker.setPosition(location);
	} else {
		var image = '/images/vineyard.gif'; 
		marker = new google.maps.Marker({
										animation: google.maps.Animation.DROP, 
										position: location,
										map: map, 
										icon: image
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
	$('#add_listing #loc_y').val(location.lat());
	$('#add_listing #loc_y').parents('.oneLine').find('.error').hide();
	$('#add_listing #loc_z').val(location.lng());
	$('#add_listing #loc_z').parents('.oneLine').find('.error').hide();
	$('#correct #loc_y').val(location.lat());
	$('#correct #loc_z').val(location.lng());
	$('#edit_vineyard #loc_y').val(location.lat());
	$('#edit_vineyard #loc_y').parents('.oneLine').find('.error').hide();
	$('#edit_vineyard #loc_z').val(location.lng());
	$('#edit_vineyard #loc_y').parents('.oneLine').find('.error').hide();
	$('#add_listing #location').css('display', 'block');
}

var vineyards = {
	init: function() {
		this.addSeason();
		this.deleteSeason();
		this.addWine();
		this.deleteWine();
		this.times();
		this.time1();
		this.time2();
		this.addSpoken();
		this.addGrape();
		this.addVineyard();
		this.verifed();
		this.correct();
		this.addWineGrape();
		this.slaider();
	},

	slaider: function() {
		$('#coin-slider').coinslider({
			width: 568,
			height: 427,
			spw: 1,
			sph:1
		});
	},

	correctNoLogin: function() {
		$('.correctNoLogin').click(function(e){
			e.preventDefault();
			var form = $('#correct');
			var correct = $(form).serialize();
			$.ajax({
					url: SYS.siteUrl + '/vineyards/correctinfo',
					type: 'POST',
					dataType: 'json',
					data:  correct,
					success: function(result) {
						window.location.href=SYS.siteUrl+"/"+lang +"/auth/login";
					}	
			});	
		});
	},
	
	correct: function() {
		$('#correct_ok').click(function(e){
			e.preventDefault();
			var form = $('#correct');
			var comment = trim($('#correct_comment').val());
			if(comment != '') {
				$('#comment_error').css('display', 'none');
				form.append("<input type='hidden' name='comment' value='" + comment + "' >");
				form.get(0).submit();
			} else {
				$('#com_error').css('display', 'block');
			}
		});
	},

	verifed: function() {
		$('#verif').click(function(e){
			e.preventDefault();
			var listing = $('#verif_list').val();
			$.ajax({
					url: SYS.siteUrl + '/vineyards/ajaxverif',
					type: 'POST',
					dataType: 'json',
					data: "listing=" + listing,
					success: function(result) {
						window.location.href=SYS.siteUrl+"/main/managelistings";
					}	
			});			
		});
	},
	
	addVineyard: function(){
		$('#web').change(function(){
			var web = $('#web').val();
			if(web != '') {
				web = web.replace('http://', '');
				$('#web').attr('value', 'http://'+web);
			}	
		});
		$('#add_listing').validate({
			errorClass:'error',
			validClass:'succses',
			errorElement:'span',
			rules:{
					name: {
							required: true
					},
					city: {
							required: true
					},
					country: {
							required: true
					},
					continent: {
							required: true
					},
					ass_region: {
							required: true
					},
					loc_y: {
							required: true
					},
					loc_z: {
							required: true
					},
					email: {
							email: true
					},
					web: {
							url: true
					},
					zip: {
							number: true
					},
					country_code: {
							required: true,
							number: true
					},
					city_code: {
							required: true,
							number: true
					},					
					telephone: {
							required: true,
							number: true
					},
					fax: {
							number: true
					}					
			},
			groups:{
				telephone: "telephone country_code city_code"
			},
			messages:{
				email: "Please enter a valid email address",
				url: "Please enter a valid web address",
				telephone: {
							required: "Please enter full telephone number",
							number: "Please enter valid telephone"
				},
				country_code: {
							required: "Please enter country code",
							number: "Please enter valid country code"
				},
				city_code: {
							required: "Please enter area code",
							number: "Please enter valid area code"
				},				
				name: "Please enter vineyard name",
				loc_y: "Please specify the location",
				loc_z: "Please specify the location",
				city: "Please enter a city",
				ass_region: "Please select associated region",
				country: "Please select country",
				continent: "Please select continent"
			},
			highlight: function (element, errorClass, validClass) {
				setTimeout(function() {
					var span = $(element).parents('.oneLine').find('span.error');
					$(element).parents(".oneLine").find('.helpWrapper').after(span);
				}, 0);
				
//					
			},
			unhighlight: function (element, errorClass, validClass) {
					$(element).parents("div.onLine").removeClass(errorClass).addClass(validClass);
			}
		});
	},

	addSpoken: function() {
	    $('#add_spoken').click(function(event){
		event.preventDefault();
		var spokenClone = $('#spoken_tmp .addedBox').clone();
		$(spokenClone).jNice();
		$('.spokens').append(spokenClone);
	     });
	},

	addWineGrape: function() {
	    $('.add_grape_w').live('click', function(event){
		event.preventDefault();
		var grapeWineClone = $('#grape_w_tmp .addedBox').clone();
		var wine = $(this).parents('.wine');
		var number = $(wine).attr('id').replace('wine', '') - 1;
		$(grapeWineClone).find('select').attr('id', 'grapes_w' + number);
		$(grapeWineClone).find('select').attr('name', 'wines[grapes]['+number+'][]');
		$(grapeWineClone).jNice();
		$(wine).find('.grapes-wine').append(grapeWineClone);
	     });
	},
	
	addGrape: function() {
	    $('#add_grape').click(function(event){
		event.preventDefault();
		var grapeClone = $('#grape_tmp .addedBox').clone();
		$(grapeClone).jNice();
		$('.grapes').append(grapeClone);
	     });
	},
		
	addWine: function() {
	    $('.add_wine').click(function(event){
		event.preventDefault();
		var number = $('.wines .wine').length +1;
		var wineClone = $('#wine-tmp .wine').clone();
		wineClone.attr('id', 'wine'+ number);
		$(wineClone).jNice();
		$('.wines').append(wineClone);
		$('#wine'+number+' #grapes_w').attr('id', 'grapes_w'+number);
		$('#wine'+number+' #vintage_w').attr('id', 'vintage_w'+number);
		var num = number - 1;
		$('#wine'+number+' #root').attr('id', 'root'+num);		
		$('#wine'+number+' #grapes_w'+number).attr('name', 'wines[grapes]['+num+'][]');
//		$('#wine'+number+' #vintage_w'+number).attr('name', 'wines[vintage]['+num+']');
		$('.delete_wine').click( function(event) {
			event.preventDefault();
			$(this).parents('.wine').remove();
		});
		$('#add_listing').fileupload('destroy');
		initUploader();
		initUploader1();
	    });
	},

	deleteWine: function() {
		$('.delete_wine').click( function(event) {
			event.preventDefault();
			$(this).parents('.wine').remove();
		});
	},
	
	addSeason: function() {
		$('.add_season').click( function(event) {
			event.preventDefault();
			var number = $('.seasons .season').length +1;
			var seasonClone = $('#season-tmp .season').clone();
			seasonClone.attr('id', 'season'+ number);
			var seasonLable = seasonClone.find('#seasons-label');
			seasonLable.attr('id','season-label' + number);
			seasonLable.find('label').text('Season ' + number + ' Name:');
			var num = number - 1;
			$('.seasons').append(seasonClone);
			$('#season'+number+' .date').text('Season '+ number + ' Dates Date to date:');
			$('#season'+number+' .times').text('Season '+ number + ' Timings Time of Day:');
			//change name
			$('#season'+number+' #season1').attr('id', 'season'+number);
			//change appointment
			$('#season'+number+' #appointment-yes0').attr('name', 'season[appointment]['+num+']');
			$('#season'+number+' #appointment-yes0').attr('id', 'appointment-yes'+number);
			$('#season'+number+' #appointment-no0').attr('name', 'season[appointment]['+num+']');
			$('#season'+number+' #appointment-no0').attr('id', 'appointment-no'+number);
			$('#season'+number+' #appointment-dont0').attr('name', 'season[appointment]['+num+']');
			$('#season'+number+' #appointment-dont0').attr('checked', true);
			$('#season'+number+' #appointment-dont0').attr('id', 'appointment-dont'+number);
			//change date
			$('#season'+number+' #date2').attr('id', 'date'+number+2);
			$('#season'+number+' #date1').attr('id', 'date'+number+1);
			//change time
			$('#season'+number+' #time2').attr('id', 'time'+number+2);
			$('#season'+number+' #time1').attr('id', 'time'+number+1);
			
			$('#season'+number+' .week_days .checkboxBox').each(function() {
				var day_name = $(this).val();
				var newAttr = 'weeks-'+day_name+number;
				$(this).attr('id', newAttr);
				$(this).find('input').attr('name', 'season[weeks]['+num+'][]');
				$(this).parent().attr('for', newAttr);
			});
			//notes
			$('#season'+number+' #notes').attr('id', 'notes'+number);
			$('#season'+number+' #notes'+number).attr('name', 'season[notes][]');
			
			$("#time"+number+"1, #time2"+number+"").timePicker();
			//change link delete
			$('#season'+number+' .delete_season').attr('rel', 'season'+number);

			//Store time used by duration.
			var oldTime = $.timePicker("#time"+number+"1").getTime();
			//Keep the duration between the two inputs.
			$("#time"+number+"1").change(function() {
				if ($("#time"+number+"2").val()) { // Only update when second input has a value.
					// Calculate duration.
					var duration = ($.timePicker("#time"+number+"2").getTime() - oldTime);
					var time = $.timePicker("#time"+number+"1").getTime();
					// Calculate and update the time in the second input.
					$.timePicker("#time"+number+"2").setTime(new Date(new Date(time.getTime() + duration)));
					oldTime = time;
				}
			});

			//date-picker
			$("#date"+number+"1").datepicker({"dateFormat":"M dd"});
			$("#date"+number+"2").datepicker({"dateFormat":"M dd"});
			//initialization delete season
			$('#season'+number+' .delete_season').click( function(event) {
				event.preventDefault();
				var link = $('#season'+number+' .delete_season');
				var season 	= link.attr('rel');
				this.latestLink = link;
				$('#'+season+'').remove();
			});
		});
	},	

	deleteSeason: function() {
		$('.delete_season').click( function(event) {
			event.preventDefault();
				$(this).parents('.season').remove();
		});
	},

	times: function() {
		$("#time1, #time2").timePicker();
	},

	time1: function() {
		//Keep the duration between the two inputs.
		$("#time1").change(function() {
			if ($("#time2").val()) { 
				// Calculate duration.
				var duration = ($.timePicker("#time2").getTime() - oldTime);
				var time = $.timePicker("#time1").getTime();
				// Calculate and update the time in the second input.
				$.timePicker("#time2").setTime(new Date(new Date(time.getTime() + duration)));
				oldTime = time;
			}
		});
	},
	
	time2: function() {
		$("#time2").change(function() {
			if($.timePicker("#time1").getTime() > $.timePicker(this).getTime()) {
				$(this).addClass("error");
			} else {
				$(this).removeClass("error");
			}
		});
	}
}

//init our object
$(function() {
        vineyards.init();
	  var rmBtns = $('#vineyard_photos').find('.delete');
	  rmBtns.unbind('click');
	  rmBtns.click( function() {
		  $(this).parents('tr').fadeOut('slow', function() {
			  $(this).remove();
		  })
	  })
	var count_season  = $('.seasons .season').length;
	for(i = 0; i <= count_season; i++) {
		$("#date" + i +"1").datepicker({"dateFormat":"M dd"});
		$("#date" + i +"2").datepicker({"dateFormat":"M dd"});
	
		$("#time" + i +"1, #time" + i +"2").timePicker();
		$("#time" + i +"1").change(function() {
			if ($("#time" + i +"2").val()) { 
				// Calculate duration.
				var duration = ($.timePicker("#time" + i +"2").getTime() - oldTime);
				var time = $.timePicker("#time" + i +"1").getTime();
				// Calculate and update the time in the second input.
				$.timePicker("#time" + i +"2").setTime(new Date(new Date(time.getTime() + duration)));
				oldTime = time;
			}
		});
		$("#time" + i +"2").change(function() {
			if($.timePicker("#time" + i +"1").getTime() > $.timePicker(this).getTime()) {
				$(this).addClass("error");
			} else {
				$(this).removeClass("error");
			}
		});
	}
	
	$("#date1").datepicker({"dateFormat":"M dd"});
	$("#date2").datepicker({"dateFormat":"M dd"});
});


function initUploader1()
{
	'use strict';
	var filesList = {}
	
$('#edit_vineyard').fileupload({
       url: SYS.siteUrl + '/vineyards/upload/',
       multipart: true,
       singleFileUploads: false,
       
       add: function(e,data) {
	$('#' + e.srcElement.id).parents('.oneLine').find('.spiner').html($('<img/>').attr({'src' : '/images/spinner.gif'}));
	var imagediv = $('#' + e.srcElement.id).parents('.oneLine').find('.wine_image');
	var imagename = $('#' + e.srcElement.id).parent().find('.image');
         var jqXHR = data.submit()
                .success(function(result, textStatus, jqXHR) {
		$('#' + e.srcElement.id).parents('.oneLine').find('.spiner').html('');			
                	if(result.length > 0) {
                		var image = new ImageRender(result);
                		if(result[0].type == 'logo') {
				    var logo = $('<img/>').attr({'src':result[0].url, 'alt': result[0].name, 'title': result[0].name});
				    var path = '<input class="input-file" value="'+result[0].name+'" id="logo" name="logo" type="hidden">'
				    $('#vineyard_logo').html(logo);
				    $('#logo').html(path);
                		}
			if(result[0].type == 'image') {
				var logo = $('<img/>').attr({'src':result[0].url, 'alt': result[0].name, 'title': result[0].name});
				var path = '<input class="input-file" value="'+result[0].name+'" id="image" name="wines[image][]" type="hidden">'
				imagediv.html(logo);
				imagename.html(path);
			}
                		if(result[0].type == 'photo') {
                			image.render('#vineyard_photos', 'append');
                			image.observerBtns('#vineyard_photos');
                		}
                	}
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
}

$(function() {
	initUploader1();
})

function trim( str, charlist ) 
{	
	charlist = !charlist ? ' \s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
	var re = new RegExp('^[' + charlist + ']+|[' + charlist + ']+$', 'g');
	return str.replace(re, '');
}
