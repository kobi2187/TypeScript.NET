import { TimeSpan } from "./TimeSpan";
import { ClockTime } from "./ClockTime";
import { TimeStamp } from "./TimeStamp";
export class DateTime {
    constructor(value = new Date(), kind = 1 /* Local */) {
        this._kind = kind;
        if (value instanceof DateTime)
            this._value = value.toJsDate();
        else if (value instanceof Date)
            this._value = new Date(value.getTime());
        else
            this._value = value === void 0
                ? new Date()
                : new Date(value);
    }
    toJsDate() {
        return new Date(this._value.getTime()); // return a clone.
    }
    get kind() {
        return this._kind;
    }
    get year() {
        return this._value.getFullYear();
    }
    /**
     * Returns the Gregorian Month (zero indexed).
     * @returns {number}
     */
    get month() {
        return this._value.getMonth();
    }
    /**
     * Returns the month number (1-12).
     * @returns {number}
     */
    get calendarMonth() {
        return this._value.getMonth() + 1;
    }
    get calendar() {
        return {
            year: this.year,
            month: this.calendarMonth,
            day: this.day
        };
    }
    /**
     * Returns the day of the month.  An integer between 1 and 31.
     * @returns {number}
     */
    get day() {
        return this._value.getDate();
    }
    /**
     * Returns the day of the month indexed starting at zero.
     * @returns {number}
     */
    get dayIndex() {
        return this._value.getDate() - 1;
    }
    /**
     * Returns the zero indexed day of the week. (Sunday == 0)
     * @returns {number}
     */
    get dayOfWeek() {
        return this._value.getDay();
    }
    addMilliseconds(ms) {
        ms = ms || 0;
        return new DateTime(this._value.getTime() + ms, this._kind);
    }
    addSeconds(seconds) {
        seconds = seconds || 0;
        return this.addMilliseconds(seconds * 1000 /* Second */);
    }
    addMinutes(minutes) {
        minutes = minutes || 0;
        return this.addMilliseconds(minutes * 60000 /* Minute */);
    }
    addHours(hours) {
        hours = hours || 0;
        return this.addMilliseconds(hours * 3600000 /* Hour */);
    }
    addDays(days) {
        days = days || 0;
        return this.addMilliseconds(days * 86400000 /* Day */);
    }
    addMonths(months) {
        months = months || 0;
        const d = this.toJsDate();
        d.setMonth(d.getMonth() + months);
        return new DateTime(d, this._kind);
    }
    addYears(years) {
        years = years || 0;
        const d = this.toJsDate();
        d.setFullYear(d.getFullYear() + years);
        return new DateTime(d, this._kind);
    }
    /**
     * Receives an ITimeQuantity value and adds based on the total milliseconds.
     * @param {ITimeQuantity} time
     * @returns {DateTime}
     */
    add(time) {
        return this.addMilliseconds(time.getTotalMilliseconds());
    }
    /**
     * Receives an ITimeQuantity value and subtracts based on the total milliseconds.
     * @param {ITimeQuantity} time
     * @returns {DateTime}
     */
    subtract(time) {
        return this.addMilliseconds(-time.getTotalMilliseconds());
    }
    /**
     * Returns a TimeSpan representing the amount of time between two dates.
     * @param previous
     * @returns {TimeSpan}
     */
    timePassedSince(previous) {
        return DateTime.between(previous, this);
    }
    /**
     * Returns a DateTime object for 00:00 of this date.
     */
    get date() {
        const _ = this;
        return new DateTime(new Date(_.year, _.month, _.day), _._kind);
    }
    /**
     * Returns the time of day represented by a ClockTime object.
     * @returns {ClockTime}
     */
    get timeOfDay() {
        const _ = this;
        let t = _._time;
        if (!t) {
            const d = this._value;
            _._time = t = new ClockTime(d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
        }
        return t;
    }
    /**
     * Returns a readonly object which contains all the date and time components.
     */
    toTimeStamp() {
        return TimeStamp.from(this);
    }
    /**
     * Returns the now local time.
     * @returns {DateTime}
     */
    static get now() {
        return new DateTime();
    }
    /**
     * Returns a UTC version of this date if its kind is local.
     * @returns {DateTime}
     */
    get toUniversalTime() {
        const _ = this;
        if (_._kind != 1 /* Local */)
            return new DateTime(_, _._kind);
        const d = _._value;
        return new DateTime(new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()), 2 /* Utc */);
    }
    /**
     * The date component for now.
     * @returns {DateTime}
     */
    static get today() {
        return DateTime.now.date;
    }
    /**
     * Midnight tomorrow.
     * @returns {DateTime}
     */
    static get tomorrow() {
        const today = DateTime.today;
        return today.addDays(1);
    }
    /**
     * Measures the difference between two dates as a TimeSpan.
     * @param first
     * @param last
     */
    static between(first, last) {
        const f = first instanceof DateTime ? first._value : first, l = last instanceof DateTime ? last._value : last;
        return new TimeSpan(l.getTime() - f.getTime());
    }
    /**
     * Calculates if the given year is a leap year using the formula:
     * ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
     * @param year
     * @returns {boolean}
     */
    static isLeapYear(year) {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }
    /**
     * Returns the number of days for the specific year and month.
     * @param year
     * @param month
     * @returns {any}
     */
    static daysInMonth(year, month) {
        // Basically, add 1 month, subtract a day... What's the date?
        return (new Date(year, month + 1, 0)).getDate();
    }
    static from(yearOrDate, month = 0, day = 1) {
        let year;
        if (typeof yearOrDate == "object") {
            day = yearOrDate.day;
            month = yearOrDate.month;
            year = yearOrDate.year;
        }
        else {
            year = yearOrDate;
        }
        return new DateTime(new Date(year, month, day));
    }
    static fromCalendarDate(yearOrDate, month = 1, day = 1) {
        let year;
        if (typeof yearOrDate == "object") {
            day = yearOrDate.day;
            month = yearOrDate.month;
            year = yearOrDate.year;
        }
        else {
            year = yearOrDate;
        }
        return new DateTime(new Date(year, month - 1, day));
    }
}
Object.freeze(DateTime);
export default DateTime;
//# sourceMappingURL=DateTime.js.map