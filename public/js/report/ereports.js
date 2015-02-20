var noStory = 'No Story',
    noIteration = 'No Iteration';

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


function getCheckedValues() {
    var checkedValues = $('input:checkbox:checked');
    var query = '';
    $(checkedValues).each(function() {
        query += 'executives=' + this.id + '&';
    });
    return query;
}

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

    var executives = getCheckedValues();

    var url = "/getTeamsReportLogs?" + executives + "startdate=" + $("#reportStartTime").val() + "&enddate=" + $("#reportEndTime").val();



    var userData = $.getValues(url);

    var tempDataObj = JSON.parse(JSON.stringify(userData));


    //Iteration reports
    var iterationReportsData = new Array(),
        iterationReportsPlannedData = new Array(),
        iterationData = tempDataObj;

    for (var i in iterationData) {
        if (iterationData[i].iteration === '' || iterationData[i].iteration === null) {
            iterationData[i].iteration = noIteration;
        }
        if (iterationReportsData.hasOwnProperty(iterationData[i].iteration + '-' + iterationData[i].teamname)) {
            iterationReportsData[iterationData[i].iteration + '-' + iterationData[i].teamname] = (iterationData[i].logged + iterationReportsData[iterationData[i].iteration + '-' + iterationData[i].teamname]);
        } else {
            iterationReportsData[iterationData[i].iteration + '-' + iterationData[i].teamname] = iterationData[i].logged;
        }
    }

    for (var i in iterationData) {
        if (iterationData[i].iteration === '' || iterationData[i].iteration === null) {
            iterationData[i].iteration = noIteration;
        }
        if (iterationReportsPlannedData.hasOwnProperty(iterationData[i].iteration + '-' + iterationData[i].teamname)) {
            iterationReportsPlannedData[iterationData[i].iteration + '-' + iterationData[i].teamname] = (iterationData[i].plannedlogged + iterationReportsPlannedData[iterationData[i].iteration + '-' + iterationData[i].teamname]);
        } else {
            iterationReportsPlannedData[iterationData[i].iteration + '-' + iterationData[i].teamname] = iterationData[i].plannedlogged;
        }
    }

    $(".wholereport").show();
    //generates Iteration Reports
    generateCharts('iterationReport', 'Iterations Reports', iterationReportsData, true, 'iteration', tempDataObj);

    //generates Iteration Report - Bar Chart
    var barDataIterationReport = getBarChartData(iterationReportsData, iterationReportsPlannedData);
    generateBarCharts('iterationReportBarChart', 'Iterations Report', barDataIterationReport[0], barDataIterationReport[1]);

    //generates Iteration Report - Line Chart
    var lineDataIterationReport = getLineChartData(iterationReportsData);
    generateLineCharts('iterationReportLineChart', 'Iterations Report', lineDataIterationReport[0], lineDataIterationReport[1]);

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
