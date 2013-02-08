$(window).load(function() {
	
//	$("#grapes").multiselect({
//			noneSelectedText: 'Select Grapes Grown',
//			selectedList: 25
//		}).multiselectfilter();

    $('.dropdown-menu a').click(function() {
    	window.location.href = $(this).attr('href');
    });
    //highlight searched term
    $.ui.autocomplete.prototype._renderItem = function( ul, item) {
    	  var term = this.term.split(' ').join('|');
    	  var re = new RegExp("(" + term + ")", "gi") ;
    	  var t = item.label.replace(re,"<b>$1</b>");
    	  return $( "<li></li>" )
    	     .data( "item.autocomplete", item )
    	     .append( "<a>" + t + "</a>" )
    	     .appendTo( ul );
    	};
		
	$('#country_c').live('change', function(){
		console.log('dd');
	})	

	if($('#involve1').attr("checked") == "checked"){
		$('.inv_select').css('display', 'block');
	} else {
		$('.inv_select').css('display', 'none');
	}
	
	if($('#owner-0').attr("checked") == "checked"){
		$('.div_prop').css('display', 'block');
	}
	if($('#owner-1').attr("checked") == "checked"){
		$('.div_prop').css('display', 'none');
		$('#proprietor').val('');
	}
	
	$('#owner-0').click(function(){
		$('.div_prop').css('display', 'block');
	})
	
	$('#owner-1').click(function(){
		$('.div_prop').css('display', 'none');
		$('#proprietor').val('');
	})	
	
	$('#involve-2').click(function() {
		$('.inv_select').css('display', 'block');
	});

	$('#involve-1').click(function() {
		$('.inv_select').css('display', 'none');
		$('#other').css('display', 'none');
	});
		
	$('#inv_select-Other').live('change', function() {
		if($('#inv_select-Other').attr("checked") == "checked") {
			$('.other').css('display', 'block');
		} else {
			$('.other').css('display', 'none');
		}	   
	});
	if($('#inv_select-Other').attr("checked") == "checked") $('.other').css('display', 'block');
	if($('#involve-1').attr("checked") != "checked") {
		$('#involve-2').attr("checked", "checked");
		$('.inv_select').css('display', 'block');
	} else {
		$('.inv_select').css('display', 'none');
		$('.other').css('display', 'none');
	}
});

var contact = {
	init: function() {
		this.add();
	},
		add: function(){
		$('#contactus').validate({
			errorClass:'errors_contact',
			validClass:'succses',
			errorElement:'div',
			rules:{
					comment: {
								required: true
					},
					subject: {
								required: true
					},
					email: {
							required: true,
							email: true
						},
					recaptcha_response_field: {
						required: true
					}
			},
			messages:{
				email: {
					required: "Please enter user email",
					email: "Please enter a valid email address"
				},
				subject: "Please enter subject",
				comment: "Please enter your comment",
				recaptcha_response_field: ""
			},
			highlight: function (element, errorClass, validClass) {
				if($(element).attr('name') == 'comment') {
					setTimeout(function() {
						var div = $(element).next();
						$(element).prev().after(div);
					}, 0);
				}
			},
			unhighlight: function (element, errorClass, validClass) {
					$(element).parents("div.inputBox").removeClass(errorClass).addClass(validClass);
			}
		});
	}
}

var cities = {
	init: function(){
		this.cityAutocomplete();
		this.login1();
	},
		
	login1: function(){
		$('#login1').validate({
			errorClass:'error_main',
			validClass:'succses',
			errorElement:'span',
			rules:{
					email: {
							required: true,
							email: true
						},
					password: {
								required: true
							}
					},
			messages:{
				email: {
					required: "Please enter your email",
					email: "Please enter a valid email address"
				},
				password: "Please enter your password"
			},
			highlight: function (element, errorClass, validClass) {
					$(element).parents("div.control").addClass(errorClass).removeClass(validClass);
			},
			unhighlight: function (element, errorClass, validClass) {
					$(element).parents("div.control").removeClass(errorClass).addClass(validClass);
			}
		});
	},
	
	cityAutocomplete: function(){
		var searchField =$( "#city" );
		searchField.autocomplete({  
			source: function(request, response) {
				$.ajax({
						type: 'POST',
						url: SYS.siteUrl+"citysearch",
						dataType: 'json',
						data : {
								search: searchField.val()
						},
						success: function(data) {
							response($.map(data, function(item) {
									return {
											id		: item.id,
											label	: item.label
									}
							}))
						}
				})
			},
			minLength: 1
		});         
	}	
}
	
