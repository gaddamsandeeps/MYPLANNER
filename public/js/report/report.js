var noStory = 'No Story',
noIteration = 'No Iteration';
function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel, cols) {
    var table = generateTableFromJson(JSONData, ReportTitle, ShowLabel, cols);

    //Generate a file name
    var fileName = "";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");

    //Initialize file format you want csv or xls
    var uri = 'data:application/vnd.ms-excel,' + escape(table);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".xls";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function generateTableFromJson(JSONData, ReportTitle, ShowLabel, cols) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    //Set Report title in first row or line

    var table = "<table border=0 cellpadding=0 cellspacing=0 style='width: 100%'>";
    table += "<tr style='height: 15.75pt'>";
    table += "<td colspan=" + cols + " height=21 width=978 ";
    table += "style='color:white;font-size:12.0pt;font-weight:700;font-family:Bodoni MT Black, serif;text-align:center;background:#4F81BD;'>";
    table += ReportTitle;
    table += "</td>";
    table += "</tr>";

    //add empty line    
    table += "<tr style='height: 15.0pt'> <td  style='height: 15.0pt' colspan='7'></td> </tr>";

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";

        //This loop will extract the label from 1st index of on array
        //add label row
        table += "<tr style='height: 15.0pt'>";
        for (var index in arrData[0]) {
            table += "<td style='text-align:center;font-size: 11.0pt; color: white; font-weight: 700; font-family: Calibri; background: #4F81BD;'>";
            table += index.toUpperCase();
            table += "</td>";
        }
        table += "</tr>";
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";

        //2nd loop will extract each column and convert it in string comma-seprated
        //add label row
        table += "<tr style='height: 15.0pt'>";
        for (var index in arrData[i]) {
            if (i % 2 === 0) {
                table += "<td style='text-align:center;font-size: 11.0pt; color: black; font-weight: 400;text-line-through: none; font-family: Calibri;'>";
            } else {
                table += "<td style='text-align:center;font-size: 11.0pt; color: black; font-weight: 400;text-line-through: none; font-family: Calibri; background: #DCE6F1;'>";
            }            
            table += (arrData[i][index]);
            table += "</td>";
        }
        table += "</tr>";
    }

    if (table == '') {
        alert("Invalid data");
        return;
    } else {
        return table;
    }
}

$.extend({
    getValues: function(url) {
        var result = null;
        $.ajax({
            url: url,
            type: 'get',
            async: false,
            success: function(data) {
                result = data;
            }
        });
        return result;
    }
});

function monthStartEnd(d) {
    var y = d.getFullYear();
    var m = d.getMonth();
    var f = new Date(y, m, 1);
    var l = new Date(y, m + 1, 0);

    return {
        startdate: f.format("yyyy-mm-dd"),
        enddate: l.format("yyyy-mm-dd")
    };
}

$(function() {
    var currentMonthDates = monthStartEnd(new Date());
    $("#reportStartTime").val(currentMonthDates.startdate);
    $("#reportEndTime").val(currentMonthDates.enddate);
    $("#checkReport").trigger("click");
});


