import { IndexEnumerator } from "./IndexEnumerator";
import { IArray } from "../Array/IArray";
export declare class ArrayEnumerator<T> extends IndexEnumerator<T> {
    constructor(arrayFactory: () => IArray<T>, start?: number, step?: number);
    constructor(array: IArray<T>, start?: number, step?: number);
}
export default ArrayEnumerator;
