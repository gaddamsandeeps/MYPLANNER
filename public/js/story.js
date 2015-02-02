var app = angular.module('resourceTracking', ['resourceTracking.directives']);

var storyUpdateMode = false;
var subtaskUpdateMode = false;
var synchedStoryId = "";

$( "#storyType" ).change(function () {  
    $("#storyHours").val('');  
    if($( "#storyType" ).val() === '2'){
        $("#storyHoursContainer").show();
    }else{
        $("#storyHoursContainer").hide();
    }
});

app.controller('StoryEntryController', function($scope, $http, $rootScope) {

    //Initial datatable with empty data
    renderDataTable();

    //Initial selection value
    $scope.projectId = "0";

    $scope.getStories = function() {
        getStories($scope.projectId, renderDataTable, true);

    };

    $scope.addStory = function() {
        $('#storyHoursContainer').hide();
        $('#addStoryForm')[0].reset();
        $('#errorContainer').empty();
        $("#storyType").removeAttr("disabled");
                    
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

        eventObj.hours = Boolean(eventObj.hours)? eventObj.hours:0;        

         if(storyUpdateMode){
            storyUrl = "/editStory";
            eventObj.id = synchedStoryId;

              }else{
            storyUrl = "/saveStory";    
              }

    if(validateStoryForm()){
                $http({
                    url: storyUrl,
                    method: 'POST',
                    data: eventObj
                })
                .success(function(resp) {
                    showStatus(resp, 'Story ' + eventObj.name + ' added to ' + ($("#projects option:selected").text()));
                    $('#addStoryForm')[0].reset();
                    $('#storyModal').modal('hide');

                    if(!storyUpdateMode){
                    getStories(eventObj.projectid, renderDataTable, true);
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


function getStories(projectId, callback, taskFlag) {
    var projectId = projectId || "";
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

    if(taskFlag){
            getStoriesUrl = "/getStoriesNTasks";
    }else{
            getStoriesUrl = "/getStories";
    }

    $.ajax({
        url: getStoriesUrl+'?projectid=' + projectId,
        type: 'get',
        contentType: 'application/json'
    }).done(function(resp) {
        callback(resp);
    });
}

function getStory(storyId) {
          $.ajax({
            url: '/getStory?id=' + storyId,
            type: 'get',
            contentType: 'application/json',
             })
            .success(function(resp) {                
                $("#storyName").val(resp.name);
                $("#storyDescription").val(resp.description);
                $("#storyStartDate").val(resp.startdate);    
                $("#storyHours").val(resp.hours);
                $("#storyType").val(resp.type);
                $("#storyType").attr("disabled","disabled");
                if(resp.type === 1){
                    $("#storyHoursContainer").hide();
                }else{
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




function addSubTask(storyId, storyName, context) {      
    var currentRow = $(context).parent().parent('tr');
    $('#addTaskForm')[0].reset();
    $('#taskErrorContainer').empty();
    $("#subTaskInput").val(storyName);
    $('#taskModal').modal('show');
    
    $("#saveStorySubTask").off().on("click",function(){
        saveSubtask(storyId, storyName, 0, currentRow);
    });


}

function saveSubtask(storyId, storyName,oldTaskHours, currentRow){

          var eventObj = {
            "storyid": storyId,
            "name": $('#taskName').val(),
            "description": $.trim($('#taskDescription').val()),
            "hours": $('#taskHours').val(),
            "prevTaskHours" : 0
        };        

        var subTaskUrl = subtaskUpdateMode? "/editTask" : "/saveTask";

        if(subtaskUpdateMode){
           eventObj.id = synchedSubTaskId;
           eventObj.prevTaskHours = oldTaskHours; 
        }

        if(validateSubtaskForm()){
             $.ajax({
            url: subTaskUrl,
            type: 'POST',
            data: eventObj
             })
            .success(function(resp) {
                
                var taskRecordId = resp.data;

                if(subtaskUpdateMode){
                    showStatus(resp, 'Subtask  ' + eventObj.name + ' updated to ' + storyName);
                    $("#storysubtask_"+eventObj.id).find('td').eq(1).text(eventObj.name);
                    var taskDescription = (eventObj.description != null)?eventObj.description.trunc(15):'';
                    $("#storysubtask_"+eventObj.id).find('td').eq(2).text(taskDescription).attr("title",eventObj.description);
                    $("#storysubtask_"+eventObj.id).find('td').eq(3).text(eventObj.hours);

                      var prevStoryHours = Number($("#storyRow_"+storyId).find('td').eq(3).text());  
                    var newStoryHours = prevStoryHours-Number(oldTaskHours)+Number(eventObj.hours);
                    $("#storyRow_"+storyId).find('td').eq(3).text(newStoryHours);


                }else{
                    if($("#subTaskWrapper_"+storyId).length){
                         $("#subTaskWrapper_"+storyId).find('tbody').append("<tr><td>"+taskRecordId+"</td><td>"+eventObj.name+"</td><td>"+eventObj.description+"</td><td>"+eventObj.hours+"</td><td></td><td><img onclick='getTask("+taskRecordId+","+storyId+",\""+storyName+"\")' src='images/edit.png' alt='Edit'></td></tr>");
                    
                          var prevStoryHours = Number($("#storyRow_"+storyId).find('td').eq(3).text());  
                          var newStoryHours = prevStoryHours-Number(oldTaskHours)+Number(eventObj.hours);
                          $("#storyRow_"+storyId).find('td').eq(3).text(newStoryHours);

                    }
                    else{
                        var prevStoryHours = Number(currentRow.find('td').eq(3).text());  
                        var newStoryHours = prevStoryHours-Number(oldTaskHours)+Number(eventObj.hours);                  
                        currentRow.find('td').eq(3).text(newStoryHours);
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
          

            var oldTaskHours = $("#storysubtask_"+taskId).find('td').eq(3).text();

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
                
                 $("#saveStorySubTask").off().on("click",function(){
                     saveSubtask(storyId, storyName,oldTaskHours);
                });



                //Enable update mode
                subtaskUpdateMode = true;
                synchedSubTaskId = resp.id;
 });
}




function getTaskData ( rowData, rowChildObj, rowObj ) {   
        
      $.ajax({
        url: '/getTasks?storyid=' + rowData.id,
        type: 'get',
        contentType: 'application/json'
    }).done(function(resp) {
        var taskString ='<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;" class="sub-task-wrapper" id="subTaskWrapper_'+rowData.id+'"><tr><th>Task Id</th><th> Task Name</th><th>Task Description</th><th>Hours</th><th>Created By</th><th>Edit</th></tr>';
        for(var i=0; i<resp.length; i++){            
            var taskDescription = (resp[i].description != null)?resp[i].description.trunc(15):'';
            taskString = taskString + '<tr id="storysubtask_'+resp[i].id+'"><td>'+resp[i].id+'</td><td>'+resp[i].name+'</td><td>'+taskDescription+'</td><td>'+(resp[i].hours == null?'':resp[i].hours)+'</td><td>'+resp[i].createdby+'</td><td><img alt="Edit" src="images/edit.png" onclick="getTask('+resp[i].id+','+rowData.id+',\''+rowData.name+'\')"></td></tr>';
       }
       taskString = taskString + '</table>';        

        rowChildObj("<div style='text-align:center'>"+taskString+"</div>").show();
        rowObj.addClass("shown");
        rowObj.attr("id", "storyRow_"+rowData.id);
    });
}
 
function renderDataTable(resp){    

    $(".wholereport").show();
    var table = $("#storyReportTable").DataTable(
    {
    "data" : resp,
    "bDestroy":true,
    "columns":[
        { "data": "id" },
        { "data": "name" },
        { "data": function ( source, type, val ) {return (source.description != null)?source.description.trunc(15):'';}},
        { "data": "hours" },
        { "data": "createdby" },
        { "data": function( source, type, val  ){
                        return '<img alt="Edit" src="images/edit.png" onclick="getStory('+source.id+')">';
                    } },
        {"data" : "storytypename"},
        {"data" : function(source, type, val ){      
            if(source.storytypeid ==1){
                return '<i class="fa fa-chevron-down view-task" title="View sub-tasks"></i><i class="fa fa-plus-square add-story-subtask" onclick="addSubTask('+source.id+',\''+source.name+'\',this)" title="Add sub-task"></i>';
            }
            return "";
        }}
    ]
    }
);


    $('#storyReportTable tbody').off();
    $('#storyReportTable tbody').on('click', 'td .view-task', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
        if ( row.child.isShown() ) {
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            getTaskData(row.data(), row.child, tr);

        }
    } );
} 


/****************Error Messages******************/



var storyErrMsg = "Story name cannot be empty.";
var stroyDesErrMsg = "Please provide description for story.";
var hoursErrMsg = "Hours cannot be empty and should contain only numeric values";
var zeroHrsErrMsg = "Task with zero hours cannot be updated.";
var storyTypeErrMsg = "Please select the story type."

var storySelectErrMsg = "Please select the applicable story.";
var taskErrMsg = "Task name cannot be empty.";
var taskDesErrMsg = "Task description cannot be empty.";

function validateStoryForm() {  
    if ($('#storyName').val().trim()== "") {
        $('#errorContainer').html(storyErrMsg);
        return false;
    }

    if ($('#storyDescription').val().trim()== "") {
        $('#errorContainer').html(stroyDesErrMsg);
        return false;
    }

    if (($( "#storyType" ).val() === '2') && ($('#storyHours').val()== "" || isNaN($('#storyHours').val()))) {
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

    if ($('#projectStory').val() <= 0 ) {
        $('#taskErrorContainer').html(storySelectErrMsg);
        return false;
    }

    if ($('#taskName').val().trim()== "") {
        $('#taskErrorContainer').html(taskErrMsg);
        return false;
    }

    if ($('#taskDescription').val().trim()== "") {
        $('#taskErrorContainer').html(taskDesErrMsg);
        return false;
    }
    
    if ($('#taskHours').val()== "" || isNaN($('#taskHours').val())) {
        $('#taskErrorContainer').html(hoursErrMsg);
        return false;
    } 
     if (Number($('#taskHours').val())< 1){
        $('#taskErrorContainer').html(zeroHrsErrMsg);
        return false;
    } 
    

    return true;
}


