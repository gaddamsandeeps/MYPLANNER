var el = $('#calendar');
var modalEl = $('#AddTimeModal');
var calObj = {
    eventClick: function(event, element) {
        console.log('show Log');
        var btnGroup = $('.fc-button-group');
        var active = btnGroup.find('.fc-state-active').text().trim();
        var eventData;
        if (active === 'month') {
            $('#addTimeProjectId').val(event.title);
            $('#projectId').val(event.id);
            document.getElementById('addTimeStartTime').valueAsNumber = toUTC(new Date(event.start._i));
            document.getElementById('addTimeEndTime').valueAsNumber = toUTC(new Date(event.end._i));
            $('#addTimeDescription').val(event.description);
            modalEl.modal('show');
            var lockStatus = event.locked;
            if (lockStatus===0){
                $('#btnUnlock').text('Unlocked');
            }
            else{
                $('#btnUnlock').text('Unlock');
                $('#btnUnlock').click(function(){
                    $(this).text('Unlocked');
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
            $.ajax({
                url:'/unlockLog?id='+logid+'&userid='+userid,
                type:'get'
            })
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
