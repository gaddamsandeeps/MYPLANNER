function minimaxConetent(obj) {
    var rsrcevisibility = $(obj).siblings('.resourcseToProject').css('display');
    if (rsrcevisibility == 'none') {
        $(obj).siblings('.resourcseToProject').show();
        $(obj).removeClass('plus');
        $(obj).addClass('minus');
    }
    else {
        $(obj).siblings('.resourcseToProject').hide();
        $(obj).removeClass('minus');
        $(obj).addClass('plus');
    }
}
$('#showall').click(function() {
    $('.resourcseToProject').show();
    $('.minimize').removeClass('plus');
    $('.minimize').addClass('minus');
});
$('#hideall').click(function() {
    $('.resourcseToProject').hide();
    $('.minimize').removeClass('minus');
    $('.minimize').addClass('plus');
});