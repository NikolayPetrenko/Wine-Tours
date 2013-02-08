$(function () {
    'use strict';
    var filesList = {}
    $('#edit_seo').fileupload({
       url: SYS.siteUrl + '/admin/uploadseo',
       multipart: true,
       singleFileUploads: false,
       add: function(e,data) {
         var jqXHR = data.submit()
                .success(function(result, textStatus, jqXHR) {
//				var logo = $('<img/>').attr({'src':result[0].url, 'alt': result[0].name, 'title': result[0].name});
				$('#spotlight_image').html('<img src="'+result[0].url+'">'+'<input type="hidden" name="spotlight_image" id="sp_image" value="'+result[0].name+'">');
				$('#country_image #count_image').val(result[0].name);
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