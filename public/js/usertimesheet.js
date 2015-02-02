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
      $('#storyStatus').val(event.storystatusname);

      $('#addTimeIterationNo').val(event.iteration);
      $('#addTimeStory').val(event.storyname);
      $('#addTimeTask').val(event.taskname);

      document.getElementById('addTimeStartTime').valueAsNumber = toUTC(new Date(event.start._d));
      document.getElementById('addTimeEndTime').valueAsNumber = toUTC(new Date(event.end._d));
      document.getElementById('addTimePlannedStartTime').valueAsNumber = toUTC(new Date(event.plannedstart));
      document.getElementById('addTimePlannedEndTime').valueAsNumber = toUTC(new Date(event.plannedend));

      $('#addTimeDescription').val(event.description);
      modalEl.modal('show');
      var logstatus = event.logstatusid;
      $('#btnUnlock').hide();

      if (logstatus === 3){
        $('#modalHeader').text("Unlock log to edit");
        $('#btnUnlock').show();
        $('#btnUnlock').removeAttr('disabled');
                $('#btnUnlock').click(function(){
                 $('#btnUnlock').attr('disabled','disabled');
               })
      }
      else{
          $('#modalHeader').text("Log Details");
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
              var projectdetails={
                  id        : $('#projectId').val(),
                  userid    : id,
                  startdate : selectedEvent.start._d,
                  status    : 4 };
              var unlock = $.ajax({
                url: '/unlockLog',
                type: 'get',
                contentType: 'application/json',
                data: projectdetails
              });
              unlock.done(function(d){
                      //change event color starts here
                      el.fullCalendar('removeEvents', [selectedEvent.id]);
                      var eventData = {
                        title: selectedEvent.title,
                        start: selectedEvent.start._d,
                        end: selectedEvent.end._d,
                        plannedstart: selectedEvent.plannedstart,
                        plannedend: selectedEvent.plannedend,
                        iteration: selectedEvent.iteration,

                        storystatusname: selectedEvent.storystatusname,
                        storyname: selectedEvent.storyname,
                        taskname: selectedEvent.taskname,
                        description: selectedEvent.description,
                        id: selectedEvent.id,
                        className : 'log-unlocked'
                      };
                      el.fullCalendar('renderEvent', eventData, true);
                      el.fullCalendar('unselect');
                      //change event color ends here

                      modalEl.modal('hide');
                      showStatus(d, 'Log unlocked');
            });
              return false;
            });
            req.done(function(events) {
              for (var i = 0; i < events.length; i++) {
                      if (events[i].logstatusid === 1) {
                          events[i].start = events[i].plannedstart;
                          events[i].end = events[i].plannedend;
                      }
                      events[i].className = getClassName(events[i].logstatusid);
                    }
              callback(events);
            });
            req.fail(function(e) {
              callback(e);
            });
  }
  };
el.fullCalendar(calObj);

function getClassName(logstatusid){  
  switch(logstatusid){
    case 1:
    return "log-planned";
    break;
    case 2: 
    return "";
    break;
    case 3:
    return "log-unlockrequest";  
    break;
    case 4:
    return "log-unlocked";
    break;
  }
}
