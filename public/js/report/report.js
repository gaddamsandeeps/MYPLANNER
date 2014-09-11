function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel, cols) {
	var table = generateTableFromJson(JSONData, ReportTitle, ShowLabel, cols);

    //Generate a file name
    var fileName = "";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
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

function generateTableFromJson(JSONData, ReportTitle, ShowLabel, cols){
	
	
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
 
    //Set Report title in first row or line

	var table= "<table border=0 cellpadding=0 cellspacing=0 style='width: 100%'>";
		table += "<tr style='height: 15.75pt'>";
		table += "<td colspan="+cols+" height=21 width=978 ";
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
			if(i%2 === 0){
        		table += "<td style='text-align:center;font-size: 11.0pt; color: black; font-weight: 400;text-line-through: none; font-family: Calibri;'>";
        	}else{
        		table += "<td style='text-align:center;font-size: 11.0pt; color: black; font-weight: 400;text-line-through: none; font-family: Calibri; background: #DCE6F1;'>";	
        	}
			table += arrData[i][index];
			table += "</td>";
        }
			table += "</tr>";
    }

    if (table == '') {        
        alert("Invalid data");
        return;
    }else{
    	return table;
    }
}

function calcBusinessDays(dDate1, dDate2) {

    var iWeeks, iDateDiff, iAdjust = 0;
    if (dDate2 < dDate1)
        return -1;
    var iWeekday1 = dDate1.getDay();
    var iWeekday2 = dDate2.getDay();
    iWeekday1 = (iWeekday1 == 0) ? 7 : iWeekday1;
    iWeekday2 = (iWeekday2 == 0) ? 7 : iWeekday2;
    if ((iWeekday1 > 5) && (iWeekday2 > 5))
        iAdjust = 1;
    iWeekday1 = (iWeekday1 > 5) ? 5 : iWeekday1;
    iWeekday2 = (iWeekday2 > 5) ? 5 : iWeekday2;

    // calculate differnece in weeks (1000mS * 60sec * 60min * 24hrs * 7 days = 604800000)
    iWeeks = Math.floor((dDate2.getTime() - dDate1.getTime()) / 604800000)
    if (iWeekday1 <= iWeekday2) {
        iDateDiff = (iWeeks * 5) + (iWeekday2 - iWeekday1)
    } else {
        iDateDiff = ((iWeeks + 1) * 5) - (iWeekday1 - iWeekday2)
    }

    iDateDiff -= iAdjust // take into account both days on weekend

    return (iDateDiff + 1) * 8; // add 1 because dates are inclusive
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
        startDate: f.format("yyyy-mm-dd"),
        endDate: l.format("yyyy-mm-dd")
    };
}

$(function() {
    var currentMonthDates = monthStartEnd(new Date());
    $("#reportStartTime").val(currentMonthDates.startDate);
    $("#reportEndTime").val(currentMonthDates.endDate);
    $("#checkReport").trigger("click");
});

//******Leading Zero in minutes******

function lz(mntsnum)
{
    var str = String(mntsnum);
    return (str.length < 2) ? "0" + mntsnum : mntsnum;
}

//******Leading Zero in minutes******
function toHrs(mins) {
    var hrs, mins, MINUTE = 60;
    hrs = Math.floor(mins / MINUTE);
    mins = mins % MINUTE;
    var mns = lz(mins)
    return hrs + '.' + mns;
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}


