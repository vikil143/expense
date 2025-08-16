export function getFormattedDate(date: Date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + '-' + month + '-' + year;
}
export const normalizeWeekNumber = (date: number) => (date < 0 ? 6 : date);
export const isWeekEnd = (date: number): boolean => date === 0 || date === 6;
export const getWeekNumberOfYear = (date: Date) => {
    let startDate = new Date(date.getFullYear(), 0, 1);
    let days = Math.floor(
        (date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000),
    );
    let weekNumber = Math.ceil(days / 7);
    return weekNumber + 1;
};

export const getWeek = (date: Date) => date.getDay();

export const getDate = (date: Date) => date.getDate();

export const getMonth = (date: Date) => date.getMonth();

export const getFullYear = (date: Date) => date.getFullYear();

export const isBothDateAreMatched = (date1: Date, date2: Date) => {
    if (getFullYear(date1) === getFullYear(date2)) {
        if (getMonth(date1) === getMonth(date2)) {
            if (getDate(date1) === getDate(date2)) {
                return true;
            }
        }
    }
    return false;
};

export const getFirstMonthFirstDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1);
};

export const getLastDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0);
};

export function weekCount(year: number, month_number: number) {
    // month_number is in the range 1..12
    var firstOfMonth = new Date(year, month_number - 1, 1);
    var lastOfMonth = new Date(year, month_number, 0);

    var used = firstOfMonth.getDay() + lastOfMonth.getDate();

    return Math.ceil(used / 7);
}

export const weeksPerMonth = (date: Date) => {
    const lastDate = getLastDate(date).getDate();
    const currentStartWeek = getWeek(date);

    const noOfWeeks = 7;
    return Math.ceil((lastDate + currentStartWeek) / noOfWeeks);
};

export const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
export const FULLMONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
export const WEEKS = ['MON', 'TUE', 'WED', 'THUS', 'FRI', 'SAT', 'SUN'];
export const FULLWEEKS = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];