var search = {
	init: function(){
		this.searchAutocomplete();
		this.clearSearch();
	},

	clearSearch: function() {
		$('#searchbox').click(function(){
		    if($('#searchbox').val() == 'Find Vineyards/Regions/Wines') {
			$('#searchbox').val('');
		    }
		})
		$('#searchbox').blur(function(){
		    if($('#searchbox').val() == '') {
			$('#searchbox').val('Find Vineyards/Regions/Wines');
		    }
		})
	},
	
	searchAutocomplete: function(){
		var searchField =$( "#searchbox" );
		searchField.autocomplete({  
			open: function() {
				var drop = $('.ui-autocomplete');
				drop.css({
					left: drop.css('left').replace('px','') -20,
					top:  parseInt(drop.css('top').replace('px',''))+10
				});
			},
			source: function(request, response) {
				$.ajax({
						type: 'POST',
						url: SYS.siteUrl+"/search/searchauto",
						dataType: 'json',
						data : {
								search: searchField.val()
						},
						success: function(data) {
							response($.map(data, function(item) {
									return {
											id		: item.id,
											label	: item.label
									}
							}))
						}
				})
			},
			minLength: 1
		});         
	}	
}

function showLogin()
{
	if($('.loginDropdown').css('display') == 'block') {
		$('.loginDropdown').fadeOut();
		$('#modalinvise').remove();
	} else {
		$('.loginDropdown').fadeIn();
		$('.loginDropdown #email').focus();
		if($('#modalinvise').length == 0) {
			$('body').append('<div id="modalinvise"></div>');
		}
		
		$('#modalinvise').click(function() {
			$(this).remove();
			$('.loginDropdown').fadeOut();
		})
	}
}

//init our object
$(function() {
	setTimeout(function() {
		$('.flash_message').slideDown('fast', function(){
			setTimeout(function() {
				$('.flash_message').slideUp();
			}, 2000);
		});
	}, 500);
	$('.wrapper').show();
	$('.footerWrapper').show();
	contact.init();
	cities.init();
	search.init();
	
	$('.helpWrapper').hover(function(){
		$(this).children('.helpInfo').show();
	}, function(){
		$(this).children('.helpInfo').hide();
	});
	$('.loginDropdown #rememberMe1').next('label').click(function(){
		if($('.loginDropdown #rememberMe1').attr('checked') == 'checked') {
			$('.loginDropdown #rememberMe1').attr('checked', false);
		} else {
			$('.loginDropdown #rememberMe1').attr('checked', true);
		}
	});
	$('#log').click(function(e){
		e.preventDefault();
		showLogin();
//		if($('.loginDropdown').css('display') == 'block') {
//			$('.loginDropdown').hide();
//		} else {
//			$('.loginDropdown').show();
//			$('.loginDropdown #email').focus();
//		}
	});
	
	$(".various").fancybox({
		maxWidth	: 527,
		maxHeight	: 565
	});
});

var MyModal = function() {
	
	this.options = {
		title: 'Here title',
		text : 'Blablabla',
		buttons: [
			{
				value : 'OK',
				callback: null,
				cls: 'btn-primary'
			},
			{
				value : 'Cancel',
				callback: null,
				cls: ''
			}
		]
	}
	
	this.init = function(options) {
		$.extend(this.options, options);
		this.create();
		$('#myModal').modal();
	}
	
	this.create = function() {
		var container 	= $('<div class="modal fade" id="myModal"></div>');
		var header 		= $('<div class="modal-header"><a class="close" data-dismiss="modal">×</a><h3>'+this.options.title+'</h3></div>');
		var body		= $('<div class="modal-body"></div>');
		if($(this.options.text).length != 0) {
			body.append($(this.options.text));
		} else {
			body.append('<p>'+this.options.text+'</p>');
		}
		var footer = $('<div class="modal-footer"></div>');
		
		for(var i in this.options.buttons) {
			footer.append('<a href="#" onclick="javascript:'+ this.options.buttons[i].callback +'" class="btn '+ this.options.buttons[i].cls +'">'+ this.options.buttons[i].value +'</a>');
		}
		container.append(header).append(body).append(footer);
		if($('#myModal').length === 0) {
			$('body').append(container);
		}
	}
	
	 this.show = function() {
		 
	 }
	 
	 this.hide = function() {
		 $('#myModal').modal('hide');
		 $('#myModal').remove();
	 }
	 
	 this.destroy = function() {
		 
	 }
};
  
//$(function () {
//    'use strict';
//    var filesList = {}
//    $('#add_wine').fileupload({
//       url: SYS.siteUrl + 'uploadwine/',
//       multipart: true,
//       singleFileUploads: false,
//       add: function(e,data) {
//         var jqXHR = data.submit()
//                .success(function(result, textStatus, jqXHR) {
//				var logo = $('<img/>').attr({'src':result[0].url, 'alt': result[0].name, 'title': result[0].name});
//				var path = '<input class="input-file" value="'+result[0].name+'" id="image" name="image" type="hidden">'
//				$('#wine_image').html(logo);
//				$('#image').html(path);
//                })
//                .error(function (jqXHR, textStatus, errorThrown) {
//                })
//                .complete(function (result, textStatus, jqXHR) {
//                });
//       },
//       
//       progress: function(e, data) {
//         var progress = parseInt(data.loaded / data.total * 100, 10);
//       }
//    });
//	
//	var button	= $('#mod_click');
//	var box		= button.parents('form');
//	var btnWidth	= button.width();
//	var boxWidth	= box.width();
//});