function DifferenceCounter() {

    var srtngdate = document.getElementById('reportStartTime').valueAsNumber;
    var endngdate = document.getElementById('reportStartTime').valueAsNumber;
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

	$('#txt').val(JSON.stringify(userData));
	var reportTitle= ' logs from '+$("#reportStartTime").val()+' to '+$("#reportEndTime").val();

    if (userId) {
		$("#singleExcelReport").show();	
		
		$('#singleExcelReportTable').dataTable().fnClearTable();
		$('#singleExcelReportTable').dataTable( {
			bDestroy: true,
			"scrollX": true,
			"aaData": JSON.parse(JSON.stringify(userData)),  
			"aoColumns": [
				{ "mDataProp": "id" },
				{ "mDataProp": "title" },
				{ "mDataProp": "description" },
				{ "mDataProp": "start" },
				{ "mDataProp": "end" },
				{ "mDataProp": "diff" },
				{ "mDataProp": "created" },
				{ "mDataProp": "edit" }
			]
		 } );
        var thisData4 = JSON.parse(JSON.stringify(userData));
        var titles4 = [];
        var uniquesData4 = [];
        var index;

        for (var i = 0; i < thisData4.length; i++) {
            index = titles4.indexOf(thisData4[i].title);
            if (index == -1) {
                titles4.push(thisData4[i].title);
                uniquesData4.push(thisData4[i]);
            } else {
                uniquesData4[index].diff += thisData4[i].diff;
            }
        }
        thisData4 = uniquesData4;

        var newData3 = thisData4.map(function(el) {
            return {
                id: el.id,
                title: el.title,
                y: el.diff
            };
        });

        var chart;
        $("#SingleUserReport").show();
        $('.wholereport').remove();
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'SingleUserReport',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Projects Report'
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.point.title + '</b>: ' + toHrs(this.point.y) + ' Hrs';
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        formatter: function() {
                            return '<b>' + this.point.title + '</b>: ' + Math.round(this.percentage) + ' %';
                        }
                    }
                }
            },
            series: [{
                    type: 'pie',
                    name: 'Project share',
                    data: newData3,
                }]
        });


        //end user project report

        //start total working hours report

        var totalWorkingHours = calcBusinessDays(new Date($("#reportStartTime").val()), new Date($("#reportEndTime").val()));

        var total = 0;

        $.each(userData, function() {
            total += this.diff;
        });

        var userWorkingHours = total / 60;
        var userWorkingMnts = toHrs(total);
        var chart;
        $("#workingHoursReport").show();
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'workingHoursReport',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Logs Report'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            series: [{
                    type: 'pie',
                    name: 'share',
                    data: [
                        ['<b>Actual Working Hrs</b> : ' + totalWorkingHours + ' Hrs', totalWorkingHours],
                        ['<b>Worked Hrs</b> : ' + userWorkingMnts + ' Hrs', userWorkingHours]
                    ]

                }]
        });
    }

    //end total working hours report
    else {

			$("#excelReport").show();

			$('#excelReportTable').dataTable().fnClearTable();
			$('#excelReportTable').dataTable( {
				bDestroy: true,
				"scrollX": true,
				"aaData": JSON.parse(JSON.stringify(userData)),  
				"aoColumns": [
					{ "mDataProp": "id" },
					{ "mDataProp": "name" },
					{ "mDataProp": "description" },
					{ "mDataProp": "title" },
					{ "mDataProp": "start" },
					{ "mDataProp": "end" },
					{ "mDataProp": "diff" },
					{ "mDataProp": "created" },
					{ "mDataProp": "edit" }
				]
		 } );
        //first report

        var thisData1 = JSON.parse(JSON.stringify(userData));
        var titles1 = [];

        var uniquesData1 = [];

        for (var i = 0; i < thisData1.length; i++) {
            index = titles1.indexOf(thisData1[i].title);
            if (index == -1) {
                titles1.push(thisData1[i].title);
                uniquesData1.push(thisData1[i]);
            } else {
                uniquesData1[index].diff += thisData1[i].diff;
            }
        }
        thisData1 = uniquesData1;
        var projectData1 = thisData1.map(function(el) {
            return {
                title: el.title,
                y: el.diff
            };
        });
        $('#userReport').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 1, //null,
                plotShadow: false
            },
            title: {
                text: 'Users Report'
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.point.title + '</b> : ' + toHrs(this.point.y) + ' Hrs';
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.title}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                    type: 'pie',
                    name: 'User Working Report',
                    data: projectData1
                }]
        });

        //end first report

        //2nd report    
        var thisData2 = JSON.parse(JSON.stringify(userData));

        var titles2 = [];

        var uniquesData2 = [];

        var index;

        for (var i = 0; i < thisData2.length; i++) {
            index = titles2.indexOf(thisData2[i].name);
            if (index == -1) {
                titles2.push(thisData2[i].name);
                uniquesData2.push(thisData2[i]);
            } else {
                uniquesData2[index].diff += thisData2[i].diff;
            }
        }
        thisData2 = uniquesData2;

        var newData = thisData2.map(function(el) {
            return {
                id: el.id,
                title: el.name,
                y: el.diff
            };
        });

        var chart;
        $("#ProjectReport").show();
        $('.singlereport').remove();
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'ProjectReport',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Projects Report'
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.point.title + '</b> : ' + toHrs(this.point.y) + ' Hrs';
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        formatter: function() {
                            return '<b>' + this.point.title + '</b>: ' + Math.round(this.percentage) + ' %';
                        }
                    }
                }
            },
            series: [{
                    type: 'pie',
                    name: 'Project share',
                    data: newData,
                    events: {
                        click: function(event) {
                            UserProjectShow(event.point.title);
                        }

                    }
                }]
        });

        //end second report

        //third report

        function UserProjectShow(project) {
            var thisData3 = JSON.parse(JSON.stringify(userData));

            var titles3 = [];

            var uniquesData3 = [];

            var index;

            for (var i = 0; i < thisData3.length; i++) {
                if (thisData3[i].name == project) {
                    index = titles3.indexOf(thisData3[i].title);
                    if (index == -1) {
                        titles3.push(thisData3[i].title);
                        uniquesData3.push(thisData3[i]);
                    } else {
                        uniquesData3[index].diff += thisData3[i].diff;
                    }
                }
            }
            thisData3 = uniquesData3;
            var newData = thisData3.map(function(el) {
                return {
                    id: el.id,
                    title: el.name,
                    y: el.diff,
                    user: el.title
                };
            });
            var chart;
            $("#UserProjectReport").show();
            chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'UserProjectReport',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                },
                title: {
                    text: project + " " + 'Project Report'
                },
                tooltip: {
                    formatter: function() {
                        return '<b>' + this.point.user + '</b>: ' + toHrs(this.point.y) + ' Hrs';
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            connectorColor: '#000000',
                            formatter: function() {
                                return '<b>' + this.point.user + '</b>: ' + Math.round(this.percentage) + ' %';
                            },
                        },
                    }
                },
                series: [{
                        type: 'pie',
                        name: 'Project share',
                        data: newData

                    }]
            });
        }
        //end third report    

    }

}
