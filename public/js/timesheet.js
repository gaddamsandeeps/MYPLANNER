var Projects, modalfooter, selectedId,checkLogAccess,selectedEvent,
projErrMsg='<LI>Please select project</LI>',
datesErrMsg = '<LI>End time should be greater than start Time and both are of same dates</LI>',
teamErrMsg='<LI>Please select employee</LI>',
iterationNoErrMsg='<LI>Please enter valid iteration number</LI>',
storyErrMsg='<LI>Please enter story description</LI>';
statusErrMsg='<LI>Please enter story status</LI>'

var req = $.ajax({
  url: '/getUserProjects',
  type: 'GET',
  dataType: 'json'
});
req.done(function(data) {
  Projects = data;
  var s = '',
  o;
  for (i = 0; i < data.length; i++) {
    o = data[i];
    s += '<option value="' + o.id + '">' + o.name + '</option>';
  }
  $('#addTimeProjectId').append(s);
});


$.ajax({
  url: '/getLogStatuses',
  type: 'GET',
  dataType: 'json'
}).done(function(data) {
  var s = '';
  for (i = 0; i < data.length; i++) {
    s += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
  }
  $('#logStatuses').append(s);
});

(function(){
  $.ajax({
   url : '/hasLogAccess',
   type:'get',
   dataType: 'json'
 }).done(function(resp){	
   var	userid = resp.userid;
   var	teamid = resp.teamid;
   if(resp.accesslevel){
    getTeamMembers(teamid,function(teamMembers){				
     if(teamMembers.length){
       $("#teamMembersWrapper").show();
       checkLogAccess = true;
     }			
     for(i=0; i< teamMembers.length; i++){
      if(teamMembers[i].id !== userid ){
       $("#teamMembers").append("<option value="+teamMembers[i].id+">"+teamMembers[i].firstname+" "+teamMembers[i].lastname+"</option>")
     }
   }	
 });	
  }
});
})();

function getTeamMembers(teamId, callback){

  var data = {id : teamId};
  $.ajax({
   url : '/getTeamUsersByTeamId',
   type:'get',
   dataType: 'json',
   data : data
 }).done(function(resp){
  if(callback) callback(resp);
  return resp;
});
}

$(document).on("change", "#resourceType", function(){
	if($(this).val()=== "self"){
   $("#teamMembers").hide().val('');
 }else{
   $("#teamMembers").show();
 }
});

$('#unlockRequest').click(function(){
  var projectdetails = {
   id : selectedId
 };		
 var unlockreq = $.ajax({
  url: '/unlockLogRequest',
  type: 'get',
  contentType: 'application/json',
  data: projectdetails
});
 
 

 unlockreq.done(function(d){
     //$('#unlockRequest').attr('disabled','disabled');
     //change event color starts here
     el.fullCalendar('removeEvents', [selectedId]);     
     var eventData = {
      title: selectedEvent.title,
      projectid : selectedEvent.projectid,
      start: selectedEvent.start._d,      
      end: selectedEvent.end._d,
      iteration: selectedEvent.iteration,
      story: selectedEvent.story,
      statusid: selectedEvent.statusid,
      description: selectedEvent.description,
      id: selectedEvent.id,
      backgroundColor: 'red',
      borderColor : 'red',
      locked: 1,
      lockrequest: 1
    };
    el.fullCalendar('renderEvent', eventData, true);
    el.fullCalendar('unselect');
    //change event color ends here

    modalEl.modal('hide');
    showStatus(d, 'Unlock request raised');
  });

});

//validate log form
function validate(StartTime, EndTime){	
  if($('#addTimeProjectId').val().length === 0){
    $('#errorContainer').html(projErrMsg);            
    return false;
  }

	if(($('#resourceType').val() === 'team') && ($('#teamMembers').val() === '')){
		$('#errorContainer').html(teamErrMsg);						
		return false;
	}
  if( ($('#logStatuses').val().trim().length > 0) && ($('#addTimeIterationNo').val().trim().length === 0) && ($('#addTimeStoryDescription').val().trim().length === 0)){
     $('#errorContainer').html(iterationNoErrMsg);
      return false;
  } 

	if($('#addTimeIterationNo').val().trim().length > 0){
		if(isNaN($('#addTimeIterationNo').val())){
			$('#errorContainer').html(iterationNoErrMsg);
			return false;
		}
		if($('#addTimeStoryDescription').val().trim().length == 0){
			$('#errorContainer').html(storyErrMsg);
			return false;
		}
    if($('#logStatuses').val() === ''){
      $('#errorContainer').html(statusErrMsg);
      return false;
    }  
    
	}else{
    
		if($('#addTimeStoryDescription').val().length > 0){
			$('#errorContainer').html(iterationNoErrMsg);
			return false;
		}
	}
	if (!(sameDates(StartTime.value, EndTime.value)  && (EndTime.valueAsNumber > StartTime.valueAsNumber))) {
		$('#errorContainer').html(datesErrMsg);
		return false;
	}
	return true;
}

