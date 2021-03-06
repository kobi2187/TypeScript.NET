/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
import { ArgumentNullException } from "../../Exceptions/ArgumentNullException";
import { ReadOnlyCollectionBase } from "../ReadOnlyCollectionBase";
import { from as enumeratorFrom } from "../Enumeration/Enumerator";
// noinspection JSUnusedLocalSymbols
export default class ReadOnlyArrayWrapper extends ReadOnlyCollectionBase {
    constructor(array) {
        super();
        if (!array)
            throw new ArgumentNullException('array');
        const _ = this;
        _._getCount = () => array.length;
        _.getEnumerator = () => enumeratorFrom(array);
        _.getValueAt = i => array[i];
    }
}
//# sourceMappingURL=ReadOnlyArrayWrapper.js.map