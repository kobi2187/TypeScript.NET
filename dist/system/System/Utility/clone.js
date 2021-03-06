System.register(["../Types"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function clone(source, depth) {
        if (depth === void 0) { depth = 0; }
        if (depth < 0)
            return source;
        // return primitives as is.
        if (!Types_1.Type.isObject(source))
            return source;
        var result;
        if ((source) instanceof (Array)) {
            result = source.slice();
            if (depth > 0) {
                for (var i = 0; i < result.length; i++) {
                    result[i] = clone(result[i], depth - 1);
                }
            }
        }
        else {
            result = {};
            if (depth > 0)
                for (var k in source) {
                    //noinspection JSUnfilteredForInLoop
                    result[k] = clone(source[k], depth - 1);
                }
        }
        return result;
    }
    var Types_1;
    exports_1("default", clone);
    return {
        setters: [
            function (Types_1_1) {
                Types_1 = Types_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=clone.js.map