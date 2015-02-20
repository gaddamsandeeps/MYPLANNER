var app = angular.module('resourceTracking', ['resourceTracking.directives']);

var storyUpdateMode = false;
var subtaskUpdateMode = false;
var synchedStoryId = "";

$("#storyType").change(function() {
    $("#storyHours").val('');
    if ($("#storyType").val() === '2') {
        $("#storyHoursContainer").show();
    } else {
        $("#storyHoursContainer").hide();
    }
});

app.controller('StoryEntryController', function($scope, $http, $rootScope) {

    //Initial datatable with empty data
    renderDataTable();

    //Initial selection value
    $scope.projectId = "0";
    $scope.iterationId = "0";

    $scope.getStories = function() {
        getStories($scope.projectId, $scope.iterationId, renderDataTable, true);

    };

    $scope.addStory = function() {
        $('#iteratedrop').removeClass('nodisplay');
        $('#iteratetext').addClass('nodisplay');
        $('#storyHoursContainer').hide();
        $('#addStoryForm')[0].reset();
        $('#errorContainer').empty();
        $("#storyType").removeAttr("disabled");
        $("#iteration").val($("#selectedIteration option:selected").val())
        $('#addStoryForm .modal-header-title').text("Add story to " + $("#projects option:selected").text());
        $('#storyModal').modal('show');
    };
});

app.controller('storyController', function($scope, $http, $rootScope) {
    $scope.saveStory = function() {
        var storyUrl;
        var eventObj = {
            "projectid": $("#projects option:selected").val(),
            "type": $("#storyType option:selected").val(),
            "name": $('#storyName').val(),
            "description": $.trim($('#storyDescription').val()),
            "hours": $('#storyHours').val()
        };

        eventObj.hours = (eventObj.type == 1) ? null : eventObj.hours;
        eventObj.status = (parseInt(eventObj.type) === 2) ? 1 : null;

        if (storyUpdateMode) {
            storyUrl = "/editStory";
            eventObj.id = synchedStoryId;


        } else {
            eventObj.iterationid = $("#iteration option:selected").val();
            storyUrl = "/saveStory";
        }

        if (validateStoryForm()) {
            $http({
                    url: storyUrl,
                    method: 'POST',
                    data: eventObj
                })
                .success(function(resp) {
                    showStatus(resp, 'Story ' + eventObj.name + ' added to ' + ($("#projects option:selected").text()));
                    $('#addStoryForm')[0].reset();
                    $('#storyModal').modal('hide');


                    if (storyUpdateMode) {

                        $('#' + eventObj.id).find('td').eq(2).text(resp.data.name);
                        $('#' + eventObj.id).find('td').eq(4).text(resp.data.description.substring(0, 15) + '...');
                        if (resp.data.storytypeid === 2) {
                            $('#' + eventObj.id).find('td').eq(5).text(resp.data.hours);
                        }

                    } else {
                        /*var table = $('#storyReportTable').DataTable();
                                          table.row.add([
                                              "" +'.1',
                                              $(eventObj.id).find('td').eq(1).text(resp.data.name) +'.2',
                                              "test" +'.3',
                                              $(eventObj.id).find('td').eq(4).text(resp.data.hours) +'.4',
                                              "" +'.5'
                                          ]);*/
                    }

                    // Reset storyUpdateMode 
                    storyUpdateMode = false;
                    synchedStoryId = "";

                });
        }
    };


});

String.prototype.trunc = String.prototype.trunc ||
    function(n) {
        return this.length > n ? this.substr(0, n - 1) + '&hellip;' : this;
    };


function getStories(projectId, iterationId, callback, taskFlag) {
    var projectId = projectId || "";
    var iterationId = iterationId || "";
    var getStoriesUrl;

    if (projectId > 0) {
        $('#addStory,#addSubtask').show();
        $('.wholereport').show();
    } else {
        //Render empty data table
        renderDataTable([]);
        $('#addStory,#addSubtask').hide();
        return;
    }

    if (taskFlag) {
        getStoriesUrl = "/getStoriesNTasksByPidnIterId";
    } else {
        getStoriesUrl = "/getStories";
    }

    $.ajax({
        url: getStoriesUrl + '?projectid=' + projectId + '&iterationid=' + iterationId,
        type: 'get',
        contentType: 'application/json'
    }).done(function(resp) {
        callback(resp);
    });
}

