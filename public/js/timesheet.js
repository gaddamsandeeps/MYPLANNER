var Projects, modalfooter, selectedId, selectedEvent,
    projErrMsg = '<LI>Please select project</LI>',
    emptyPlannedDateErrMsg = '<LI>Planned activity dates cannot be empty</LI>',
    emptyActualDateErrMsg = '<LI>Actual activity dates cannot be empty</LI>',
    plannedDatesErrMsg = "<LI>Planned end time should be greater than  planned start time and both should be of same day</LI>",
    actualDatesErrMsg = '<LI>Actual end time should be greater than actual start time and both should be of same day.</LI><LI>Actual and Planned should be of same day.</LI>',
    plannedActualDayErrMsg = '<LI>Planned hours and Actual hours should be of same day.</LI>',
    currentDayValidationErrMsg = "<LI>Actual activity date can not be later than current date.</LI>",
    teamErrMsg = '<LI>Please select employee</LI>',
    iterationNoErrMsg = '<LI>Please enter valid iteration number</LI>',
    storyErrMsg = '<LI>Please select story</LI>',
    taskErrMsg = '<LI>Please select task</LI>',
    statusErrMsg = '<LI>Please select status</LI>';

$(document).on("change", "#resourceType", function() {
    if ($(this).val() === "self") {
        $("#teamMembers").hide().val('');
    } else {
        $("#teamMembers").show();
    }
});


//Clear error msg on reset

$("#resetBtn").on("click", function() {
    $("#errorContainer").empty();
});


$('#unlockRequest').click(function() {
    var projectdetails = {
        id: selectedId,
        startdate: selectedEvent.start._d,
        status: 3
    };
    var unlockreq = $.ajax({
        url: '/unlockLogRequest',
        type: 'get',
        contentType: 'application/json',
        data: projectdetails
    });
    unlockreq.done(function(d) {
        $('#calendar').fullCalendar('removeEvents', [selectedId]);

        var localEventObj = getLocalEventObj(selectedEvent.title, selectedEvent.plannedstart, selectedEvent.plannedend, selectedEvent.start, selectedEvent.end, selectedEvent.id, selectedEvent.logstatusid);

        localEventObj.logstatusid = 3;
        localEventObj.className = getClassName(3);

        $('#calendar').fullCalendar('renderEvent', localEventObj, true);
        $('#calendar').fullCalendar('unselect');
        //change event color ends here

        modalEl.modal('hide');
        showStatus(d, 'Unlock request raised');
    });
});

$('#addTimeProjectId').on('change', function(e) {
    $('#addTimeIterationNo').prop("disabled", false);
    $('#addTimeIterationNo').val('');
    $('#addTimeStory').val('');
    $('#addTimeTask').val('');
});

$('#addTimeIterationNo').on('change', function(e) {
    $('#addTimeStory').prop("disabled", false);

    var iterationId = $(e.currentTarget).val();
    var projectId = $('#addTimeProjectId').val();

    $.ajax({
        url: '/getInCompleteStoriesNTasksByPidnIterId?projectid=' + projectId + '&iterationid=' + iterationId,
        type: 'get',
        contentType: 'application/json',
    }).done(function(resp) {
        var tasklist = $('#addTimeStory');
        tasklist.empty();
        tasklist.append("<option value=''>Select Story</option>");
        for (var i = 0; i < resp.length; i++) {
            tasklist.append($("<option></option>").attr("value", resp[i].id).text(resp[i].name));
        }
    });
});

