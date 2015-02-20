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

        var mdata = [{
            "mData": "id"
        }, {
            "mData": "title"
        }, {
            "mData": "iteration"
        }, {
            "mData": "story"
        }, {
            "mData": "task"
        }, {
            "mData": function(source, type, val) {
                return source.description.trunc(15);
            }
        }, {
            "mData": "plannedstart"
        }, {
            "mData": "plannedend"
        }, {
            "mData": "plannedlogged"
        }, {
            "mData": "start"
        }, {
            "mData": "end"
        }, {
            "mData": "logged"
        }, {
            "mData": "created"
        }, {
            "mData": "edit"
        }];
        getDataTable('#singleExcelReportTable', userData, mdata);


        var projectsData = new Array();

        for (var i in tempDataObj) {
            if (projectsData.hasOwnProperty(tempDataObj[i].title)) {
                projectsData[tempDataObj[i].title] = (tempDataObj[i].logged + projectsData[tempDataObj[i].title]);
            } else {
                projectsData[tempDataObj[i].title] = tempDataObj[i].logged;
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
            total += tempDataObj[i].logged;
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
        var mdata = [{
            "mData": "id"
        }, {
            "mData": "title"
        }, {
            "mData": "iteration"
        }, {
            "mData": "story"
        }, {
            "mData": "task"
        }, {
            "mData": function(source, type, val) {
                return source.description.trunc(15);
            }
        }, {
            "mData": "name"
        }, {
            "mData": "plannedstart"
        }, {
            "mData": "plannedend"
        }, {
            "mData": "plannedlogged"
        }, {
            "mData": "start"
        }, {
            "mData": "end"
        }, {
            "mData": "logged"
        }, {
            "mData": "created"
        }, {
            "mData": "edit"
        }];
        getDataTable('#excelReportTable', userData, mdata);

        //Users report
        var usersData = new Array(),
            usersPlannedData = new Array();

        for (var i in tempDataObj) {
            if (usersData.hasOwnProperty(tempDataObj[i].name)) {
                usersData[tempDataObj[i].name] = (tempDataObj[i].logged + usersData[tempDataObj[i].name]);
            } else {
                usersData[tempDataObj[i].name] = tempDataObj[i].logged;
            }
        }

        for (var i in tempDataObj) {
            if (usersPlannedData.hasOwnProperty(tempDataObj[i].name)) {
                usersPlannedData[tempDataObj[i].name] = (tempDataObj[i].plannedlogged + usersPlannedData[tempDataObj[i].name]);
            } else {
                usersPlannedData[tempDataObj[i].name] = tempDataObj[i].plannedlogged;
            }
        }

        //generates Users Report - Pie Chart
        generateCharts('userReport', 'Users Report', usersData);

        //generates Users Report - Bar Chart
        var barDataUserReport = getBarChartData(usersData, usersPlannedData);
        generateBarCharts('userReportBarChart', 'Users Report', barDataUserReport[0], barDataUserReport[1]);

        //generates Users Report - Line Chart
        var lineDataUserReport = getLineChartData(usersData);
        generateLineCharts('userReportLineChart', 'Users Report', lineDataUserReport[0], lineDataUserReport[1]);

        //generate projects reports
        var projectReportsData = new Array(),
            projectReportsPlannedData = new Array();

        for (var i in tempDataObj) {
            if (projectReportsData.hasOwnProperty(tempDataObj[i].title)) {
                projectReportsData[tempDataObj[i].title] = (tempDataObj[i].logged + projectReportsData[tempDataObj[i].title]);
            } else {
                projectReportsData[tempDataObj[i].title] = tempDataObj[i].logged;
            }
        }

        for (var i in tempDataObj) {
            if (projectReportsPlannedData.hasOwnProperty(tempDataObj[i].title)) {
                projectReportsPlannedData[tempDataObj[i].title] = (tempDataObj[i].plannedlogged + projectReportsPlannedData[tempDataObj[i].title]);
            } else {
                projectReportsPlannedData[tempDataObj[i].title] = tempDataObj[i].plannedlogged;
            }
        }

        //$("#projectReport").show();
        $('.singlereport').remove();

        //generates Projects Report - Pie Chart
        generateCharts('projectReport', 'Projects Report', projectReportsData, true, 'project', tempDataObj);

        //generates Projects Report - Bar Chart
        var barDataProjectReport = getBarChartData(projectReportsData, projectReportsPlannedData);
        generateBarCharts('projectReportBarChart', 'Projects Report', barDataProjectReport[0], barDataProjectReport[1]);

        //generates Projects Report - Line Chart
        var lineDataProjectReport = getLineChartData(projectReportsData);
        generateLineCharts('projectReportLineChart', 'Projects Report', lineDataProjectReport[0], lineDataProjectReport[1]);


        //Iteration reports
        var iterationReportsData = new Array(),
            iterationReportsPlannedData = new Array(),
            iterationData = tempDataObj;

        for (var i in iterationData) {
            if (iterationData[i].iteration === '' || iterationData[i].iteration === null) {
                iterationData[i].iteration = noIteration;
            }
            if (iterationReportsData.hasOwnProperty(iterationData[i].iteration)) {
                iterationReportsData[iterationData[i].iteration] = (iterationData[i].logged + iterationReportsData[iterationData[i].iteration]);
            } else {
                iterationReportsData[iterationData[i].iteration] = iterationData[i].logged;
            }
        }

        for (var i in iterationData) {
            if (iterationData[i].iteration === '' || iterationData[i].iteration === null) {
                iterationData[i].iteration = noIteration;
            }
            if (iterationReportsPlannedData.hasOwnProperty(iterationData[i].iteration)) {
                iterationReportsPlannedData[iterationData[i].iteration] = (iterationData[i].plannedlogged + iterationReportsPlannedData[iterationData[i].iteration]);
            } else {
                iterationReportsPlannedData[iterationData[i].iteration] = iterationData[i].plannedlogged;
            }
        }

        //generates Iteration Reports
        generateCharts('iterationReport', 'Iterations Reports', iterationReportsData, true, 'iteration', tempDataObj);

        //generates Iteration Report - Bar Chart
        var barDataIterationReport = getBarChartData(iterationReportsData, iterationReportsPlannedData);
        generateBarCharts('iterationReportBarChart', 'Iterations Report', barDataIterationReport[0], barDataIterationReport[1]);

        //generates Iteration Report - Line Chart
        var lineDataIterationReport = getLineChartData(iterationReportsData);
        generateLineCharts('iterationReportLineChart', 'Iterations Report', lineDataIterationReport[0], lineDataIterationReport[1]);

        //Story reports
        var storyReportsData = new Array(),
            storyReportsPlannedData = new Array(),
            storyData = tempDataObj;

        for (var i in storyData) {
            if (storyData[i].story === '' || storyData[i].story === null) {
                storyData[i].story = noStory;
            }
            if (storyReportsData.hasOwnProperty(storyData[i].story)) {
                storyReportsData[storyData[i].story] = (storyData[i].logged + storyReportsData[storyData[i].story]);
            } else {
                storyReportsData[storyData[i].story] = storyData[i].logged;
            }
        }

        for (var i in storyData) {
            if (storyData[i].story === '' || storyData[i].story === null) {
                storyData[i].story = noStory;
            }
            if (storyReportsPlannedData.hasOwnProperty(storyData[i].story)) {
                storyReportsPlannedData[storyData[i].story] = (storyData[i].plannedlogged + storyReportsPlannedData[storyData[i].story]);
            } else {
                storyReportsPlannedData[storyData[i].story] = storyData[i].plannedlogged;
            }
        }

        //generates Story Reports
        generateCharts('storyReport', 'Stories Reports', storyReportsData, true, 'story', tempDataObj);

        //generates Iteration Report - Bar Chart
        var barDataStoryReport = getBarChartData(storyReportsData, storyReportsPlannedData);
        generateBarCharts('storyReportBarChart', 'Stories Report', barDataStoryReport[0], barDataStoryReport[1]);

        //generates Iteration Report - Line Chart
        var lineDataStoryReport = getLineChartData(storyReportsData);
        generateLineCharts('storyReportLineChart', 'Stories Report', lineDataStoryReport[0], lineDataStoryReport[1]);
    }
}