function getStoriesNTasks() {

}

function getStory(storyId) {
    $('#iteratetext').removeClass('nodisplay');
    $('#iteratedrop').addClass('nodisplay');
    $.ajax({
            url: '/getStory?id=' + storyId,
            type: 'get',
            contentType: 'application/json',
        })
        .success(function(resp) {
            $("#storyName").val(resp.name);
            $("#iterationno").val(resp.iterationname);
            $("#storyDescription").val(resp.description);
            $("#storyStartDate").val(resp.startdate);
            $("#storyHours").val(resp.hours);
            $("#storyType").val(resp.storytypeid);
            $("#storyType").attr("disabled", "disabled");
            if (resp.storytypeid === 1) {
                $("#storyHoursContainer").hide();
            } else {
                $("#storyHoursContainer").show();
            }
            $('#errorContainer').empty();
            $('#addStoryForm .modal-header').text("Edit story in project " + $("#projects option:selected").text());
            $('#saveStory').text("Update");
            $('#storyModal').modal('show');
            //Enable update mode
            storyUpdateMode = true;
            synchedStoryId = resp.id;
        });
};

function storyCompleted(storyId, storyName) {
    $.ajax({
            url: '/storyCompleted?id=' + storyId,
            type: 'post',
            contentType: 'application/json',
        })
        .success(function(resp) {
            showStatus(resp, storyName + ' story status changed to completed  ');
        });
};



function iterationChange() {
    var tid = $(event.target).parent().parent().attr('id');
    var typeid = $('#' + tid).find('td').eq(8).attr('id');
    var statusSelected = $(event.target).val();
    $.ajax({
        url: '/moveToNextIteration?id=' + tid + '&iterationid=' + statusSelected + '&type=' + typeid,
        type: 'post',
        contentType: 'application/json'
    }).done(function(resp) {
        //console.log(resp);
    });
};

function getIterationAsSelectObj(iterationid, iteration) {
    if (!iteration) {
        return;
    }
    var selectedIteration = getIterationAsObj(iterationid, iteration);
    var selects = '<select id="iterationUpdate" onchange="iterationChange()">';
    var ifexist = false;
    var options = '';
    for (var i = 0; i < iterations.length; i++) {
        var selectedObj = '';
        if (iterationid === iterations[i].id) {
            selectedObj = 'selected';
            ifexist = true;
        } else {
            selectedObj = '';
        }
        options += '<option ' + selectedObj + ' value="' + iterations[i].id + '">' + iterations[i].name + '</option>';
    }
    if (!ifexist) {
        selects += '<option selected value=' + iterationid + '>' + iteration + '</option>';
    }
    selects += options;
    selects += '</select>';
    return selects;
};

function getIterationAsObj(iterationid, iteration) {
    for (var i = 0; i < iterations.length; i++) {
        if (iterationid === iterations[i].id) {
            return iterations[i];
        }
    }
}


function changeStatus() {
    var tid = $(event.target).parent().parent().attr('id');
    var typeid = $('#' + tid).find('td').eq(8).attr('id');
    var statusSelected = $(event.target).val();
    if (typeof typeid === 'undefined') {
        typeid = null;
    }
    $.ajax({
        url: '/changeTaskStatus?id=' + tid + '&stateid=' + statusSelected + '&type=' + typeid,
        type: 'post',
        contentType: 'application/json'
    }).done(function(resp) {

    });
};



function getTaskStatusAsSelectObj(id) {
    if (!id) {
        return;
    }
    var selectedTaskStatusObj = getTaskStatusAsObj(id);
    var selects = '<select id="statusUpdate" onchange="changeStatus()">';
    for (var i = 0; i < taskStatus.length; i++) {
        var selectedObj = '';

        if (id === taskStatus[i].id) {
            selectedObj = 'selected';
        }
        if (taskStatus[i].step >= selectedTaskStatusObj.step) {
            selects += '<option ' + selectedObj + ' value="' + taskStatus[i].id + '">' + taskStatus[i].name + '</option>';
        }
    }
    selects += '</select>';
    return selects;
}

