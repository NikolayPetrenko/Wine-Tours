$(function () {
    'use strict';
    var filesList = {}
    $('#signup').fileupload({
       url: SYS.siteUrl + 'upload/',
       multipart: true,
       singleFileUploads: false,
       add: function(e,data) {
         var jqXHR = data.submit()
                .success(function(result, textStatus, jqXHR) {
				var logo = $('<img/>').attr({'src':result[0].url, 'alt': result[0].name, 'title': result[0].name});
				var path = '<input class="input-file" value="'+result[0].name+'" id="image" name="image" type="hidden">'
				$('#user_image').html(logo);
				$('#user_image').css('display', 'block');
				$('#image').html(path);
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

$(function () {
    'use strict';
    var filesList = {}
    $('#profile').fileupload({
       url: SYS.siteUrl + '/reg/upload/',
       multipart: true,
       singleFileUploads: false,
       add: function(e,data) {
         var jqXHR = data.submit()
                .success(function(result, textStatus, jqXHR) {
				var logo = $('<img/>').attr({'src':result[0].url, 'alt': result[0].name, 'title': result[0].name});
				var path = '<input class="input-file" value="'+result[0].name+'" id="image" name="image" type="hidden">'
				$('#user_image').html(logo);
				$('#user_image').show();
				$('#image').html(path);
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

$(function () {
    'use strict';
    var filesList = {}
    $('#edit_user').fileupload({
       url: SYS.siteUrl + '/reg/upload/',
       multipart: true,
       singleFileUploads: false,
       add: function(e,data) {
         var jqXHR = data.submit()
                .success(function(result, textStatus, jqXHR) {
				var logo = $('<img/>').attr({'src':result[0].url, 'alt': result[0].name, 'title': result[0].name});
				var path = '<input class="input-file" value="'+result[0].name+'" id="image" name="image" type="hidden">'
				$('#user_image').html(logo);
				$('#image').html(path);
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

var users = {

	init: function(){
		this.login();
		this.signup();
		this.active();
		this.add();
		this.observeRemoveBtns();
		this.profile();
		this.changePassword();
		this.forgotPassword();
	},
	
	forgotPassword: function(){
		$('#forgot_password').validate({
			errorClass:'error',
			validClass:'succses',
			errorElement:'span',
			rules:{
					email: {
							required: true,
							email: true
						}
					},
			messages:{
				email: {
					required: "Please enter your email",
					email: "Please enter a valid email address"
				}
			},
			highlight: function (element, errorClass, validClass) {
					setTimeout(function() {
						var span = $(element).parents('.oneLine').find('span.error');
						$(element).parents(".oneLine").find('.helpWrapper').after(span);
					}, 0);
			},
			unhighlight: function (element, errorClass, validClass) {
					$(element).parents("div.control").removeClass(errorClass).addClass(validClass);
			}
		});
	},
	
	add: function(){
		$('#add_user').validate({
			errorClass:'errors',
			validClass:'succses',
			errorElement:'span',
			rules:{
					name: {
							required: true
					},
					firstname: {
								required: true
					},
					email: {
							required: true,
							email: true
						}
			},
			messages:{
				email: {
					required: "Please enter user email",
					email: "Please enter a valid email address"
				},
				name: "Please enter user name",
				firstname: "Please enter user firstname"
			},
			highlight: function (element, errorClass, validClass) {
					$(element).parents("div.control").addClass(errorClass).removeClass(validClass);
			},
			unhighlight: function (element, errorClass, validClass) {
					$(element).parents("div.control").removeClass(errorClass).addClass(validClass);
			}
		});
	},
		
	login: function(){
		$('#login').validate({
			errorClass:'error',
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
				setTimeout(function() {
					var span = $(element).parents('.oneLine').find('span.error');
					$(element).parents(".oneLine").find('.helpWrapper').after(span);
				}, 0);
			},
			unhighlight: function (element, errorClass, validClass) {
					$(element).parents("div.onLine").removeClass(errorClass).addClass(validClass);
			}
		});
	},
	
	changePassword: function(){
		$('#change_password').validate({
			errorClass:'error',
			validClass:'succses',
			errorElement:'span',
			rules:{
					password: {
							required: true,
							minlength: 6
						},
					repassword: {
								required: true,
								equalTo: "#password"
							}
					},
			messages:{
				password: {
					required: "Please enter your password",
					minlength: "The password must be at least 6 characters"
				},
				repassword: {
					required: "Please repeat your password",
					equalTo: "The passwords do not match"
				}
			},
			highlight: function (element, errorClass, validClass) {
					setTimeout(function() {
						var span = $(element).parents('.oneLine').find('span.error');
						$(element).parents(".oneLine").find('.helpWrapper').after(span);
					}, 0);
			},
			unhighlight: function (element, errorClass, validClass) {
					$(element).parents("div.control").removeClass(errorClass).addClass(validClass);
			}
		});
	},

	signup: function(){
		$('#signup').validate({
			errorClass:'error',
			validClass:'succses',
			errorElement:'span',
			rules:{
					name: {
						required: true
					},
					email: {
							required: true,
							email: true
						},
					password: {
								required: true,
								minlength: 6
							},
					repassword: {
								required: true,
								equalTo: '#signup #password'
					},
					privacy: {
						required: true
					},
					'involve[]': {
						required: true
					},
					recaptcha_response_field: {
						required: true
					}
				},
			messages:{
				name: "Please enter you name",
				email: {
					required: "Please enter your email",
					email: "Please enter a valid email address"
				},
				password: {
					required: "Please enter your password",
					minlenght: "Password at least 6 characters"
				},
				repassword: {
					required: "Please repeat your password",
					equalTo: "The passwords do not match"
				},
				privacy: "Please select privacy control",
				'involve[]': "",
				recaptcha_response_field: ""
			},
			highlight: function (element, errorClass, validClass) {
				if($(element).attr('name') == 'privacy') {
					setTimeout(function() {
						var span = $(element).parents('.oneLine').find('span.error');
						$(element).parents(".oneLine").find('label').after(span);
					}, 0);
				} else {
					setTimeout(function() {
						var span = $(element).parents('.oneLine').find('span.error');
						$(element).parents(".oneLine").find('.helpWrapper').after(span);
					}, 0);
				}
			},
			unhighlight: function (element, errorClass, validClass) {
					$(element).parents("div.onLine").removeClass(errorClass).addClass(validClass);
			}
		});
	},
	
	profile: function(){
		$('#profile').validate({
			errorClass:'error',
			validClass:'succses',
			errorElement:'span',
			rules:{
					name: {
						required: true
					},
					email: {
							required: true,
							email: true
						},
					privacy: {
						required: true
					},
					'involve[]': {
						required: true
					}
				},
			messages:{
				name: "Please enter you name",
				email: {
					required: "Please enter your email",
					email: "Please enter a valid email address"
				},
				privacy: "Please select privacy control",
				'involve[]': ""
			},
			highlight: function (element, errorClass, validClass) {
				if($(element).attr('name') == 'privacy') {
					setTimeout(function() {
						var span = $(element).parents('.oneLine').find('span.error');
						$(element).parents(".oneLine").find('label').after(span);
					}, 0);
				} else {
					setTimeout(function() {
						var span = $(element).parents('.oneLine').find('span.error');
						$(element).parents(".oneLine").find('.helpWrapper').after(span);
					}, 0);
				}
			},
			unhighlight: function (element, errorClass, validClass) {
					$(element).parents("div.control").removeClass(errorClass).addClass(validClass);
			}
		});
	},
	
	active: function(){
		$('#active').validate({
			errorClass:'error',
			validClass:'succses',
			errorElement:'span',
			rules:{
					password: {
							required: true,
							minlength: 6
						},
					repassword: {
								required: true,
								equalTo: '#active #password'
							}
					},
			messages:{
				password: {
					required: "Please enter your password",
					minlength: "The password must be at least 6 characters"
				},
				repassword: {
					required: "Please repeat your password",
					equalTo: "The passwords do not match"
				}
			},
			highlight: function (element, errorClass, validClass) {
					setTimeout(function() {
						var span = $(element).parents('.oneLine').find('span.error');
						$(element).parents(".oneLine").find('.helpWrapper').after(span);
					}, 0);
			},
			unhighlight: function (element, errorClass, validClass) {
					$(element).parents("div.control").removeClass(errorClass).addClass(validClass);
			}
		});
	},

	observeRemoveBtns: function() {
		var rmLinks = $('.remove');
		var $this = this;
		rmLinks.click(function() {
			$this.showModal(this);
		});
	},

	showModal: function(link) {
		link 		= $(link);
		var userID 	= link.attr('rel').replace('user_', '');
		this.latestLink = link;
		
		var myModal = new MyModal();
		myModal.init({
			title : 'Delete User',
			text: "Are you sure you want to delete this user?",
			buttons: [
			          {
					value : 'OK',
					callback: 'users.remove('+userID+')',
					cls: 'btn-primary'
			          },
			          {
					value : 'Cancel',
					callback: 'users.hideModal()',
					cls: ''
			          }
			]
		});
	},

	hideModal: function() {
		var myModal = new MyModal();
		myModal.hide();
	},

	remove: function(userID) {
		var $this = this;
		 $.ajax({
             url: SYS.siteUrl + 'deleteuser/',
             type: 'POST',
             //dataType: 'json',
             data: 'userID='+ userID,
             success: function(response) {
			 	//if(response.result == 1) {
			 		var tr = $this.latestLink.parents('tr');
			 		tr.fadeOut('slow', function() {
			 			tr.remove();
			 		})
			 	//}
			 	users.hideModal();
             }
         });
	}
}

//init our object
$(function() {
        users.init();
	$('#label-rememberMe').click(function(){
		if($(this).parents('.oneLine').find('#rememberMe').attr('checked') == 'checked') {
			$(this).parents('.oneLine').find('#rememberMe').attr('checked', false);
			$(this).parents('.oneLine').find('.jNiceCheckbox').removeClass('jNiceChecked');
		} else {
			$(this).parents('.oneLine').find('#rememberMe').attr('checked', true);
			$(this).parents('.oneLine').find('.jNiceCheckbox').addClass('jNiceChecked');
		}
	});
	$("#regions").multiselect({
			noneSelectedText: 'Select Regions',
			selectedList: 25
	}).multiselectfilter();		
});