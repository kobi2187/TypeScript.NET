/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
var _BOOLEAN = typeof true, _NUMBER = typeof 0, _STRING = typeof "", _OBJECT = typeof {}, _NULL = typeof null, _UNDEFINED = typeof undefined, _FUNCTION = typeof function () { };
var typeInfoRegistry = {};
var TypeInfo = (function () {
    function TypeInfo(target) {
        var _ = this;
        _.isBoolean = false;
        _.isNumber = false;
        _.isString = false;
        _.isTrueNaN = false;
        _.isObject = false;
        _.isFunction = false;
        _.isUndefined = false;
        _.isNull = false;
        switch (_.type = typeof target) {
            case _BOOLEAN:
                _.isBoolean = true;
                break;
            case _NUMBER:
                _.isNumber = true;
                _.isTrueNaN = isNaN(target);
                _.isFinite = isFinite(target);
                _.isValidNumber = !_.isTrueNaN;
                break;
            case _STRING:
                _.isString = true;
                break;
            case _OBJECT:
                _.target = target;
                _.isObject = true;
                break;
            case _FUNCTION:
                _.target = target;
                _.isString = true;
                break;
            case _UNDEFINED:
                _.isUndefined = true;
                _.isNullOrUndefined = true;
                break;
            case _NULL:
                _.isNull = true;
                _.isNullOrUndefined = true;
                break;
        }
        Object.freeze(_);
    }
    TypeInfo.prototype.member = function (name) {
        var t = this.target;
        return TypeInfo.getFor(t && name in t
            ? t[name]
            : undefined);
    };
    TypeInfo.getFor = function (target) {
        var type = typeof target;
        switch (type) {
            case _OBJECT:
            case _FUNCTION:
                return new TypeInfo(target);
        }
        var info = typeInfoRegistry[type];
        if (!info)
            typeInfoRegistry[type] = info = new TypeInfo(target);
        return info;
    };
    return TypeInfo;
})();
exports.TypeInfo = TypeInfo;
var Type;
(function (Type) {
    Type.BOOLEAN = _BOOLEAN;
    Type.NUMBER = _NUMBER;
    Type.STRING = _STRING;
    Type.OBJECT = _OBJECT;
    Type.NULL = _NULL;
    Type.UNDEFINED = _UNDEFINED;
    Type.FUNCTION = _FUNCTION;
    function isBoolean(value) {
        return typeof value === _BOOLEAN;
    }
    Type.isBoolean = isBoolean;
    function isNumber(value, allowNaN) {
        if (allowNaN === void 0) { allowNaN = true; }
        return typeof value === _NUMBER && (allowNaN || !isNaN(value));
    }
    Type.isNumber = isNumber;
    function isTrueNaN(value) {
        return typeof value === _NUMBER && isNaN(value);
    }
    Type.isTrueNaN = isTrueNaN;
    function isString(value) {
        return typeof value === _STRING;
    }
    Type.isString = isString;
    function isFunction(value) {
        return typeof value === _FUNCTION;
    }
    Type.isFunction = isFunction;
    function isObject(value) {
        return typeof value === _OBJECT;
    }
    Type.isObject = isObject;
    function numberOrNaN(value) {
        return isNaN(value) ? NaN : value;
    }
    Type.numberOrNaN = numberOrNaN;
    function of(target) {
        return TypeInfo.getFor(target);
    }
    Type.of = of;
})(Type || (Type = {}));
Object.freeze(Type);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Type;
//# sourceMappingURL=Types.js.map