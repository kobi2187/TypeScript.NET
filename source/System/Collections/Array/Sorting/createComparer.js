(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports", "../../../Types", "../../../Compare"], function (require, exports) {
    "use strict";
    var Types_1 = require("../../../Types");
    var Compare_1 = require("../../../Compare");
    function ensureArray(value) {
        return (value) instanceof (Array)
            ? value
            : [value];
    }
    function createComparer(selector, order, equivalentToNaN) {
        if (order === void 0) { order = 1; }
        if (equivalentToNaN === void 0) { equivalentToNaN = NaN; }
        var nanHasEquivalent = !Types_1.Type.isTrueNaN(equivalentToNaN);
        return function (a, b) {
            var aValue = ensureArray(selector(a));
            var bValue = ensureArray(selector(b));
            var len = Math.min(aValue.length, bValue.length);
            var oArray = (order) instanceof (Array) ? order : null;
            for (var i = 0; i < len; i++) {
                var vA = aValue[i], vB = bValue[i];
                var o = oArray
                    ? (i < oArray.length ? oArray[i] : 1)
                    : order;
                if (nanHasEquivalent) {
                    if (Types_1.Type.isTrueNaN(vA))
                        vA = equivalentToNaN;
                    if (Types_1.Type.isTrueNaN(vB))
                        vB = equivalentToNaN;
                }
                var r = Compare_1.compare(vA, vB);
                if (r !== 0)
                    return o * r;
            }
            return 0;
        };
    }
    exports.createComparer = createComparer;
});
//# sourceMappingURL=createComparer.js.map