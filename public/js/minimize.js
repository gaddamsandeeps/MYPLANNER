function minimaxConetent(obj) {
	if($(obj).children().children().hasClass('fa-minus-square-o')){
		$(obj).children().children().addClass('fa-plus-square-o');
		$(obj).children().children().removeClass('fa-minus-square-o');
		$(obj).parent().removeClass('open');
		$(obj).siblings('.resourcseToProject').hide();
	}else{
		$(obj).children().children().addClass('fa-minus-square-o');
		$(obj).children().children().removeClass('fa-plus-square-o');
		$(obj).parent().addClass('open');
		$(obj).siblings('.resourcseToProject').show();	
	}
}