$('#addTimeStory').on('change', function(e) {
    $('#addTimeTask').prop("disabled", false);
    var storyId = $(e.currentTarget).val();

    if (storyId == "") {
        $("#addTimeTask").parent().parent(".form-group").show();
        return;
    }
    $.ajax({
        url: '/getTasks?storyid=' + storyId,
        type: 'get',
        contentType: 'application/json',
    }).done(function(resp) {

        if (resp.length) {
            $("#addTimeTask").parent().parent(".form-group").show();
            var tasklist = $('#addTimeTask');
            tasklist.empty();
            tasklist.append("<option value=''>Select Task</option>");
            for (var i = 0; i < resp.length; i++) {
                tasklist.append($("<option></option>").attr("value", resp[i].id).text(resp[i].name));
            }
        } else {
            $("#addTimeTask").parent().parent(".form-group").hide();
        }

    });
});

var el = $('#calendar');
var modalEl = $('#AddTimeModal');
var calObj = {


    eventClick: function(event, element) {

        var status = event.logstatusid,
            storyId = event.storyid,
            projectId = event.projectid;
        taskId = event.taskid || "";


        selectedId = event.id;
        selectedEvent = event;


        var modalHeaderText,
            saveLogBtnText;

        var plannedStartDateNode = document.getElementById("addTimePlannedStartTime");
        var plannedEndDateNode = document.getElementById("addTimePlannedEndTime");
        var actualStartDateNode = document.getElementById("addTimeStartTime");
        var actualEndDateNode = document.getElementById("addTimeEndTime");

        plannedStartDateNode.valueAsNumber = toUTC(new Date(event.plannedstart));
        plannedEndDateNode.valueAsNumber = toUTC(new Date(event.plannedend));

        // Common hidden fields
        $("#teamMembersWrapper").hide();
        $('#errorContainer').html('');
        $("#resetBtn").hide();

        // Render story & independent task data of event project.
        getStories(projectId, renderStories, storyId, true);

        if (taskId) {
            $("#addTimeTask").parent().parent(".form-group").show();
            // Render task data of the event story
            getTasks(storyId, renderTasks, taskId);

        } else {
            $("#addTimeTask").parent().parent(".form-group").hide();
        }




        switch (status) {
            case 1:
                // Planned stage
                $('.requestunlock').hide();
                $('.modal-footer').show();

                $("#AddTimeForm *").not('option').prop({
                    'disabled': true
                });

                $("#addTimeStartTime,#addTimeEndTime,.modal-footer *,.modal-header>.close").prop({
                    'disabled': false
                });

                //Settingup current time
                var now = new Date();
                var selected = event.start._d;
                selected.setHours(now.getHours());
                selected.setMinutes(now.getMinutes());

                actualStartDateNode.valueAsNumber = actualEndDateNode.valueAsNumber = toUTC(selected);

                modalHeaderText = "Enter actual hours";
                saveLogBtnText = "Save";

                break;


            case 2:
                // Saved stage

                actualStartDateNode.valueAsNumber = toUTC(new Date(event.start));
                actualEndDateNode.valueAsNumber = toUTC(new Date(event.end));

                // Disable the form
                $("#AddTimeForm *").not('option').prop({
                    'disabled': true
                });

                $(".modal-header>.close").prop({
                    'disabled': false
                });

                $(".modal-footer").hide();
                $('.requestunlock *').prop("disabled", false);
                $(".requestunlock").show();

                modalHeaderText = "Raise unlock to edit";

                break;
            case 3:
                //Unlock raised.
                actualStartDateNode.valueAsNumber = toUTC(new Date(event.start));
                actualEndDateNode.valueAsNumber = toUTC(new Date(event.end));

                $("#AddTimeForm *").prop({
                    'disabled': true
                });

                $(".modal-header>.close").prop({
                    'disabled': false
                });

                $('.requestunlock').hide();
                $('.modal-footer').hide();

                modalHeaderText = "Unlock raised, waiting for approval";
                break;

            case 4:
                // Unlock received
                actualStartDateNode.valueAsNumber = toUTC(new Date(event.start));
                actualEndDateNode.valueAsNumber = toUTC(new Date(event.end));

                // Disable the form
                $('.requestunlock').hide();
                $('.modal-footer').show();

                $("#AddTimeForm *").not('option').prop({
                    'disabled': true
                });

                $("#addTimeStartTime,#addTimeEndTime,#addTimeDescription,.modal-footer *,.modal-header>.close").prop({
                    'disabled': false
                });
                modalHeaderText = "Unlock received. Please submit again";
                saveLogBtnText = "Update"; // to be removed.
        }

        $("#addTimeProjectId").val(event.projectid);
        $("#addTimeIterationNo").val(event.iterationid);
        $("#addTimeStory").val(event.storyid);
        $("#addTimeTask").val(event.task);
        $("#storyStatus").val(event.storystatusid);
        $("#addTimeDescription").val(event.description);
        $('#modalHeader').text(modalHeaderText);
        $('#submitlog').text(saveLogBtnText);

        var btnGroup = $('.fc-button-group');
        var active = btnGroup.find('.fc-state-active').text().trim();
        var eventData;

        // New sync - Updating existing event object.
        if (active === 'month') {
            modalEl.modal('show');
            var eventObj, requestUrl;
            $('#AddTimeForm').off().submit(function(e) {
                e.preventDefault();
                eventObj = {
                    startdate: $('#addTimeStartTime').val(),
                    enddate: $('#addTimeEndTime').val(),
                    description: $("#addTimeDescription").val(),
                    status: 2,
                    id: event.id
                };

                if (status == 1) {
                    requestUrl = "/saveActualLog";
                } else if (status == 4) {
                    requestUrl = "/editLog";
                }

                if (validate(actualStartDateNode, actualEndDateNode, status)) {
                    $('.modal-footer').hide();
                    var requestHandler = $.ajax({
                        url: requestUrl,
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(eventObj)
                    });

                    requestHandler.done(function(d) {
                        $('.modal-footer').hide();
                        showStatus(d, 'Log edited successfully');
                        el.fullCalendar('removeEvents', [event._id]);
                        modalEl.modal('hide');
                        var projTitle = $('#addTimeProjectId option:selected').text();
                        var logstatusid;

                        if (event.logstatusid == 1) {
                            logstatusid = 2;
                        } else if (event.logstatusid == 2) {
                            logstatusid = 3;
                        } else if (event.logstatusid == 3) {
                            logstatusid = 4;
                        } else {
                            logstatusid = 2;
                        }
                        var localEventObj = getLocalEventObj(projTitle, event.plannedstart, event.plannedend, eventObj.startdate, eventObj.enddate, eventObj.id, logstatusid);
                        localEventObj.className = getClassName(logstatusid);

                        el.fullCalendar('renderEvent', localEventObj, true);
                        el.fullCalendar('unselect');

                    });

                    requestHandler.fail(function(e) {
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

        var modalHeaderText, saveLogBtnText, plannedStartDateNode, plannedEndDateNode, timeSheetPointer, teamMemberUserId;

        //Creating event object - Reset filed values
        modalHeaderText = "Plan the time.";
        saveLogBtnText = "Plan";

        $("#AddTimeForm *").prop({
            'disabled': false
        });

        $("#addTimeTask").parent().parent(".form-group").show();

        $("#addTimeStartTime, #addTimeEndTime, #addTimeIterationNo, #addTimeStory, #addTimeTask").prop("disabled", true);

        $(".modal-footer").show();
        $('.requestunlock').hide();

        if ($('#teamMembers').children('option').length > 1) {
            $("#teamMembersWrapper").show();
        }

        $('#errorContainer').html('');
        document.getElementById('AddTimeForm').reset();
        $('#modalHeader').text(modalHeaderText);
        $("#submitlog").text(saveLogBtnText);

        //Inital setup - Planned start time and Planned end time are set with current time

        plannedStartDateNode = document.getElementById("addTimePlannedStartTime");
        plannedEndDateNode = document.getElementById("addTimePlannedEndTime");

        // Setting selected event date.
        var now = new Date();
        var selected = start._d;
        selected.setHours(now.getHours());
        selected.setMinutes(now.getMinutes());

        plannedStartDateNode.valueAsNumber = plannedEndDateNode.valueAsNumber = toUTC(selected);

        timeSheetPointer = $('.fc-button-group').find('.fc-state-active').text().trim();

        if (timeSheetPointer === 'month') {
            modalEl.modal('show');
            $('#AddTimeForm').off().submit(function(e) {
                e.preventDefault();
                // Event object to be synced.
                var o = {
                    "projectid": $('#addTimeProjectId').val(),
                    "iterationno": $('#addTimeIterationNo').val(),
                    "story": $('#addTimeStory').val(),
                    "task": $('#addTimeTask').val(),
                    "storyStatus": $('#storyStatus').val(),
                    "plannedStartDate": $("#addTimePlannedStartTime").val(),
                    "plannedEndDate": $("#addTimePlannedEndTime").val(),
                    "description": $('#addTimeDescription').val(),
                    "status": 1
                };

                teamMemberUserId = $("#teamMembers").val();

                if (($('#resourceType').val() === 'team') && ($('#teamMembers').val() === '')) {
                    $('#errorContainer').html(teamErrMsg);
                    return;
                }

                if (validate(plannedStartDateNode, plannedEndDateNode, 1)) {

                    $('.modal-footer').hide();
                    if (teamMemberUserId) {
                        o.userid = teamMemberUserId;
                    }

                    var saveEventLogHandler = $.ajax({
                        url: '/savePlannedLog',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(o)
                    });

                    saveEventLogHandler.done(function(d) {

                        $('.modal-footer').show();
                        var msg = 'Log saved successfully';

                        if ($('#teamMembers').val() !== '') {
                            msg += ' for ' + ($('#teamMembers option:selected').text());
                        }
                        showStatus(d, msg);
                        modalEl.modal('hide');

                        var projectTitle = $('#addTimeProjectId option:selected').text();

                        // Creating local event object
                        var localEventObj = getLocalEventObj(projectTitle, convertISO(o.plannedStartDate), convertISO(o.plannedEndDate), o.plannedStartDate, o.plannedEndDate, d.data.insertId, 1);
                        localEventObj.className = getClassName(1);

                        if (($('#resourceType').val() !== 'team')) {
                            el.fullCalendar('renderEvent', localEventObj, true);
                            el.fullCalendar('unselect');
                        }
                    });

                    saveEventLogHandler.fail(function(e) {
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
}; //callObj ends here


el.fullCalendar(calObj);

//convert date ex: 2011-10-05T14:48 2011-10-05 02:48 PM 
function convertISO(dte) {
    var dteObj = new Date(dte);

    var dteObjIso = new Date(dteObj.toISOString());
    dteObjIso = new Date(dteObjIso.getTime() + (dteObjIso.getTimezoneOffset() * 60000));

    return dateFormat(dteObjIso, 'yyyy-mm-dd hh:MM TT');
}

//validate log form
function validate(StartTime, EndTime, status) {

    if (!$('#addTimeProjectId').val()) {
        $('#errorContainer').html(projErrMsg);
        return false;
    }

    if (($('#resourceType').val() === 'team') && ($('#teamMembers').val() === '')) {
        $('#errorContainer').html(teamErrMsg);
        return false;
    }
    if (($('#storyStatus').val() != "") && ($('#addTimeIterationNo').val().trim() == "") && ($('#addTimeStory').val() == "")) {
        $('#errorContainer').html(iterationNoErrMsg);
        return false;
    }
    if ($('#addTimeIterationNo').val().trim().length > 0) {
        if (isNaN($('#addTimeIterationNo').val())) {
            $('#errorContainer').html(iterationNoErrMsg);
            return false;
        }
        if ($('#addTimeStory').val() == "") {

            $('#errorContainer').html(storyErrMsg);
            return false;
        } else {
            var subTaskDisplay = $("#addTimeTask").parent().parent(".form-group").css("display");
            if (subTaskDisplay != "none" && $("#addTimeTask").val() == "") {
                $('#errorContainer').html(taskErrMsg);
                return false;
            }


        }

        if ($('#storyStatus').val() === '') {
            $('#errorContainer').html(statusErrMsg);
            return false;
        }
    } else {
        if ($('#addTimeStory').val() > 0) {
            $('#errorContainer').html(iterationNoErrMsg);
            return false;
        }
    }

    if (!StartTime.value || !EndTime.value) {

        if (status = 1) {
            $('#errorContainer').html(emptyPlannedDateErrMsg);
            return false;
        }
    }




    if (!(sameDates(StartTime.value, EndTime.value) && (EndTime.valueAsNumber > StartTime.valueAsNumber))) {
        if (status == 1) {
            $('#errorContainer').html(plannedDatesErrMsg);
        } else {
            $('#errorContainer').html(actualDatesErrMsg);
        }
        return false;
    }

    if (status !== 1) {
        var plannedDay = new Date($("#addTimePlannedStartTime").val()).getUTCDate();
        var actualsDay = new Date($("#addTimeStartTime").val()).getUTCDate();
        if (plannedDay !== actualsDay) {
            $('#errorContainer').html(plannedActualDayErrMsg);
            return false;
        }
    }

    if (status == 1 && $("#addTimeStartTime").val()) {
        var currentDay = new Date().getUTCDate();
        var actualsDay = new Date($("#addTimeStartTime").val()).getUTCDate();
        if (actualsDay > currentDay) {
            $('#errorContainer').html(currentDayValidationErrMsg);
            return false;
        }
    }



    return true;
}



function getLocalEventObj(title, plannedstart, plannedend, start, end, id, logstatusid, statusName) {
    return {
        description: $("#addTimeDescription").val(),
        end: end,
        id: id || null,
        iterationid: $("#addTimeIterationNo").val(),
        plannedstart: plannedstart || null,
        plannedend: plannedend || null,
        projectid: $("#addTimeProjectId").val(),
        start: start,
        logstatusid: logstatusid,
        logstatusname: statusName || null,
        storyid: $("#addTimeStory").val(),
        taskid: $("#addTimeTask").val(),
        storystatusid: $("#storyStatus").val(),
        storyname: null,
        title: title
    }
}

function getClassName(logstatusid) {
    switch (logstatusid) {
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


function getStories(projectId, callback, storyId, taskFlag) {

    if (taskFlag) {
        getStoriesUrl = "/getStoriesNTasks";
    } else {
        getStoriesUrl = "/getStories";
    }

    $.ajax({
        url: getStoriesUrl + '?projectid=' + projectId,
        type: 'get',
        contentType: 'application/json',

    }).done(function(resp) {
        callback(resp);
        $("#addTimeStory").val(storyId);
    });

}

function renderStories(storiesArray) {
    $("#addTimeStory").empty();
    if (storiesArray.length) {
        $("#addTimeStory").append("<option value=''>Select Story</option>");
        for (i = 0; i < storiesArray.length; i++) {
            $("#addTimeStory").append("<option value=" + storiesArray[i].id + ">" + storiesArray[i].name + "</option>");
        }
    }
}


function getTasks(storyId, callback, taskId) {
    $.ajax({
        url: '/getTasks?storyid=' + storyId,
        type: 'get',
        contentType: 'application/json',

    }).done(function(resp) {
        callback(resp);
        $("#addTimeTask").val(taskId);
    });

}

function renderTasks(taskArray) {
    $("#addTimeTask").empty();
    if (taskArray.length) {
        $("#addTimeTask").append("<option value=''>Select Task</option>");
        for (i = 0; i < taskArray.length; i++) {
            $("#addTimeTask").append("<option value=" + taskArray[i].id + ">" + taskArray[i].name + "</option>");
        }
    }
}
