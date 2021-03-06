import { DisposableBase } from "../System/Disposable/DisposableBase";
import { IEnumerator } from "../System/Collections/Enumeration/IEnumerator";
import { Action, Selector, EqualityComparison, Comparison, Closure, ActionWithIndex, PredicateWithIndex, SelectorWithIndex } from "../System/FunctionTypes";
import { IArray } from "../System/Collections/Array/IArray";
import { IMap, IDictionary } from "../System/Collections/Dictionaries/IDictionary";
import { Comparable } from "../System/IComparable";
import { IInfiniteEnumerable, ILinqEnumerable, IFiniteEnumerable, ILookup, IOrderedEnumerable, IGrouping, NotEmptyEnumerable } from "./Enumerable";
import { EnumerableAction } from "./EnumerableAction";
import { Primitive } from "../System/Primitive";
import { ForEachEnumerable } from "../System/Collections/Enumeration/ForEachEnumerable";
export declare class InfiniteEnumerable<T> extends DisposableBase implements IInfiniteEnumerable<T> {
    protected _enumeratorFactory: () => IEnumerator<T>;
    constructor(_enumeratorFactory: () => IEnumerator<T>, finalizer?: Closure | null);
    protected _isEndless: boolean | undefined;
    readonly isEndless: boolean | undefined;
    getEnumerator(): IEnumerator<T>;
    protected _onDispose(): void;
    asEnumerable(): this;
    /**
     * Similar to forEach, but executes an action for each time a value is enumerated.
     * If the action explicitly returns false or 0 (EnumerationAction.Break), the enumeration will complete.
     * If it returns a 2 (EnumerationAction.Skip) it will move on to the next item.
     * This also automatically handles disposing the enumerator.
     * @param action
     * @param initializer
     * @param isEndless Special case where isEndless can be null in order to negate inheritance.
     * @param onComplete Executes just before the enumerator releases when there is no more entries.
     * @returns {any}
     */
    doAction(action: ActionWithIndex<T> | PredicateWithIndex<T> | SelectorWithIndex<T, number> | SelectorWithIndex<T, EnumerableAction>, initializer: Closure | null, isEndless: true, onComplete?: Action<number>): InfiniteEnumerable<T>;
    doAction(action: ActionWithIndex<T> | PredicateWithIndex<T> | SelectorWithIndex<T, number> | SelectorWithIndex<T, EnumerableAction>, initializer?: Closure | null, isEndless?: boolean | null | undefined, onComplete?: Action<number>): Enumerable<T>;
    force(): void;
    skip(count: number): InfiniteEnumerable<T>;
    take(count: number): FiniteEnumerable<T>;
    elementAt(index: number): T;
    elementAtOrDefault(index: number): T | undefined;
    elementAtOrDefault(index: number, defaultValue: T): T;
    first(): T;
    firstOrDefault(): T | undefined;
    firstOrDefault(defaultValue: T): T;
    single(): T;
    singleOrDefault(): T | undefined;
    singleOrDefault(defaultValue: T): T;
    any(): boolean;
    isEmpty(): boolean;
    traverseDepthFirst(childrenSelector: (element: T) => ForEachEnumerable<T> | null | undefined): Enumerable<T>;
    traverseDepthFirst<TNode>(childrenSelector: (element: T | TNode) => ForEachEnumerable<TNode> | null | undefined): Enumerable<TNode>;
    traverseDepthFirst<TResult>(childrenSelector: (element: T) => ForEachEnumerable<T> | null | undefined, resultSelector: SelectorWithIndex<T, TResult>): Enumerable<TResult>;
    traverseDepthFirst<TNode, TResult>(childrenSelector: (element: T | TNode) => ForEachEnumerable<TNode> | null | undefined, resultSelector: SelectorWithIndex<T, TResult>): Enumerable<TResult>;
    flatten<TFlat>(): InfiniteEnumerable<TFlat>;
    flatten(): InfiniteEnumerable<any>;
    pairwise<TSelect>(selector: (previous: T, current: T, index: number) => TSelect): InfiniteEnumerable<TSelect>;
    scan(func: (previous: T, current: T, index: number) => T, seed?: T): this;
    select<TResult>(selector: SelectorWithIndex<T, TResult>): InfiniteEnumerable<TResult>;
    protected _selectMany<TElement, TResult>(collectionSelector: SelectorWithIndex<T, ForEachEnumerable<TElement> | null | undefined>, resultSelector?: (collection: T, element: TElement) => TResult): Enumerable<TResult>;
    selectMany<TResult>(collectionSelector: SelectorWithIndex<T, ForEachEnumerable<TResult> | null | undefined>): InfiniteEnumerable<TResult>;
    selectMany<TElement, TResult>(collectionSelector: SelectorWithIndex<T, ForEachEnumerable<TElement> | null | undefined>, resultSelector: (collection: T, element: TElement) => TResult): InfiniteEnumerable<TResult>;
    protected _filterSelected(selector?: SelectorWithIndex<T, T>, filter?: PredicateWithIndex<T>): Enumerable<T>;
    protected _filterSelected<TResult>(selector: SelectorWithIndex<T, TResult>, filter?: PredicateWithIndex<TResult>): Enumerable<TResult>;
    /**
     * Returns selected values that are not null or undefined.
     */
    choose(): InfiniteEnumerable<T>;
    choose<TResult>(selector?: Selector<T, TResult>): InfiniteEnumerable<TResult>;
    where(predicate: PredicateWithIndex<T>): this;
    nonNull(): this;
    ofType<TType>(type: {
        new (...params: any[]): TType;
    }): InfiniteEnumerable<TType>;
    except(second: ForEachEnumerable<T>, compareSelector?: Selector<T, string | number | symbol>): this;
    distinct(compareSelector?: Selector<T, string | number | symbol>): this;
    distinctUntilChanged(compareSelector?: Selector<T, any>): this;
    /**
     * Returns a single default value if empty.
     * @param defaultValue
     * @returns {Enumerable}
     */
    defaultIfEmpty(defaultValue?: T): this;
    zip<TSecond, TResult>(second: ForEachEnumerable<TSecond>, resultSelector: (first: T, second: TSecond, index: number) => TResult): Enumerable<TResult>;
    zipMultiple<TSecond, TResult>(second: IArray<ForEachEnumerable<TSecond>>, resultSelector: (first: T, second: TSecond, index: number) => TResult): Enumerable<TResult>;
    join<TInner, TKey, TResult>(inner: ForEachEnumerable<TInner>, outerKeySelector: Selector<T, TKey>, innerKeySelector: Selector<TInner, TKey>, resultSelector: (outer: T, inner: TInner) => TResult, compareSelector?: Selector<TKey, string | number | symbol>): Enumerable<TResult>;
    groupJoin<TInner, TKey, TResult>(inner: ForEachEnumerable<TInner>, outerKeySelector: Selector<T, TKey>, innerKeySelector: Selector<TInner, TKey>, resultSelector: (outer: T, inner: TInner[] | null) => TResult, compareSelector?: Selector<TKey, string | number | symbol>): Enumerable<TResult>;
    merge(enumerables: IArray<ForEachEnumerable<T>>): this;
    concat(...enumerables: Array<ForEachEnumerable<T>>): this;
    union(second: ForEachEnumerable<T>, compareSelector?: Selector<T, string | number | symbol>): this;
    insertAt(index: number, other: ForEachEnumerable<T>): this;
    alternateMultiple(sequence: ForEachEnumerable<T>): this;
    alternateSingle(value: T): this;
    alternate(...sequence: T[]): this;
    catchError(handler: (e: any) => void): this;
    finallyAction(action: Closure): this;
    buffer(size: number): InfiniteEnumerable<T[]>;
    share(): this;
}
/**
 * Enumerable<T> is a wrapper class that allows more primitive enumerables to exhibit LINQ behavior.
 *
 * In C# Enumerable<T> is not an instance but has extensions for IEnumerable<T>.
 * In this case, we use Enumerable<T> as the underlying class that is being chained.
 */
