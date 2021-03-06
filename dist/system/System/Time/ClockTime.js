System.register(["./TimeQuantity", "../../extends"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    // Temporary until the full TimeSpanFormat is available.
    function pluralize(value, label) {
        if (Math.abs(value) !== 1)
            label += "s";
        return label;
    }
    var TimeQuantity_1, extends_1, __extends, ClockTime;
    return {
        setters: [
            function (TimeQuantity_1_1) {
                TimeQuantity_1 = TimeQuantity_1_1;
            },
            function (extends_1_1) {
                extends_1 = extends_1_1;
            }
        ],
        execute: function () {
            // noinspection JSUnusedLocalSymbols
            __extends = extends_1.default;
            ClockTime = (function (_super) {
                __extends(ClockTime, _super);
                function ClockTime() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    var _this = _super.call(this, args.length > 1
                        ? ClockTime.millisecondsFromTime(args[0] || 0, args[1] || 0, args.length > 2 && args[2] || 0, args.length > 3 && args[3] || 0)
                        : (args.length > 0 && args[0] || 0)) || this;
                    var ms = Math.abs(_this.getTotalMilliseconds());
                    var msi = Math.floor(ms);
                    _this.tick = (ms - msi) * 10000 /* Millisecond */;
                    _this.days = (msi / 86400000 /* Day */) | 0;
                    msi -= _this.days * 86400000 /* Day */;
                    _this.hour = (msi / 3600000 /* Hour */) | 0;
                    msi -= _this.hour * 3600000 /* Hour */;
                    _this.minute = (msi / 60000 /* Minute */) | 0;
                    msi -= _this.minute * 60000 /* Minute */;
                    _this.second = (msi / 1000 /* Second */) | 0;
                    msi -= _this.second * 1000 /* Second */;
                    _this.millisecond = msi;
                    Object.freeze(_this);
                    return _this;
                }
                // Static version for relative consistency.  Constructor does allow this format.
                ClockTime.from = function (hours, minutes, seconds, milliseconds) {
                    if (seconds === void 0) { seconds = 0; }
                    if (milliseconds === void 0) { milliseconds = 0; }
                    return new ClockTime(hours, minutes, seconds, milliseconds);
                };
                ClockTime.millisecondsFromTime = function (hours, minutes, seconds, milliseconds) {
                    if (seconds === void 0) { seconds = 0; }
                    if (milliseconds === void 0) { milliseconds = 0; }
                    var value = hours;
                    value *= 60 /* Hour */;
                    value += minutes;
                    value *= 60 /* Minute */;
                    value += seconds;
                    value *= 1000 /* Second */;
                    value += milliseconds;
                    return value;
                };
                ClockTime.prototype.toString = function () {
                    /* INSERT CUSTOM FORMATTING CODE HERE */
                    var _ = this;
                    var a = [];
                    if (_.days)
                        a.push(pluralize(_.days, "day"));
                    if (_.hour)
                        a.push(pluralize(_.hour, "hour"));
                    if (_.minute)
                        a.push(pluralize(_.minute, "minute"));
                    if (_.second)
                        a.push(pluralize(_.second, "second"));
                    if (a.length > 1)
                        a.splice(a.length - 1, 0, "and");
                    return a.join(", ").replace(", and, ", " and ");
                };
                return ClockTime;
            }(TimeQuantity_1.TimeQuantity));
            exports_1("ClockTime", ClockTime);
            exports_1("default", ClockTime);
        }
    };
});
//# sourceMappingURL=ClockTime.js.map