function getTaskStatusAsObj(id) {
    for (var i = 0; i < taskStatus.length; i++) {
        if (id === taskStatus[i].id) {
            return taskStatus[i];
        }
    }
}

function addSubTask(storyId, storyName, context) {
    var currentRow = $(context).parent().parent('tr');
    $('#addTaskForm')[0].reset();
    $('#taskErrorContainer').empty();
    $("#subTaskInput").val(storyName);
    $('#addTaskForm .modal-header').text("Add task to story " + storyName).text();
    $('#taskModal').modal('show');

    $("#saveStorySubTask").off().on("click", function() {
        saveSubtask(storyId, storyName, 0, currentRow);
    });
}

function saveSubtask(storyId, storyName, oldTaskHours, currentRow) {

    var eventObj = {
        "storyid": storyId,
        "name": $('#taskName').val(),
        "description": $.trim($('#taskDescription').val()),
        "hours": $('#taskHours').val(),
        "prevTaskHours": 0
    };

    var subTaskUrl = subtaskUpdateMode ? "/editTask" : "/saveTask";

    if (subtaskUpdateMode) {
        eventObj.id = synchedSubTaskId;
        eventObj.prevTaskHours = oldTaskHours;
    }

    if (validateSubtaskForm()) {
        $.ajax({
                url: subTaskUrl,
                type: 'POST',
                data: eventObj
            })
            .success(function(resp) {

                var taskRecordId = resp.data;

                if (subtaskUpdateMode) {
                    showStatus(resp, 'Subtask  ' + eventObj.name + ' updated to ' + storyName);
                    $("#" + eventObj.id).find('td').eq(1).text(eventObj.name);
                    var taskDescription = (eventObj.description != null) ? eventObj.description.substring(0, 15) + '...' : '';
                    $("#" + eventObj.id).find('td').eq(2).text(taskDescription).attr("title", eventObj.description);
                    $("#" + eventObj.id).find('td').eq(3).text(eventObj.hours);
                    var taskEdited = (taskRecordId.editedby != null) ? taskRecordId.editedby : '';
                    $("#" + eventObj.id).find('td').eq(5).text(taskEdited);
                    var prevStoryHours = Number($("#" + storyId).find('td').eq(5).text());
                    var newStoryHours = prevStoryHours - Number(oldTaskHours) + Number(eventObj.hours);
                    $("#" + storyId).find('td').eq(5).text(newStoryHours);

                } else {
                    if ($("#subTaskWrapper_" + storyId).length) {
                        var taskEdited = (taskRecordId.editedby != null) ? taskRecordId.editedby : '';
                        $("#subTaskWrapper_" + storyId).find('tbody').append("<tr><td>" + taskRecordId.id + "</td><td>" + eventObj.name + "</td><td>" + eventObj.description + "</td><td>" + eventObj.hours + "</td><td>" + taskRecordId.createdby + "</td><td>" + taskEdited + "</td><td>" + getTaskStatusAsSelectObj(taskRecordId.status) + "</td><td>" + '<img alt="Edit" src="images/edit.png" onclick="getTask(' + taskRecordId.id + ',' + storyId + ',\'' + storyName + '\')">' + "</td></tr>");
                        var prevStoryHours = Number($("#" + storyId).find('td').eq(5).text());
                        var newStoryHours = prevStoryHours - Number(oldTaskHours) + Number(eventObj.hours);
                        $("#" + storyId).find('td').eq(5).text(newStoryHours);
                        var newtasklength = Number($("#" + storyId).find('td').eq(0).text().substring(7, 8));
                        newtasklength++;
                        $('#' + storyId).find('td').eq(0).html('&nbsp;Tasks(' + newtasklength + ')' + '<i class="fa fa-chevron-down view-task" title="View sub-tasks"></i>');
                    } else {
                        var prevStoryHours = Number(currentRow.find('td').eq(5).text());
                        var prevtasklength = Number(currentRow.find('td').eq(0).text().substring(7, 8));
                        var newStoryHours = prevStoryHours - Number(oldTaskHours) + Number(eventObj.hours);
                        currentRow.find('td').eq(5).text(newStoryHours);
                        prevtasklength++;
                        currentRow.find('td').eq(0).html('&nbsp;Tasks(' + prevtasklength + ')' + '<i class="fa fa-chevron-down view-task" title="View sub-tasks"></i>');
                    }
                    showStatus(resp, 'Subtask  ' + eventObj.name + ' added to ' + storyName);

                }
                $('#addTaskForm')[0].reset();
                $('#taskModal').modal('hide');

                subtaskUpdateMode = false;
                synchedSubTaskId = "";
            });
    }
}