function generateReports() {
    var srtngdate = document.getElementById('reportStartTime').valueAsNumber;
    var endngdate = document.getElementById('reportEndTime').valueAsNumber;

    if (srtngdate > endngdate) {
        alert('End Time should be Greater than Start Time');
        return;
    }

    //empty container
    if ($("#userProjectReport")) {
        $("#userProjectReport").html('');
    }
    if ($("#individualStoryReport")) {
        $("#individualStoryReport").html('');
    }

    var totaltime = endngdate - srtngdate;

    var userId = getUrlVars()["id"];
    var url;

    if (userId) {
        //user report log ajax cal
        url = "/getDetailedUserReportLogs?startdate=" + $("#reportStartTime").val() + "&enddate=" + $("#reportEndTime").val() + "&userid=" + userId;
    } else {
        //team report log ajax cal
        url = "/getDetailedReportLogs?startdate=" + $("#reportStartTime").val() + "&enddate=" + $("#reportEndTime").val();
    }

    var userData = $.getValues(url);

    var tempDataObj = JSON.parse(JSON.stringify(userData));

    if (userId) {
        $("#singleExcelReport").show();

        $('#singleExcelReportTable').dataTable().fnClearTable();

        var mdata = [
        { "mData": "id" },
        { "mData": "title" },
        { "mData": "iteration" },
        { "mData": function ( source, type, val ) {return source.story.trunc(10);}},
        { "mData": function ( source, type, val ) {return source.description.trunc(15);}},
        { "mData": "start" },
        { "mData": "end" },
        { "mData": "diff" },
        { "mData": "created" },
        { "mData": "edit" }
        ];
        getDataTable('#singleExcelReportTable', userData, mdata);
        
        
        var projectsData = new Array();

        for (var i in tempDataObj) {
            if (projectsData.hasOwnProperty(tempDataObj[i].title)) {
                projectsData[tempDataObj[i].title] = (tempDataObj[i].diff + projectsData[tempDataObj[i].title]);
            } else {
                projectsData[tempDataObj[i].title] = tempDataObj[i].diff;
            }
        }

        $("#singleUserReport").show();
        $('.wholereport').remove();

        //generates Projects Report
        generateCharts('singleUserReport', 'Projects Report', projectsData);

        //total working hours report
        var totalWorkingMins = calcBusinessDays(new Date($("#reportStartTime").val()), new Date($("#reportEndTime").val())) * 60;

        var total = 0;
        var totalDataObj = new Array();

        for (var i in tempDataObj) {
            total += tempDataObj[i].diff;
        }

        var remainingMins = totalWorkingMins - total;

        totalDataObj['Worked Hrs'] = total;
        totalDataObj['Remaining Hrs'] = remainingMins;

        $("#workingHoursReport").show();
        //generates Logs Report
        generateCharts('workingHoursReport', 'Logs Report', totalDataObj);
    } else { // Team reports end total working hours report
        $("#excelReport").show();
        $('#excelReportTable').dataTable().fnClearTable();
        var mdata = [
        { "mData": "id" },
        { "mData": "name" },
        { "mData": "iteration" },
        { "mData": function ( source, type, val ) {return source.story.trunc(10);}},
        { "mData": function ( source, type, val ) {return source.description.trunc(15);}},
        { "mData": "title" },
        { "mData": "start" },
        { "mData": "end" },
        { "mData": "diff" },
        { "mData": "created" },
        { "mData": "edit" }
        ];
        getDataTable('#excelReportTable', userData, mdata);        

        //Users report
        var usersData = new Array();

        for (var i in tempDataObj) {
            if (usersData.hasOwnProperty(tempDataObj[i].title)) {
                usersData[tempDataObj[i].title] = (tempDataObj[i].diff + usersData[tempDataObj[i].title]);
            } else {
                usersData[tempDataObj[i].title] = tempDataObj[i].diff;
            }
        }

	        //generates Users Report - Pie Chart
			generateCharts('userReport', 'Users Report', usersData);

			//generates Users Report - Bar Chart
			var barChartDataForUserReports = new Array();
			var size = Object.keys(usersData).length;

			//two dimensional array
			for (i=0; i <size; i++)
				barChartDataForUserReports[i]=new Array(size)

			var j = 0;
				for (var i in usersData)
					{
						barChartDataForUserReports[j][0] = i;
						barChartDataForUserReports[j][1] = parseFloat(toHrs(usersData[i]));
						j++;
					} 
			generateBarCharts('userReportBarChart', 'Users Report', barChartDataForUserReports);

			//generates Users Report - Line Chart
			//generates Users Report - Line Chart
			var lineChartKeysForUserReports = new Array();
			var lineChartValuesForUserReports = new Array();
			for (var i in usersData)
				{
					lineChartKeysForUserReports.push(i);            
					lineChartValuesForUserReports.push(parseFloat(toHrs(usersData[i])));        
				} 
			generateLineCharts('userReportLineChart', 'Users Report', lineChartKeysForUserReports, lineChartValuesForUserReports);

        var projectReportsData = new Array();

        for (var i in tempDataObj) {
            if (projectReportsData.hasOwnProperty(tempDataObj[i].name)) {
                projectReportsData[tempDataObj[i].name] = (tempDataObj[i].diff + projectReportsData[tempDataObj[i].name]);
            } else {
                projectReportsData[tempDataObj[i].name] = tempDataObj[i].diff;
            }
        }

        $("#projectReport").show();
        $('.singlereport').remove();

        //generates Projects Report
        generateCharts('projectReport', 'Projects Report', projectReportsData, true, 'project', tempDataObj);

        //Story reports
        var storyReportsData = new Array();        
        var storyData = tempDataObj;

        for (var i in storyData) {
            if(storyData[i].story === ''){
                storyData[i].story = noStory;
            }
            if (storyReportsData.hasOwnProperty(storyData[i].story)) {
                storyReportsData[storyData[i].story] = (storyData[i].diff + storyReportsData[storyData[i].story]);
            } else {
                storyReportsData[storyData[i].story] = storyData[i].diff;
            }
        }

        //generates Story Reports
        generateCharts('storyReport', 'Storys Reports', storyReportsData, true, 'story', tempDataObj);


        //Iteration reports
        var iterationReportsData = new Array();
        var iterationData = tempDataObj;

        for (var i in iterationData) {
            if(iterationData[i].iteration === ''){
                iterationData[i].iteration = noIteration;
            }
            if (iterationReportsData.hasOwnProperty(iterationData[i].iteration)) {
                iterationReportsData[iterationData[i].iteration] = (iterationData[i].diff + iterationReportsData[iterationData[i].iteration]);
            } else {
                iterationReportsData[iterationData[i].iteration] = iterationData[i].diff;
            }
        }

        //generates Story Reports
        generateCharts('iterationReport', 'Iterations Reports', iterationReportsData, true, 'iteration', tempDataObj);
    }
}

