import { SubscribableBase } from "./SubscribableBase";
import { IObservable } from "./IObservable";
import { IObserver } from "./IObserver";
import { IDisposable } from "../Disposable/IDisposable";
import { Action, Closure } from "../FunctionTypes";
export declare abstract class ObservableBase<T> extends SubscribableBase<IObserver<T>> implements IObservable<T> {
    protected _onNext(value: T): void;
    protected _onError(error: any): void;
    protected _onCompleted(): void;
    subscribe(subscriber: IObserver<T>): IDisposable;
    subscribe(subscriber: Action<T>, onError?: Action<any>, onCompleted?: Closure): IDisposable;
}
export default ObservableBase;