function userProjectShow(project, tempDataObj) {
    var projectReportData = new Array();

    for (var i in tempDataObj) {
        if (tempDataObj[i].title === project) {
            if (projectReportData.hasOwnProperty(tempDataObj[i].name)) {
                projectReportData[tempDataObj[i].name] = (tempDataObj[i].logged + projectReportData[tempDataObj[i].name]);
            } else {
                projectReportData[tempDataObj[i].name] = tempDataObj[i].logged;
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
                iterationStoryData[tempDataObj[i].story] = (tempDataObj[i].logged + iterationStoryData[tempDataObj[i].story]);
            } else {
                iterationStoryData[tempDataObj[i].story] = tempDataObj[i].logged;
            }
        }
    }

    $("#iterationStoryReport").show();

    //generates User Project Report
    generateCharts('iterationStoryReport', 'Iteration-' + iteration + " " + ' Stories Report', iterationStoryData, true, 'iterationStory', tempDataObj);
}

function iterationStoryUserReportShow(story, tempDataObj) {
    var iterationStoryUserData = new Array();

    for (var i in tempDataObj) {
        if (tempDataObj[i].story === Number(story) || tempDataObj[i].story === story) {
            if (iterationStoryUserData.hasOwnProperty(tempDataObj[i].name)) {
                iterationStoryUserData[tempDataObj[i].name] = (tempDataObj[i].logged + iterationStoryUserData[tempDataObj[i].name]);
            } else {
                iterationStoryUserData[tempDataObj[i].name] = tempDataObj[i].logged;
            }
        }
    }

    $("#iterationStoryUserReport").show();

    //generates User Project Report
    generateCharts('iterationStoryUserReport', 'Story ' + story + " " + ' Report', iterationStoryUserData);
}

