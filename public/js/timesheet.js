var Projects;
var modalfooter;
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
    $('#addTimeProjectId').html(s);
});
var el = $('#calendar');
var modalEl = $('#AddTimeModal');
var calObj = {
    eventClick: function(event, element) {
        //alert('eventClick');
        var lockStatus = event.locked
        if (lockStatus === 1) {
            $('#AddTimeForm').addClass('lockTimeForm');
            $('.lockTimeForm *').attr({
                'disabled': true
            });
            modalfooter = $('.lockTimeForm .modal-footer').remove();
            $('#lockFormCloseBtn,.close').removeAttr('disabled');
        } else {
            $('.lockTimeForm').append(modalfooter);
            $('.lockTimeForm *').removeAttr('disabled');
            $('#AddTimeForm').removeClass('lockTimeForm');
        }
        var btnGroup = $('.fc-button-group');
        var active = btnGroup.find('.fc-state-active').text().trim();
        var eventData;
        if (active === 'month') {
            $('#modalHeader').text('Locked Time');
            var start = toUTC(new Date(event.start._d));
            var end = toUTC(new Date(event.end._d));
            var i, p, index, len = Projects.length;
            for (i = 0; i < len; i++) {
                p = Projects[i];
                if (p.name === event.title) {
                    index = i;
                    break;
                }
            }
            var select = document.getElementById('addTimeProjectId');
            select.selectedIndex = index;

            var StartTime = document.getElementById('addTimeStartTime')
            StartTime.valueAsNumber = start;

            var EndTime = document.getElementById('addTimeEndTime')
            EndTime.valueAsNumber = end;

            $('#addTimeDescription').val(event.description);
            modalEl.modal('show');
            $('#AddTimeForm').off().submit(function(e) {
                e.preventDefault();
                var o = {
                    projectid: $('#addTimeProjectId').val(),
                    startdate: $('#addTimeStartTime').val(),
                    enddate: $('#addTimeEndTime').val(),
                    description: $('#addTimeDescription').val(),
                    id: event.id
                };
                if (EndTime.valueAsNumber > StartTime.valueAsNumber) {
                    console.log('if');
                    var editLog = $.ajax({
                        url: '/editLog',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(o)
                    });
                    editLog.done(function(d) {
                        el.fullCalendar('removeEvents', [event._id]);
                        modalEl.modal('hide');
                        var index = select.selectedIndex;
                        var val = select.options[index].textContent;
                        var eventData = {
                            title: val,
                            start: o.startdate,
                            end: o.enddate,
                            description: event.description,
                            id: event.id
                        };
                        el.fullCalendar('renderEvent', eventData, true);
                        el.fullCalendar('unselect');
                    });
                    editLog.fail(function(e) {
                        console.log(e);
                    });
                } else {
                    alert('End Time should be Greater than Start Time');
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
    editable: true,
    selectable: true,
    selectHelper: true,
    select: function(start, end) {

        var temp =start._d;
        var day = temp.getDate();

        var selected =   new Date();                 
        selected.setDate(day);
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
                    "startdate": $('#addTimeStartTime').val(),
                    "enddate": $('#addTimeEndTime').val(),
                    "description": $('#addTimeDescription').val()
                };
                var st = new Date(StartTime.valueAsNumber);
                var et = new Date(EndTime.valueAsNumber);
                if (sameDates(new Date(utc_selected)) && EndTime.valueAsNumber > StartTime.valueAsNumber) {                
                    var saveLog = $.ajax({
                        url: '/saveLog',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(o)
                    });
                    saveLog.done(function(d) {
                        modalEl.modal('hide');
                        var select = document.getElementById('addTimeProjectId');
                        var index = select.selectedIndex;
                        var val = select.options[index].textContent;
                        eventData = {
                            title: val,
                            start: o.startdate,
                            end: o.enddate,
                            description: o.description
                        };
                        el.fullCalendar('renderEvent', eventData, true);
                        el.fullCalendar('unselect');
                    });
                    saveLog.fail(function(e) {
                        console.log(e);
                    });
                } else {
                    alert('End Time(Today) should be Greater than Start Time(Today)');
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