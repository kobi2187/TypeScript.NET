///<reference types="node"/>
import * as assert from "assert";
import "mocha";
import ClockTime from "../../../../dist/commonjs/System/Time/ClockTime";
import {Milliseconds} from "../../../../dist/commonjs/System/Time/HowMany";
import Integer from "../../../../dist/commonjs/System/Integer";


const
	days        = Integer.random(365),
	hour        = Integer.random(24),
	minute      = Integer.random(60),
	second      = Integer.random(60),
	millisecond = Integer.random(1000);

const c1 = new ClockTime(hour, minute, second, millisecond);
const c2 = new ClockTime(
	days*Milliseconds.Per.Day
	+ hour*Milliseconds.Per.Hour
	+ minute*Milliseconds.Per.Minute
	+ second*Milliseconds.Per.Second
	+ millisecond);
describe(".", ()=>
{
	it('should match constructor values', ()=>
	{
		assert.equal(c1.hour, hour);
		assert.equal(c1.minute, minute);
		assert.equal(c1.second, second);
		assert.equal(c1.millisecond, millisecond);
	});

	it('should match summed values', ()=>
	{
		assert.equal(c2.days, days);
		assert.equal(c2.hour, hour);
		assert.equal(c2.minute, minute);
		assert.equal(c2.second, second);
		assert.equal(c2.millisecond, millisecond);
	});
});