function getTask(taskId, storyId, storyName) {
    var oldTaskHours = $("#" + taskId).find('td').eq(3).text();

    $.ajax({
            url: '/getTask?id=' + taskId,
            type: 'get',
            contentType: 'application/json',
        })
        .success(function(resp) {

            $("#subTaskInput").val(storyName);
            $("#taskName").val(resp.name);
            $("#taskDescription").val(resp.description);
            $("#taskHours").val(resp.hours);
            $('#taskErrorContainer').empty();
            $('#addTaskForm .modal-header').text("Edit task in story " + storyName);
            $('#saveStorySubTask').text("Update");
            $("#subTaskReset").hide();
            $('#taskModal').modal('show');

            $("#saveStorySubTask").off().on("click", function() {
                saveSubtask(storyId, storyName, oldTaskHours);
            });

            //Enable update mode
            subtaskUpdateMode = true;
            synchedSubTaskId = resp.id;
        });
}

function taskCompleted(taskId, taskName, storyName) {


    var oldTaskHours = $("#storysubtask_" + taskId).find('td').eq(3).text();

    $.ajax({
            url: '/taskCompleted?id=' + taskId,
            type: 'post',
            contentType: 'application/json',
        })
        .success(function(resp) {
            showStatus(resp, taskName + ' task of story ' + storyName + ' status changed to completed  ');
        });
}

function moveIteration(taskId, storyId, currentIndex) {

    $.ajax({
            url: '/moveToNextIteration?id=' + taskId + '&storyId=' + storyId,
            type: 'post',
            contentType: 'application/json',
        })
        .success(function(resp) {
            if (resp.message == "success") {
                var table = $('#storyReportTable').DataTable();
                //table.row( $(this).parents('tr') ).remove().draw();
                console.log($(this).parents('td tr'));
                showStatus(resp, resp.name + 'moved to next Iteration');
            }
        });
}


function getTaskData(rowData, rowChildObj, rowObj) {

    $.ajax({
        url: '/getTasks?storyid=' + rowData.id,
        type: 'get',
        contentType: 'application/json'
    }).done(function(resp) {
        var taskString = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;" class="sub-task-wrapper" id="subTaskWrapper_' + rowData.id + '"><tr><th>Task Id</th><th> Task Name</th><th>Task Description</th><th>Hours</th><th>Author</th><th>Updated By</th><th>Status</th><th>Action</th></tr>';
        for (var i = 0; i < resp.length; i++) {
            var taskDescription = (resp[i].description != null) ? resp[i].description.trunc(15) : '';
            var taskeditedBy = (resp[i].editedby != null) ? resp[i].editedby : '';
            taskString = taskString + '<tr id="' + resp[i].id + '"><td>' + resp[i].id + '</td><td>' + resp[i].name + '</td><td>' + taskDescription + '</td><td>' + (resp[i].hours == null ? '' : resp[i].hours) + '</td><td>' + resp[i].createdby + '</td><td>' + taskeditedBy + '</td><td>' + getTaskStatusAsSelectObj(resp[i].status) + '</td><td>' + '<img alt="Edit" src="images/edit.png" onclick="getTask(' + resp[i].id + ',' + rowData.id + ',\'' + rowData.name + '\')"></td></tr>';
        }
        taskString = taskString + '</table>';
        rowChildObj("<div style='text-align:center'>" + taskString + "</div>").show();
        rowObj.addClass("shown");
        rowObj.attr("id", +rowData.id);
    });
}

