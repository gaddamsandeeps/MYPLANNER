function generateCharts(target, title, data, events, functionName, userData) {
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: target,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        credits: {
              enabled: false
          },
        title: {
            text: title
        },
        tooltip: {
            formatter: function() {
                return this.percentage.toFixed(2) + ' %';
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
                        return '<b>' + this.point.title + '</b>: ' + toHrs(this.point.y) + ' Hrs';
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Project share',
            data: chartObj(data),
            events: {
                click: function(event) {
                    if (events) {
                        if(functionName == 'iteration'){
                            iterationStoryReportShow(event.point.title, userData);
                        }else if(functionName == 'story'){
                            userStoryShow(event.point.title, userData);
                        }else if(functionName == 'project'){
                            userProjectShow(event.point.title, userData);
                        }
                        else if(functionName == 'iterationStory'){                            
                            iterationStoryUserReportShow(event.point.title, userData);
                        }
						//focus on generated chart
						document.getElementById(target).scrollIntoView();                        
                    }
                }

            }
        }]
    });
}

function generateBarCharts(target, title, data, plannedData) {
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: target,
            type: 'column'
        },
        title: {
            text: title
        },        
        credits: {
              enabled: false
          },
        xAxis: {
            type: 'category',
            max: 6,
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Hours'
            }
        },
        legend: {
            enabled: true
        },
         scrollbar: {
            enabled: true
        },
        tooltip: {
            pointFormat: '{point.series.name} Logged : <b>{point.y:.2f} Hrs</b>'
        },
        series: [{
            name: 'Actual Hours',
            data: data,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                x: 4,
                y: 10,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                    textShadow: '0 0 3px black'
                }
            }
        },
        {
            name: 'Planned Hours',
            data: plannedData,
            color: 'orange',
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                x: 4,
                y: 10,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                    textShadow: '0 0 3px black'
                }
            }
        }]
    });
}

function generateLineCharts(target, title, keys, values) {
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: target,            
            plotBorderWidth: 1,
            zoomType: 'xy'
        },
		title: {
            text: title
        },

        credits: {
              enabled: false
          },
        xAxis: {
            categories: keys
        },
        tooltip: {
            formatter: function() {
                return this.x + ' logged for '+this.y+' Hrs';
            }
        },
        yAxis: {
            type: 'logarithmic',
			title: {
                text: 'Hours'
            }
        },
		legend: {
            enabled: false
        },
        series: [{
            data: values
        }]

    });
}