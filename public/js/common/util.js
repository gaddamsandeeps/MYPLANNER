function monthStartEnd(d) {
    var y = d.getFullYear();
    var m = d.getMonth();
    var f = new Date(y, m - 1, 1);
    var l = new Date(y, m, 0);
    return {
        startdate: y + '-' + m + '-' + f.getDate(),
        enddate: y + '-' + m + '-' + l.getDate()
    };
}

function toUTC(x) {
    return Date.UTC(x.getFullYear(), x.getMonth(), x.getDate(), x.getHours(), x.getMinutes(), x.getSeconds());
}

function sameDates(sl) {    
    var st = new Date( document.getElementById('addTimeStartTime').value );
    var et = new Date( document.getElementById('addTimeEndTime').value );
    console.log(sl);
    console.log(st);
    console.log(et);
    var d = (sl.getDate() === st.getDate())  && (sl.getDate() === et.getDate());
    var m = (sl.getMonth() === st.getMonth())  && (sl.getMonth() === et.getMonth());
    var y = (sl.getFullYear() === st.getFullYear())  && (sl.getFullYear() === et.getFullYear());
    if(d && m && y){
        return true;
    }else{
        return false;
    }
}

function currentDateStatus(endDate, startDate) {
    var endDate = new Date(endDate);
    var startDate = new Date(startDate);
    var currentDate = new Date();
    var actual = endDate - startDate;
    var tillNow = currentDate - startDate;
    var tilldatepercent = (tillNow / actual) * 100;
    return (tilldatepercent);
}

function todaysDate() {
    var currentDate = new Date();
    return (currentDate);
}

function loghours(logged) {
    var loggedHours = logged;
    var totalhours = 480;
    var loggedpercentage = Math.round((loggedHours / totalhours) * 100);
    return (loggedpercentage > 100) ? 100 : loggedpercentage;
}

function projectloghours(count, logged) {
    var totalhours = count * 480;
    var totalworkedhours = logged;
    var projectlogged = (totalworkedhours / totalhours) * 100;
    return (projectlogged);
}