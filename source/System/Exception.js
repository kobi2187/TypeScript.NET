(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports"], function (require, exports) {
    "use strict";
    var NAME = 'Exception';
    var Exception = (function () {
        function Exception(message, innerException, beforeSealing) {
            this.message = message;
            var _ = this;
            this.name = _.getName();
            this.data = {};
            if (innerException)
                _.data['innerException'] = innerException;
            if (beforeSealing)
                beforeSealing(_);
            try {
                var stack = eval("new Error()").stack;
                stack = stack
                    && stack
                        .replace(/^Error\n/, '')
                        .replace(/(.|\n)+\s+at new.+/, '')
                    || '';
                this.stack = _.toStringWithoutBrackets() + stack;
            }
            catch (ex) { }
            Object.freeze(_);
        }
        Exception.prototype.getName = function () { return NAME; };
        Exception.prototype.toString = function () {
            return "[" + this.toStringWithoutBrackets() + "]";
        };
        Exception.prototype.toStringWithoutBrackets = function () {
            var _ = this;
            var m = _.message;
            return _.name + (m ? (': ' + m) : '');
        };
        Exception.prototype.dispose = function () {
            var data = this.data;
            for (var k in data) {
                if (data.hasOwnProperty(k))
                    delete data[k];
            }
        };
        return Exception;
    }());
    exports.Exception = Exception;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Exception;
});
//# sourceMappingURL=Exception.js.map