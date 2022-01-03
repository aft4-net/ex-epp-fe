import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";

export abstract class BaseStateService<TStateModel> {
    private readonly _state$: BehaviorSubject<TStateModel>

    protected get State(): TStateModel {
        return this._state$.getValue();
    }
    protected set State(value: Partial<TStateModel>) {
        this._state$.next(
            {
                ...this.State,
                ...value
            } as TStateModel
        );
    }

    protected _select<TFilter>(mapFn: (state: TStateModel) => TFilter): Observable<TFilter> {
        return this._state$.asObservable().pipe(
            map((state: TStateModel) => mapFn(state)),
            distinctUntilChanged()
        );
    }
    /**
     *
     */
    constructor(
        initialState: TStateModel
    ) {
        this._state$ = new BehaviorSubject<TStateModel>(initialState);
    }

    protected abstract load(): void;
}