export declare class Enumerable<T> extends InfiniteEnumerable<T> implements ILinqEnumerable<T> {
    constructor(enumeratorFactory: () => IEnumerator<T>, finalizer?: Closure | null, isEndless?: boolean);
    asEnumerable(): this;
    skip(count: number): Enumerable<T>;
    skipWhile(predicate: PredicateWithIndex<T>): Enumerable<T>;
    takeWhile(predicate: PredicateWithIndex<T>): this;
    takeUntil(predicate: PredicateWithIndex<T>, includeUntilValue?: boolean): this;
    traverseBreadthFirst(childrenSelector: (element: T) => ForEachEnumerable<T> | null | undefined): Enumerable<T>;
    traverseBreadthFirst<TNode>(childrenSelector: (element: T | TNode) => ForEachEnumerable<TNode> | null | undefined): Enumerable<TNode>;
    traverseBreadthFirst<TResult>(childrenSelector: (element: T) => ForEachEnumerable<T> | null | undefined, resultSelector: SelectorWithIndex<T, TResult>): Enumerable<TResult>;
    traverseBreadthFirst<TNode, TResult>(childrenSelector: (element: T | TNode) => ForEachEnumerable<TNode> | null | undefined, resultSelector: SelectorWithIndex<T, TResult>): Enumerable<TResult>;
    forEach(action: ActionWithIndex<T>, max?: number): number;
    forEach(action: PredicateWithIndex<T>, max?: number): number;
    toArray(predicate?: PredicateWithIndex<T>): T[];
    copyTo(target: T[], index?: number, count?: number): T[];
    toLookup<TKey, TValue>(keySelector: SelectorWithIndex<T, TKey>, elementSelector?: SelectorWithIndex<T, TValue>, compareSelector?: Selector<TKey, string | number | symbol>): ILookup<TKey, TValue>;
    toMap<TResult>(keySelector: SelectorWithIndex<T, string | number | symbol>, elementSelector: SelectorWithIndex<T, TResult>): IMap<TResult>;
    toDictionary<TKey, TValue>(keySelector: SelectorWithIndex<T, TKey>, elementSelector: SelectorWithIndex<T, TValue>, compareSelector?: Selector<TKey, string | number | symbol>): IDictionary<TKey, TValue>;
    toJoinedString(separator?: string, selector?: Selector<T, string>): string;
    takeExceptLast(count?: number): this;
    skipToLast(count: number): this;
    select<TResult>(selector: SelectorWithIndex<T, TResult>): Enumerable<TResult>;
    selectMany<TResult>(collectionSelector: SelectorWithIndex<T, ForEachEnumerable<TResult> | null | undefined>): Enumerable<TResult>;
    selectMany<TElement, TResult>(collectionSelector: SelectorWithIndex<T, ForEachEnumerable<TElement> | null | undefined>, resultSelector: (collection: T, element: TElement) => TResult): Enumerable<TResult>;
    choose(): Enumerable<T>;
    choose<TResult>(selector: SelectorWithIndex<T, TResult>): Enumerable<TResult>;
    reverse(): this;
    shuffle(): this;
    count(predicate?: PredicateWithIndex<T>): number;
    all(predicate: PredicateWithIndex<T>): boolean;
    every(predicate: PredicateWithIndex<T>): boolean;
    any(predicate?: PredicateWithIndex<T>): boolean;
    some(predicate?: PredicateWithIndex<T>): boolean;
    contains(value: T, compareSelector?: Selector<T, any>): boolean;
    indexOf(value: T, compareSelector?: SelectorWithIndex<T, any>): number;
    lastIndexOf(value: T, compareSelector?: SelectorWithIndex<T, any>): number;
    intersect(second: ForEachEnumerable<T>, compareSelector?: Selector<T, string | number | symbol>): this;
    sequenceEqual(second: ForEachEnumerable<T>, equalityComparer?: EqualityComparison<T>): boolean;
    ofType<TType>(type: {
        new (...params: any[]): TType;
    }): Enumerable<TType>;
    orderBy<TKey extends Comparable>(keySelector?: Selector<T, TKey>): IOrderedEnumerable<T>;
    orderUsing(comparison: Comparison<T>): IOrderedEnumerable<T>;
    orderUsingReversed(comparison: Comparison<T>): IOrderedEnumerable<T>;
    orderByDescending<TKey extends Comparable>(keySelector?: Selector<T, TKey>): IOrderedEnumerable<T>;
    buffer(size: number): Enumerable<T[]>;
    groupBy<TKey>(keySelector: SelectorWithIndex<T, TKey>): Enumerable<IGrouping<TKey, T>>;
    groupBy<TKey>(keySelector: SelectorWithIndex<T, TKey>, elementSelector: SelectorWithIndex<T, T>, compareSelector?: Selector<TKey, string | number | symbol>): Enumerable<IGrouping<TKey, T>>;
    groupBy<TKey, TElement>(keySelector: SelectorWithIndex<T, TKey>, elementSelector: SelectorWithIndex<T, TElement>, compareSelector?: Selector<TKey, string | number | symbol>): Enumerable<IGrouping<TKey, TElement>>;
    partitionBy<TKey>(keySelector: Selector<T, TKey>): Enumerable<IGrouping<TKey, T>>;
    partitionBy<TKey, TElement>(keySelector: Selector<T, TKey>, elementSelector?: Selector<T, TElement>, resultSelector?: (key: TKey, element: TElement[]) => IGrouping<TKey, TElement>, compareSelector?: Selector<TKey, any>): Enumerable<IGrouping<TKey, TElement>>;
    flatten<TFlat>(): Enumerable<TFlat>;
    flatten(): Enumerable<any>;
    pairwise<TSelect>(selector: (previous: T, current: T, index: number) => TSelect): Enumerable<TSelect>;
    aggregate(func: (previous: T, current: T, index: number) => T, seed: T): T;
    aggregate(func: (previous: T, current: T, index: number) => T, seed?: T): T | undefined;
    average(selector?: SelectorWithIndex<T, number>): number;
    max(): T | undefined;
    min(): T | undefined;
    maxBy(keySelector?: Selector<T, Primitive>): T | undefined;
    minBy(keySelector?: Selector<T, Primitive>): T | undefined;
    sum(selector?: SelectorWithIndex<T, number>): number;
    product(selector?: SelectorWithIndex<T, number>): number;
    /**
     * Takes the first number and divides it by all following.
     * @param selector
     * @returns {number}
     */
    quotient(selector?: SelectorWithIndex<T, number>): number;
    last(): T;
    lastOrDefault(): T | undefined;
    lastOrDefault(defaultValue: T): T;
    memoize(): this;
    throwWhenEmpty(): NotEmptyEnumerable<T>;
}
export declare class FiniteEnumerable<T> extends Enumerable<T> implements IFiniteEnumerable<T> {
    constructor(enumeratorFactory: () => IEnumerator<T>, finalizer?: Closure);
}
export declare module Enumerable {
    /**
     * Universal method for converting a primitive enumerables into a LINQ enabled ones.
     *
     * Is not limited to TypeScript usages.
     */
    function from<T>(source: ForEachEnumerable<T>): Enumerable<T>;
    function fromAny<T>(source: ForEachEnumerable<T>): Enumerable<T>;
    function fromAny(source: any): Enumerable<any> | undefined;
    function fromAny<T>(source: ForEachEnumerable<T>, defaultEnumerable: Enumerable<T>): Enumerable<T>;
    function fromOrEmpty<T>(source: ForEachEnumerable<T>): Enumerable<T>;
    /**
     * Static helper for converting enumerables to an array.
     * @param source
     * @returns {any}
     */
    function toArray<T>(source: ForEachEnumerable<T>): T[];
    function _choice<T>(values: T[]): InfiniteEnumerable<T>;
    function choice<T>(values: IArray<T>): InfiniteEnumerable<T>;
    function chooseFrom<T>(arg: T, ...args: T[]): InfiniteEnumerable<T>;
    function cycle<T>(values: IArray<T>): InfiniteEnumerable<T>;
    function cycleThrough<T>(arg: T, ...args: T[]): InfiniteEnumerable<T>;
    function empty<T>(): FiniteEnumerable<T>;
    function repeat<T>(element: T): InfiniteEnumerable<T>;
    function repeat<T>(element: T, count: number): FiniteEnumerable<T>;
    /**
     * DEPRECATED This method began to not make sense in so many ways.
     * @deprecated since version 4.2
     * @param initializer
     * @param finalizer
     */
    function repeatWithFinalize<T>(initializer: () => T, finalizer: Closure): InfiniteEnumerable<T>;
    function repeatWithFinalize<T>(initializer: () => T, finalizer?: Action<T>): InfiniteEnumerable<T>;
    /**
     * Creates an enumerable of one element.
     * @param element
     * @returns {FiniteEnumerable<T>}
     */
    function make<T>(element: T): FiniteEnumerable<T>;
    function range(start: number, count: number, step?: number): FiniteEnumerable<number>;
    function rangeDown(start: number, count: number, step?: number): FiniteEnumerable<number>;
    function toInfinity(start?: number, step?: number): InfiniteEnumerable<number>;
    function toNegativeInfinity(start?: number, step?: number): InfiniteEnumerable<number>;
    function rangeTo(start: number, to: number, step?: number): FiniteEnumerable<number>;
    function matches(input: string, pattern: any, flags?: string): FiniteEnumerable<RegExpExecArray>;
    function generate<T>(factory: (index: number) => T): InfiniteEnumerable<T>;
    function generate<T>(factory: (index: number) => T, count: number): FiniteEnumerable<T>;
    function unfold<T>(seed: T, valueFactory: SelectorWithIndex<T, T>, skipSeed?: Boolean): InfiniteEnumerable<T>;
    function forEach<T>(e: ForEachEnumerable<T>, action: ActionWithIndex<T>, max?: number): number;
    function forEach<T>(e: ForEachEnumerable<T>, action: PredicateWithIndex<T>, max?: number): number;
    function map<T, TResult>(enumerable: ForEachEnumerable<T>, selector: SelectorWithIndex<T, TResult>): TResult[];
    function max(values: FiniteEnumerable<number>): number;
    function min(values: FiniteEnumerable<number>): number;
    /**
     * Takes any set of collections of the same type and weaves them together.
     * @param enumerables
     * @returns {Enumerable<T>}
     */
    function weave<T>(enumerables: ForEachEnumerable<ForEachEnumerable<T>>): Enumerable<T>;
}
export default Enumerable;
