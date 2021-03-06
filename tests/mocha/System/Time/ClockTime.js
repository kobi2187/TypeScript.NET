"use strict";
///<reference types="node"/>
var assert = require("assert");
require("mocha");
var ClockTime_1 = require("../../../../dist/commonjs/System/Time/ClockTime");
var Integer_1 = require("../../../../dist/commonjs/System/Integer");
var days = Integer_1.default.random(365), hour = Integer_1.default.random(24), minute = Integer_1.default.random(60), second = Integer_1.default.random(60), millisecond = Integer_1.default.random(1000);
var c1 = new ClockTime_1.default(hour, minute, second, millisecond);
var c2 = new ClockTime_1.default(days * 86400000 /* Day */
    + hour * 3600000 /* Hour */
    + minute * 60000 /* Minute */
    + second * 1000 /* Second */
    + millisecond);
describe(".", function () {
    it('should match constructor values', function () {
        assert.equal(c1.hour, hour);
        assert.equal(c1.minute, minute);
        assert.equal(c1.second, second);
        assert.equal(c1.millisecond, millisecond);
    });
    it('should match summed values', function () {
        assert.equal(c2.days, days);
        assert.equal(c2.hour, hour);
        assert.equal(c2.minute, minute);
        assert.equal(c2.second, second);
        assert.equal(c2.millisecond, millisecond);
    });
});
//# sourceMappingURL=ClockTime.js.map