function userProjectShow(project, tempDataObj) {
    var projectReportData = new Array();

    for (var i in tempDataObj) {
        if (tempDataObj[i].name === project) {
            if (projectReportData.hasOwnProperty(tempDataObj[i].title)) {
                projectReportData[tempDataObj[i].title] = (tempDataObj[i].diff + projectReportData[tempDataObj[i].title]);
            } else {
                projectReportData[tempDataObj[i].title] = tempDataObj[i].diff;
            }
        }
    }

    $("#userProjectReport").show();

    //generates User Project Report
    generateCharts('userProjectReport', project + " " + 'Project Report', projectReportData);
}

function iterationStoryReportShow(iteration, tempDataObj) {
    var iterationStoryData = new Array();

    for (var i in tempDataObj) {
        if (tempDataObj[i].iteration === Number(iteration) || tempDataObj[i].iteration === iteration) {
            if (iterationStoryData.hasOwnProperty(tempDataObj[i].story)) {
                iterationStoryData[tempDataObj[i].story] = (tempDataObj[i].diff + iterationStoryData[tempDataObj[i].story]);
            } else {
                iterationStoryData[tempDataObj[i].story] = tempDataObj[i].diff;
            }
        }
    }

    $("#iterationStoryReport").show();

    //generates User Project Report
    generateCharts('iterationStoryReport', 'Iteration-'+iteration + " " + ' Stories Report', iterationStoryData, true, 'iterationStory', tempDataObj);
}

function iterationStoryUserReportShow(story, tempDataObj) {
    var iterationStoryUserData = new Array();

    for (var i in tempDataObj) {
        if (tempDataObj[i].story === Number(story) || tempDataObj[i].story === story) {
            if (iterationStoryUserData.hasOwnProperty(tempDataObj[i].title)) {
                iterationStoryUserData[tempDataObj[i].title] = (tempDataObj[i].diff + iterationStoryUserData[tempDataObj[i].title]);
            } else {
                iterationStoryUserData[tempDataObj[i].title] = tempDataObj[i].diff;
            }
        }
    }

    $("#iterationStoryUserReport").show();

    //generates User Project Report
    generateCharts('iterationStoryUserReport', 'Story '+story + " " + ' Report', iterationStoryUserData);
}


function userStoryShow(story, tempDataObj) {
    var storyData = new Array();

    for (var i in tempDataObj) {
        if (tempDataObj[i].story === story) {
            if (storyData.hasOwnProperty(tempDataObj[i].title)) {
                storyData[tempDataObj[i].title] = (tempDataObj[i].diff + storyData[tempDataObj[i].title]);
            } else {
                storyData[tempDataObj[i].title] = tempDataObj[i].diff;
            }
        }
    }

    $("#individualStoryReport").show();

    //generates User Project Report
    generateCharts('individualStoryReport', 'Story '+story + " " + ' Report', storyData);
}

function chartObj(obj) {
    return Object.keys(obj).map(function(value, index) {
        return {
            title: value,
            y: obj[value]
        };
    });
}

function getDataTable(id, userData, mdata){
	$(id).dataTable( {                      
        "sScrollXInner": "150%",            
        "bAutoWidth": false,
        bDestroy: true,
        "scrollX": true,
        "aaData": JSON.parse(JSON.stringify(userData)),  
        "aoColumns": mdata
    });
}

String.prototype.trunc = String.prototype.trunc ||
function(n){
  return this.length>n ? this.substr(0,n-1)+'&hellip;' : this;
};