function renderDataTable(resp) {
    $(".wholereport").show();
    var table = $("#storyReportTable").DataTable({
        "data": resp,
        "fnCreatedRow": function(nRow, source, iDataIndex) {
            $(nRow).attr('id', source.id);
            $('td:eq(8)', nRow).attr("id", source.storytypeid);
        },
        tableTools: {
            "sRowSelect": "single"
        },
        "bDestroy": true,
        "aaSorting": [
            [1, "asc"]
        ],
        "columns": [{
            "data": function(source, type, val) {
                if (source.storytypeid === 1) {
                    var res = '&nbsp;Tasks(' + source.tasklength + ')';
                    if (source.tasklength > 0) {
                        res += '<i class="fa fa-chevron-down view-task" title="View sub-tasks"></i>';
                    }
                    return res;
                } else {
                    return "";
                }

            }
        }, {
            "data": "id"
        }, {
            "data": "name"
        }, {
            "data": function(source, type, val) {
                return getIterationAsSelectObj(source.iterationid, source.iterationname);
            }
        }, {
            "data": function(source, type, val) {
                return (source.description != null) ? source.description.trunc(15) : '';
            }
        }, {
            "data": "hours"
        }, {
            "data": "createdby"
        }, {
            "data": "editedby"
        }, {
            "data": "storytypename"

        }, {
            "data": function(source, type, val) {
                if (source.storytypeid == 1) {
                    return '<i class="fa fa-plus-square add-story-subtask" onclick="addSubTask(' + source.id + ',\'' + source.name + '\',this)" title="Add sub-task"></i>';
                } else {
                    return getTaskStatusAsSelectObj(source.status);
                }
                return "";
            }
        }, {
            "data": function(source, type, val) {
                if ((source.storytypeid == 1 && source.progress == 0 && source.tasks.length > 0) || (source.storytypeid == 2 && source.progress == 0)) {
                    return '<font class="storycompleted">Completed</font>';
                } else {
                    return '<img alt="Edit" title="Edit" src="images/edit.png" onclick="getStory(' + source.id + ')">';
                }
            }
        }]
    });


    $('#storyReportTable tbody').off();
    $('#storyReportTable tbody').on('click', 'td .view-task', function() {
        var tr = $(this).closest('tr');
        var row = table.row(tr);
        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
        } else {
            getTaskData(row.data(), row.child, tr);

        }
    });
}


/****************Error Messages******************/


var iterationErrMsg = "Iteration cannot be empty.";
var storyErrMsg = "Story name cannot be empty.";
var stroyDesErrMsg = "Please provide description for story.";
var hoursErrMsg = "Hours cannot be empty and should contain only numeric values";
var zeroHrsErrMsg = "Task with zero hours cannot be updated.";
var storyTypeErrMsg = "Please select the story type."

var storySelectErrMsg = "Please select the applicable story.";
var taskErrMsg = "Task name cannot be empty.";
var taskDesErrMsg = "Task description cannot be empty.";

function validateStoryForm() {

    if ($('#iteration').val().trim() == "") {
        $('#errorContainer').html(iterationErrMsg);
        return false;
    }

    if ($('#storyName').val().trim() == "") {
        $('#errorContainer').html(storyErrMsg);
        return false;
    }

    if ($('#storyDescription').val().trim() == "") {
        $('#errorContainer').html(stroyDesErrMsg);
        return false;
    }

    if (($("#storyType").val() === '2') && ($('#storyHours').val() == "" || isNaN($('#storyHours').val()))) {
        $('#errorContainer').html(hoursErrMsg);
        return false;
    }

    if ($('#storyType').val() <= 0) {
        $('#errorContainer').html(storyTypeErrMsg);
        return false;
    }
    return true;
}


function validateSubtaskForm() {

    if ($('#projectStory').val() <= 0) {
        $('#taskErrorContainer').html(storySelectErrMsg);
        return false;
    }

    if ($('#taskName').val().trim() == "") {
        $('#taskErrorContainer').html(taskErrMsg);
        return false;
    }

    if ($('#taskDescription').val().trim() == "") {
        $('#taskErrorContainer').html(taskDesErrMsg);
        return false;
    }

    if ($('#taskHours').val() == "" || isNaN($('#taskHours').val())) {
        $('#taskErrorContainer').html(hoursErrMsg);
        return false;
    }
    if (Number($('#taskHours').val()) < 1) {
        $('#taskErrorContainer').html(zeroHrsErrMsg);
        return false;
    }


    return true;
}
