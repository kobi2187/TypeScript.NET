(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports", "../Text/Utility", "../Exceptions/InvalidOperationException", "../Exceptions/ArgumentException", "../Exceptions/ArgumentNullException", "./Enumeration/EnumeratorBase", "../../extends"], function (require, exports) {
    "use strict";
    var Utility_1 = require("../Text/Utility");
    var InvalidOperationException_1 = require("../Exceptions/InvalidOperationException");
    var ArgumentException_1 = require("../Exceptions/ArgumentException");
    var ArgumentNullException_1 = require("../Exceptions/ArgumentNullException");
    var EnumeratorBase_1 = require("./Enumeration/EnumeratorBase");
    var extends_1 = require("../../extends");
    var __extends = extends_1.default;
    var LinkedNodeList = (function () {
        function LinkedNodeList() {
            this._first = null;
            this._last = null;
            this.unsafeCount = 0;
            this._version = 0;
        }
        LinkedNodeList.prototype.assertVersion = function (version) {
            if (version !== this._version)
                throw new InvalidOperationException_1.InvalidOperationException("Collection was modified.");
            return true;
        };
        Object.defineProperty(LinkedNodeList.prototype, "first", {
            get: function () {
                return this._first;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LinkedNodeList.prototype, "last", {
            get: function () {
                return this._last;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LinkedNodeList.prototype, "count", {
            get: function () {
                var next = this._first;
                var i = 0;
                while (next) {
                    i++;
                    next = next.next;
                }
                return i;
            },
            enumerable: true,
            configurable: true
        });
        LinkedNodeList.prototype.forEach = function (action, ignoreVersioning) {
            var _ = this;
            var current = null, next = _.first;
            var version = _._version;
            var index = 0;
            do {
                if (!ignoreVersioning)
                    _.assertVersion(version);
                current = next;
                next = current && current.next;
            } while (current
                && action(current, index++) !== false);
            return index;
        };
        LinkedNodeList.prototype.map = function (selector) {
            if (!selector)
                throw new ArgumentNullException_1.ArgumentNullException('selector');
            var result = [];
            this.forEach(function (node, i) {
                result.push(selector(node, i));
            });
            return result;
        };
        LinkedNodeList.prototype.clear = function () {
            var _ = this;
            var n, cF = 0, cL = 0;
            n = _._first;
            _._first = null;
            while (n) {
                cF++;
                var current = n;
                n = n.next;
                current.next = null;
            }
            n = _._last;
            _._last = null;
            while (n) {
                cL++;
                var current = n;
                n = n.previous;
                current.previous = null;
            }
            if (cF !== cL)
                console.warn('LinkedNodeList: Forward versus reverse count does not match when clearing. Forward: ' + cF + ", Reverse: " + cL);
            _._version++;
            _.unsafeCount = 0;
            return cF;
        };
        LinkedNodeList.prototype.dispose = function () {
            this.clear();
        };
        LinkedNodeList.prototype.contains = function (node) {
            return this.indexOf(node) != -1;
        };
        LinkedNodeList.prototype.getNodeAt = function (index) {
            if (index < 0)
                return null;
            var next = this._first;
            var i = 0;
            while (next && i++ < index) {
                next = next.next || null;
            }
            return next;
        };
        LinkedNodeList.prototype.find = function (condition) {
            var node = null;
            this.forEach(function (n, i) {
                if (condition(n, i)) {
                    node = n;
                    return false;
                }
            });
            return node;
        };
        LinkedNodeList.prototype.indexOf = function (node) {
            if (node && (node.previous || node.next)) {
                var index = 0;
                var c = void 0, n = this._first;
                do {
                    c = n;
                    if (c === node)
                        return index;
                    index++;
                } while ((n = c && c.next));
            }
            return -1;
        };
        LinkedNodeList.prototype.removeFirst = function () {
            return !!this._first && this.removeNode(this._first);
        };
        LinkedNodeList.prototype.removeLast = function () {
            return !!this._last && this.removeNode(this._last);
        };
        LinkedNodeList.prototype.removeNode = function (node) {
            if (node == null)
                throw new ArgumentNullException_1.ArgumentNullException('node');
            var _ = this;
            var prev = node.previous || null, next = node.next || null;
            var a = false, b = false;
            if (prev)
                prev.next = next;
            else if (_._first == node)
                _._first = next;
            else
                a = true;
            if (next)
                next.previous = prev;
            else if (_._last == node)
                _._last = prev;
            else
                b = true;
            if (a !== b) {
                throw new ArgumentException_1.ArgumentException('node', Utility_1.format("Provided node is has no {0} reference but is not the {1} node!", a ? "previous" : "next", a ? "first" : "last"));
            }
            var removed = !a && !b;
            if (removed) {
                _._version++;
                _.unsafeCount--;
                node.previous = null;
                node.next = null;
            }
            return removed;
        };
        LinkedNodeList.prototype.addNode = function (node) {
            this.addNodeAfter(node);
        };
        LinkedNodeList.prototype.addNodeBefore = function (node, before) {
            if (before === void 0) { before = null; }
            assertValidDetached(node);
            var _ = this;
            if (!before) {
                before = _._first;
            }
            if (before) {
                var prev = before.previous;
                node.previous = prev;
                node.next = before;
                before.previous = node;
                if (prev)
                    prev.next = node;
                if (before == _._first)
                    _._first = node;
            }
            else {
                _._first = _._last = node;
            }
            _._version++;
            _.unsafeCount++;
        };
        LinkedNodeList.prototype.addNodeAfter = function (node, after) {
            if (after === void 0) { after = null; }
            assertValidDetached(node);
            var _ = this;
            if (!after) {
                after = _._last;
            }
            if (after) {
                var next = after.next;
                node.next = next;
                node.previous = after;
                after.next = node;
                if (next)
                    next.previous = node;
                if (after == _._last)
                    _._last = node;
            }
            else {
                _._first = _._last = node;
            }
            _._version++;
            _.unsafeCount++;
        };
        LinkedNodeList.prototype.replace = function (node, replacement) {
            if (node == null)
                throw new ArgumentNullException_1.ArgumentNullException('node');
            if (node == replacement)
                return;
            assertValidDetached(replacement, 'replacement');
            var _ = this;
            replacement.previous = node.previous;
            replacement.next = node.next;
            if (node.previous)
                node.previous.next = replacement;
            if (node.next)
                node.next.previous = replacement;
            if (node == _._first)
                _._first = replacement;
            if (node == _._last)
                _._last = replacement;
            _._version++;
        };
        LinkedNodeList.valueEnumeratorFrom = function (list) {
            if (!list)
                throw new ArgumentNullException_1.ArgumentNullException('list');
            var current, next, version;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                current = null;
                next = list.first;
                version = list._version;
            }, function (yielder) {
                if (next) {
                    list.assertVersion(version);
                    current = next;
                    next = current && current.next;
                    return yielder.yieldReturn(current.value);
                }
                return yielder.yieldBreak();
            });
        };
        LinkedNodeList.copyValues = function (list, array, index) {
            if (index === void 0) { index = 0; }
            if (list && list.first) {
                if (!array)
                    throw new ArgumentNullException_1.ArgumentNullException('array');
                list.forEach(function (node, i) {
                    array[index + i] = node.value;
                });
            }
            return array;
        };
        return LinkedNodeList;
    }());
    exports.LinkedNodeList = LinkedNodeList;
    function assertValidDetached(node, propName) {
        if (propName === void 0) { propName = 'node'; }
        if (node == null)
            throw new ArgumentNullException_1.ArgumentNullException(propName);
        if (node.next || node.previous)
            throw new InvalidOperationException_1.InvalidOperationException("Cannot add a node to a LinkedNodeList that is already linked.");
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = LinkedNodeList;
});
//# sourceMappingURL=LinkedNodeList.js.map