function monthStartEnd(d) {
    var y = d.getFullYear();
    var m = d.getMonth();
    var f = new Date(y, m - 1, 1);
    var l = new Date(y, m, 0);
    return {
        startdate: (1900 + f.getYear()) + '-' + (f.getMonth() + 1) + '-' + f.getDate(),
        enddate: (1900 + l.getYear()) + '-' + (l.getMonth() + 1) + '-' + l.getDate()
    };
}

function toUTC(x) {
    return Date.UTC(x.getFullYear(), x.getMonth(), x.getDate(), x.getHours(), x.getMinutes(), x.getSeconds());
}

function sameDates(st, et) {
    var year = (st.split('-')[0] === et.split('-')[0]);
    var month = (st.split('-')[1] === et.split('-')[1]);
    var day = (st.split('-')[2].substring(0, 2) === et.split('-')[2].substring(0, 2));

    if (day && month && year) {
        return true;
    } else {
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
    return loggedpercentage;
}

function projectloghours(count, logged) {
    count = (count == 0) ? 1 : count;
    var totalhours = count * 480;
    var totalworkedhours = logged;
    var projectlogged = Math.round((totalworkedhours / totalhours) * 100);
    return projectlogged;
}

//code moved from report .js 
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

//******Leading Zero in minutes******

function lz(mntsnum) {
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
