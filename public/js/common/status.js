function showStatus(obj, msg){
	var txt = '';
	if(obj.message === 'success'){
		txt = msg;
	}else if(obj.message === 'failure'){
		if(obj.data && obj.data.message){
			txt = obj.data.message ;
		}else{
			txt = 'Oops! Something went wrong.';
		}
	}else{
		txt = 'Your session has expired. Please log-in again.';
	}

	$("#statusMessage").attr('style', '');
	$("#statusMessage")	
	.attr("class", "ui-state-highlight")
	.html(txt)
	.delay(2000)

	//The .animate()
	.animate({ opacity: 0}, 400, function() {
	//Callback (optional)
});
}