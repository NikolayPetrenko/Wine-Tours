$(document).ready(
    function() {
		$('.inputBox').focus(function() {$(this).parent().addClass('infocus')});
		$('.inputBox').blur(function() {$(this).parent().removeClass('infocus')});
		$(".container aside .neighbordhood .list .listItem:last").addClass("marginBottomNone");
		$(".container .content .aboutVineyard .tabPage .vinesWinesTable tr:last").addClass("noBorderBottom");
		$(".container .content .aboutVineyard .tabPage .vinesWinesTable tr .label").addClass("noBorderRight");
    }
);