function userStoryShow(story, tempDataObj) {
    var storyData = new Array();

    for (var i in tempDataObj) {
        if (tempDataObj[i].story === story) {
            if (storyData.hasOwnProperty(tempDataObj[i].name)) {
                storyData[tempDataObj[i].name] = (tempDataObj[i].logged + storyData[tempDataObj[i].name]);
            } else {
                storyData[tempDataObj[i].name] = tempDataObj[i].logged;
            }
        }
    }

    $("#individualStoryReport").show();

    //generates User Project Report
    generateCharts('individualStoryReport', 'Story ' + story + " " + ' Report', storyData);
}

function chartObj(obj) {
    return Object.keys(obj).map(function(value, index) {
        return {
            title: value,
            y: obj[value]
        };
    });
}

function getDataTable(id, userData, mdata) {
    $(id).dataTable({
        "sScrollXInner": "150%",
        "bAutoWidth": false,
        bDestroy: true,
        "scrollX": true,
        "aaData": JSON.parse(JSON.stringify(userData)),
        "aoColumns": mdata
    });
}

function getLineChartData(data) {
    var keys = new Array();
    var values = new Array();
    for (var i in data) {
        keys.push(i);
        values.push(parseFloat(toHrs(data[i])));
    }
    return [keys, values];
}

function getBarChartData(actualData, plannedData) {
    //generates Users Report - Bar Chart
    var reportData = new Array();
    var plannedReportData = new Array();
    var size = Object.keys(actualData).length;

    //two dimensional array
    for (i = 0; i < size; i++) {
        reportData[i] = new Array(size);
        plannedReportData[i] = new Array(size);
    }

    var j = 0;
    for (var i in actualData) {
        reportData[j][0] = i;
        reportData[j][1] = parseFloat(toHrs(actualData[i]));
        j++;
    }
    j = 0;
    for (var i in plannedData) {
        plannedReportData[j][0] = i;
        plannedReportData[j][1] = parseFloat(toHrs(plannedData[i]));
        j++;
    }
    return [reportData, plannedReportData];
}

String.prototype.trunc = String.prototype.trunc ||
    function(n) {
        return this.length > n ? this.substr(0, n - 1) + '&hellip;' : this;
    };
