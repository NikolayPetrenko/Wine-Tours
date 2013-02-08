/*global $, window, document */

var ImageRender;

ImageRender = (function() {

  function ImageRender(data) {
    if (data == null) data = [];
    this.data = data;
  }
  
  ImageRender.prototype.observerBtns = function(scope) {
	  var rmBtns = $(scope).find('.delete');
	  rmBtns.unbind('click');
	  rmBtns.click( function() {
		  $(this).parents('tr').fadeOut('slow', function() {
			  $(this).remove();
		  })
	  })
  }
  
  ImageRender.prototype.data = [];
  
  /**
   * function will render preview images
   * @var domElement - selector of DOM or jQuery object
   * @var type - will contain behaviour, what we have to do with images, update or append
   */
  ImageRender.prototype.render = function(domElement, type) {
	  if (type == null) type = 'update';
	  var domElement = $(domElement);
	  if(this.data.length > 0) {
		  for(var idx in this.data) {
			  var logo = $('<img/>').attr({
					  					'src':	this.data[idx].url, 
					  					'alt': 	this.data[idx].name, 
					  					'title':this.data[idx].name
					  					//'width': 220
					  				});
			  if(this.data[idx].type == 'logo') {
				var fileName = '<input class="input-file" value="'+this.data[idx].name+'" name="logo" type="hidden">';
			  }
			  if(this.data[idx].type == 'photo') {
				 var fileName = '<input class="input-file" value="'+this.data[idx].name+'" name="photos[]" type="hidden">';
			  }
			  if(type == 'update') {
				  domElement.html(logo);
				  domElement.parents('form').append(fileName);
			  }
			  if(type == 'append') {
				  var tr = $('<tr></tr>');
				  var td = $('<td></td>');
				  td
				  	.append(logo)
				  	.append(fileName);
				  tr
				  	.append(td)
				  	.append('<td><button type="button" class="btn btn-danger delete"><i class="icon-trash icon-white"></i><span>Delete</span></button></td>');
				  domElement.append(tr);
			  }
		  }
	  }
  }
 
  
  return ImageRender;

})();


function initUploader()
{
	'use strict';
	var filesList = {}
	
$('#add_listing').fileupload({
	
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
	initUploader();
})