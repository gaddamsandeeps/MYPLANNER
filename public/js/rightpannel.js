$(function() {
	$('.rightPannelSection h4').click(function() {
        var dispcheck = $(this).next('.itemsList').css("display");
        if (dispcheck === "none") {
            $(this).next('.itemsList').slideDown();
            $(this).children('#togleSection').removeClass('fa-chevron-up');
            $(this).children('#togleSection').addClass('fa-chevron-down');
        } else {
            $(this).next('.itemsList').slideUp();
            $(this).children('#togleSection').removeClass('fa-chevron-down');
            $(this).children('#togleSection').addClass('fa-chevron-up');
        }
    });
	
    /*
    $('#Projects .addProjectIcon').click(function(e) {
        e.stopPropagation();
        $('#addproject').trigger('click');
    });
    
    $('.refereshIcon').click(function(e) {
        e.stopPropagation();
        location.reload();
    });
*/
});