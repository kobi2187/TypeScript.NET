(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports", "./StringKeyDictionary", "../../Exceptions/ArgumentOutOfRangeException", "../Array/Utility", "../../../extends"], function (require, exports) {
    "use strict";
    var StringKeyDictionary_1 = require("./StringKeyDictionary");
    var ArgumentOutOfRangeException_1 = require("../../Exceptions/ArgumentOutOfRangeException");
    var Utility_1 = require("../Array/Utility");
    var extends_1 = require("../../../extends");
    var __extends = extends_1.default;
    var VOID0 = void 0;
    var OrderedStringKeyDictionary = (function (_super) {
        __extends(OrderedStringKeyDictionary, _super);
        function OrderedStringKeyDictionary() {
            var _this = _super.call(this) || this;
            _this._order = [];
            return _this;
        }
        OrderedStringKeyDictionary.prototype.indexOfKey = function (key) {
            var o = this._order;
            return o.length ? o.indexOf(key, 0) : -1;
        };
        OrderedStringKeyDictionary.prototype.getValueByIndex = function (index) {
            var o = this._order;
            return index < o.length ? this.getValue(o[index]) : VOID0;
        };
        OrderedStringKeyDictionary.prototype.setValue = function (key, value, keepIndex) {
            var _ = this;
            var exists = _.indexOfKey(key) != -1;
            if (!exists && (value !== VOID0 || keepIndex))
                _._order.push(key);
            else if (exists && value === VOID0 && !keepIndex)
                Utility_1.remove(_._order, key);
            return _super.prototype.setValue.call(this, key, value);
        };
        OrderedStringKeyDictionary.prototype.setByIndex = function (index, value) {
            var _ = this;
            var order = _._order;
            if (index < 0)
                throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException('index', index, 'Is less than zero.');
            if (index >= order.length)
                throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException('index', index, 'Is greater than the count.');
            return _.setValue(order[index], value);
        };
        OrderedStringKeyDictionary.prototype.importValues = function (values) {
            var _ = this;
            return _.handleUpdate(function () {
                var changed = false;
                for (var i = 0; i < values.length; i++) {
                    if (_.setByIndex(i, values[i]))
                        changed = true;
                }
                return changed;
            });
        };
        OrderedStringKeyDictionary.prototype.setValues = function () {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i - 0] = arguments[_i];
            }
            return this.importValues(values);
        };
        OrderedStringKeyDictionary.prototype.removeByIndex = function (index) {
            return this.setByIndex(index, VOID0);
        };
        OrderedStringKeyDictionary.prototype.getKeys = function () {
            var _ = this;
            var o = _._order;
            return o.length && o.filter(function (key) { return _.containsKey(key); }) || [];
        };
        return OrderedStringKeyDictionary;
    }(StringKeyDictionary_1.StringKeyDictionary));
    exports.OrderedStringKeyDictionary = OrderedStringKeyDictionary;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = OrderedStringKeyDictionary;
});
//# sourceMappingURL=OrderedStringKeyDictionary.js.map