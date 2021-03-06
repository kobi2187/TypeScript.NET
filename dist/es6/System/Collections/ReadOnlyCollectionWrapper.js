/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
import { ArgumentNullException } from "../Exceptions/ArgumentNullException";
import { ReadOnlyCollectionBase } from "./ReadOnlyCollectionBase";
// noinspection JSUnusedLocalSymbols
export default class ReadOnlyCollectionWrapper extends ReadOnlyCollectionBase {
    constructor(c) {
        super();
        if (!c)
            throw new ArgumentNullException('collection');
        const _ = this;
        _._getCount = () => c.count;
        _.getEnumerator = () => c.getEnumerator();
    }
}
//# sourceMappingURL=ReadOnlyCollectionWrapper.js.map