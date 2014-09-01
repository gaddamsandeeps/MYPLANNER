function calcBusinessDays(dDate1, dDate2) {

    var iWeeks, iDateDiff, iAdjust = 0;
    if (dDate2 < dDate1) return -1;
    var iWeekday1 = dDate1.getDay();
    var iWeekday2 = dDate2.getDay();
    iWeekday1 = (iWeekday1 == 0) ? 7 : iWeekday1;
    iWeekday2 = (iWeekday2 == 0) ? 7 : iWeekday2;
    if ((iWeekday1 > 5) && (iWeekday2 > 5)) iAdjust = 1;
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



function toHrs(mins) {
    var hrs, mins, MINUTE = 60;
    hrs = Math.floor(mins / MINUTE);
    mins = mins - (hrs * MINUTE);
    return hrs + '.' + mins;
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

    if(userId){
    	//user report log ajax cal
    	url = "/getUserReportLogs?startdate=" + $("#reportStartTime").val() + "&enddate=" + $("#reportEndTime").val() + "&userid=" + userId;
    }else{
    	//team report log ajax cal
    	url = "/getReportLogs?startdate=" + $("#reportStartTime").val() + "&enddate=" + $("#reportEndTime").val();
    }

    var userData = $.getValues(url);

    if (userId) {
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
            series: [{
                type: 'pie',
                name: 'share',
                data: [
                    ['<b>Actual Working Hrs</b> : '+totalWorkingHours+' Hrs', totalWorkingHours],

                    ['<b>Worked Hrs</b> : '+userWorkingHours+' Hrs', userWorkingHours]
                ]

            }]
        });
    }

    //end total working hours report
    else {

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
                y: [el.diff] / 60
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
                    return '<b>' + this.point.title + '</b> : ' +  this.point.y + ' Hrs';
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
                    return '<b>' + this.point.title + '</b> : ' +  toHrs(this.point.y) + ' Hrs';
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