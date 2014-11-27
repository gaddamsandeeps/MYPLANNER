var el = $('#calendar'),selectedEvent;
var modalEl = $('#AddTimeModal');
var calObj = {
  eventClick: function(event, element) {       
    var btnGroup = $('.fc-button-group');
    var active = btnGroup.find('.fc-state-active').text().trim();
    var eventData;
    selectedEvent = event;
    if (active === 'month') {
      $('#addTimeProjectId').val(event.title);
      $('#projectId').val(event.id);
      $('#logStatuses').val(event.status);

      $('#addTimeIterationNo').val(event.iteration);
      $('#addTimeStoryDescription').val(event.story);

      document.getElementById('addTimeStartTime').valueAsNumber = toUTC(new Date(event.start._i));
      document.getElementById('addTimeEndTime').valueAsNumber = toUTC(new Date(event.end._i));
      $('#addTimeDescription').val(event.description);
      modalEl.modal('show');
      var lockStatus = event.locked;
      var lockRequest = event.lockrequest;

      if (lockRequest===0){
        $('#btnUnlock').hide();
      }
      else{
        $('#btnUnlock').show();
        $('#btnUnlock').removeAttr('disabled');
                //$('#btnUnlock').text('Unlock');
                $('#btnUnlock').click(function(){
                 $('#btnUnlock').attr('disabled','disabled');
               })
              }
            }
          },
          timezone: 'local',
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
          },
          defaultDate: new Date(),
          events: function(start, end, timezone, callback) {
            var e1 = end.toISOString();
            var e2 = Date.parse(e1);
            var e3 = new Date(e2);
            var obj = monthStartEnd(e3);
            var str = location.href;
            var idx = str.indexOf('?id=') + 4;
            var id = str.substring(idx);
            obj.userid = id;
            var req = $.ajax({
              url: '/getUserLogs',
              dataType: 'json',
              data: obj
            });
            $('#btnUnlock').click(function() {
              var logid=$('#projectId').val()
              var userid=id;
              var unlock = $.ajax({
                url:'/unlockLog?id='+logid+'&userid='+userid,
                type:'get'
              });
              unlock.done(function(d){   

            //change event color starts here
            el.fullCalendar('removeEvents', [selectedEvent.id]);
            var eventData = {
              title: selectedEvent.title,
              start: selectedEvent.start._d,
              end: selectedEvent.end._d,
              iteration: selectedEvent.iteration,
              story: selectedEvent.story,
              status: selectedEvent.status,
              description: selectedEvent.description,
              id: selectedEvent.id,
              backgroundColor: 'green',
              borderColor : 'green',
              locked: 0,
              lockrequest: 0
            };
            el.fullCalendar('renderEvent', eventData, true);
            el.fullCalendar('unselect');
    //change event color ends here

    modalEl.modal('hide');
    showStatus(d, 'Log unlocked');


  });
              return false;
            });
req.done(function(Events) {
  callback(Events);
});
req.fail(function(e) {
  callback(e);
});
}
};
el.fullCalendar(calObj);
