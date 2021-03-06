(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports", "./SimpleEnumerableBase", "../../../extends"], function (require, exports) {
    "use strict";
    var SimpleEnumerableBase_1 = require("./SimpleEnumerableBase");
    var extends_1 = require("../../../extends");
    var __extends = extends_1.default;
    var IteratorEnumerator = (function (_super) {
        __extends(IteratorEnumerator, _super);
        function IteratorEnumerator(_iterator, _isEndless) {
            var _this = _super.call(this) || this;
            _this._iterator = _iterator;
            _this._isEndless = _isEndless;
            return _this;
        }
        IteratorEnumerator.prototype._canMoveNext = function () {
            return this._iterator != null;
        };
        IteratorEnumerator.prototype.moveNext = function (value) {
            var _ = this;
            var i = _._iterator;
            if (i) {
                var r = arguments.length ? i.next(value) : i.next();
                _._current = r.value;
                if (r.done)
                    _.dispose();
                else
                    return true;
            }
            return false;
        };
        IteratorEnumerator.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._iterator = null;
        };
        IteratorEnumerator.prototype.getIsEndless = function () {
            return Boolean(this._isEndless) && _super.prototype.getIsEndless.call(this);
        };
        return IteratorEnumerator;
    }(SimpleEnumerableBase_1.SimpleEnumerableBase));
    exports.IteratorEnumerator = IteratorEnumerator;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = IteratorEnumerator;
});
//# sourceMappingURL=IteratorEnumerator.js.map