var el = $('#calendar');
var modalEl = $('#AddTimeModal');
var calObj = {
  eventClick: function(event, element) {
    $("#teamMembersWrapper").hide();
    $('#errorContainer').html('');

    var lockStatus = event.locked;
    var lockRequest = event.lockrequest;
    selectedId = event.id;
    selectedEvent = event;   

    if(lockRequest === 1){
			//hide req unlock button and save log button
			$('.requestunlock').hide();
		}
		else{
			$('.requestunlock *').removeAttr('disabled');
			$('.requestunlock').show();
		}

    if (lockStatus === 1) {
			//hide save log button
      $('#AddTimeForm').addClass('lockTimeForm');
      $('.lockTimeForm *').attr({
       'disabled': true
     });
      if(lockRequest === 0){
					//enable unlock button
         $('.requestunlock *').removeAttr('disabled');
       } 

       var footer = $('.lockTimeForm .modal-footer').remove();
       if(footer.length > 0){
         modalfooter = footer;
       }

          //  modalfooter = $('.lockTimeForm .modal-footer').remove();	    	
          $('#lockFormCloseBtn,.close').removeAttr('disabled');
        } else {
			//show save log button
			if(modalfooter){
				$('.lockTimeForm').append(modalfooter);
				$('.lockTimeForm *').removeAttr('disabled');
				$('#AddTimeForm').removeClass('lockTimeForm');
			}
			$('.requestunlock').hide();
			
    }
    var btnGroup = $('.fc-button-group');
    var active = btnGroup.find('.fc-state-active').text().trim();
    var eventData;
    if (active === 'month') {
      $('#modalHeader').text('Locked Time');
      var start = toUTC(new Date(event.start._d));
      var end = toUTC(new Date(event.end._d));
      
      var select = document.getElementById('addTimeProjectId');
      select.value = event.projectid;

      var StartTime = document.getElementById('addTimeStartTime')
      StartTime.valueAsNumber = start;

      var EndTime = document.getElementById('addTimeEndTime')
      EndTime.valueAsNumber = end;

      var logStatuses = document.getElementById('logStatuses');
      logStatuses.selectedIndex = event.statusid;


      $('#addTimeIterationNo').val(event.iteration);
      $('#addTimeStoryDescription').val(event.story);      

      $('#addTimeDescription').val(event.description);
      modalEl.modal('show');
      $('#AddTimeForm').off().submit(function(e) {
        e.preventDefault();
        var o = {
          projectid: $('#addTimeProjectId').val(),
          iterationno: $('#addTimeIterationNo').val(),
          storydescription: $('#addTimeStoryDescription').val(),
          logstatuses: $('#logStatuses').val(),
          startdate: $('#addTimeStartTime').val(),
          enddate: $('#addTimeEndTime').val(),
          description: $('#addTimeDescription').val(),
          id: event.id
        };

//				var st = new Date(StartTime.valueAsNumber);
  //              var et = new Date(EndTime.valueAsNumber);

  if (validate(StartTime, EndTime)) {                    
    var editLog = $.ajax({
      url: '/editLog',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(o)
    });
    editLog.done(function(d) {
      showStatus(d, 'Log edited successfully');                        
      el.fullCalendar('removeEvents', [event._id]);
      modalEl.modal('hide');
      var index = select.selectedIndex;
      var val = select.options[index].textContent;

      var eventData = {
        title: val,
        start: o.startdate,
        projectid : o.projectid,
        end: o.enddate,
        iteration : o.iterationno,
        story : o.storydescription,
        statusid : o.logstatuses,
        description: o.description,
        id: event.id,
        locked: 1,
        lockrequest: 0
      };
      el.fullCalendar('renderEvent', eventData, true);
      el.fullCalendar('unselect');
    });
    editLog.fail(function(e) {
      console.log(e);
    });
  } 
});
}
},
timezone: 'local',
header: {
  left: 'prev,next today',
  center: 'title',
  right: 'month,agendaWeek,agendaDay'
},
defaultDate: new Date(),
editable: false,
selectable: true,
selectHelper: true,
select: function(start, end) {
  if($('#teamMembers').children('option').length > 1){
   $("#teamMembersWrapper").show();
 }
 $('#errorContainer').html('');
	   //disable overlay for past or next month dates
		//var currentMonth = new Date().getMonth()+1;
		// if(start._d.getMonth()+1 !== currentMonth){
		//  return false;
	//	 }

		//hide req unlock button 
		$('.requestunlock').hide();
    var now = new Date();
    var selected = start._d;
    selected.setHours(now.getHours());
    selected.setMinutes(now.getMinutes());

    var utc_selected = toUTC(selected);

    $('.lockTimeForm').append(modalfooter);
    $('.lockTimeForm *').removeAttr('disabled');
    $('#AddTimeForm').removeClass('lockTimeForm');
    document.getElementById('AddTimeForm').reset();
    $('#modalHeader').text('Add Time');

    var StartTime = document.getElementById('addTimeStartTime');
    var EndTime = document.getElementById('addTimeEndTime');
    StartTime.valueAsNumber = EndTime.valueAsNumber = utc_selected;

    var btnGroup = $('.fc-button-group');
    var active = btnGroup.find('.fc-state-active').text().trim();
    var eventData;
    if (active === 'month') {
      modalEl.modal('show');
      $('#AddTimeForm').off().submit(function(e) {
        e.preventDefault();
        var o = {
          "projectid": $('#addTimeProjectId').val(),
          "iterationno": $('#addTimeIterationNo').val(),
          "storydescription": $('#addTimeStoryDescription').val(),
          "logstatuses": $('#logStatuses').val(),
          "startdate": $('#addTimeStartTime').val(),
          "enddate": $('#addTimeEndTime').val(),
          "description": $('#addTimeDescription').val()
        };
        var st = new Date(StartTime.valueAsNumber);
        var et = new Date(EndTime.valueAsNumber);

        var teamMemberUserId = $("#teamMembers").val();

        if(($('#resourceType').val() === 'team') && ($('#teamMembers').val() === '')){
          $('#errorContainer').html(teamErrMsg);						
          return;
        }
        
        if (validate(StartTime, EndTime)) {
         if(checkLogAccess && teamMemberUserId){
          o.userid = teamMemberUserId;
        }
        var saveLog = $.ajax({
          url: '/saveLog',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(o)
        });
        saveLog.done(function(d) {        
          var msg = 'Log saved successfully';

          if($('#teamMembers').val() !== ''){
            msg += ' for '+($('#teamMembers option:selected').text());
          }

          showStatus(d, msg);
          modalEl.modal('hide');
          var select = document.getElementById('addTimeProjectId');
          var index = select.selectedIndex;
          var val = select.options[index].textContent;
          eventData = {
            title: val,
            projectid : select.options[index].value,
            start: o.startdate,
            end: o.enddate,
            iteration : o.iterationno,
            story : o.storydescription,
            statusid : o.logstatuses,
            description: o.description,
            id: d.data.insertId,
            locked: 1,
            lockrequest: 0
          };
          if(($('#resourceType').val() !== 'team')){
            el.fullCalendar('renderEvent', eventData, true);
            el.fullCalendar('unselect');

          }
        });
        saveLog.fail(function(e) {
          console.log(e);
        });
      }
    });
}
},
events: function(start, end, timezone, callback) {
  var e1 = end.toISOString();
  var e2 = Date.parse(e1);
  var e3 = new Date(e2);
  var obj = monthStartEnd(e3);
  var req = $.ajax({
    url: '/getLogs',
    dataType: 'json',
    data: obj
  });
  req.done(function(events) {
    callback(events);
  });
  req.fail(function(e) {
    callback(e);
  });
}
};
el.fullCalendar(calObj);