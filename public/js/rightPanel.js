$(function() {
    $('.rightPannelSection h4').click(function() {
        var dispcheck = $(this).next('.itemsList').css("display");
        if (dispcheck === "none") {
            $(this).next('.itemsList').slideDown();
            $(this).children('.arrwCntrl').removeClass('arrwCntrlUp');
            $(this).children('.arrwCntrl').addClass('arrwCntrlDown');
        } else {
            $(this).next('.itemsList').slideUp();
            $(this).children('.arrwCntrl').removeClass('arrwCntrlDown');
            $(this).children('.arrwCntrl').addClass('arrwCntrlUp');
        }
    });
    /*
    $('#Projects .addProjectIcon').click(function(e) {
        e.stopPropagation();
        $('#addproject').trigger('click');
    });
*/
$('.refereshIcon').click(function(e) {
    e.stopPropagation();
    location.reload();
});
});