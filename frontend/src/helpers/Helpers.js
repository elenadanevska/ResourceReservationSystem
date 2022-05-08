import slo from "../translations/slo.json";
import en from "../translations/en.json";

export function translate(jsonPath, slovenian) {
    let translationFile = slovenian ? slo : en;
    return eval("translationFile." + jsonPath)
}

export function cmp(a, b, up) {
    if (a > b) return up ? 1 : -1;
    if (a < b) return up ? -1 : 1;
    return 0;
}

export function cutDate(date) {
    return date.slice(0, 10).split('-').reverse().join('/');
}

export function getDateTimeString(date, i) {
    let fromTime = i.split(" ")[0]
    let currentDate = eval(date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
    return currentDate + ' ' + fromTime
}

export function getPrevNextDay(up, date) {
    var prevNextDay = new Date(date);
    if (up) prevNextDay.setDate(date.getDate() + 1);
    else prevNextDay.setDate(date.getDate() - 1);
    return new Date(prevNextDay);
}
