import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";

// Types

export type ExecEntityType = 'default' | 'root' | 'child' | 'unity-child';
export type ExecStateType = 'view' | 'add' | 'edit' | 'other';
export type ExecRMFeatureType
    = 'Personal-Detail' | 'Organizational-Detail'
    | 'Personal-Addresses' | 'Family-Detail' | 'Emergency-Contacts';

export type ExecProcessType = 'all';
export type ExecEntryValidity = 'initial' | 'validate' | 'valid' | 'invalid';
// Models

export interface ExecBaseModel {
    Guid?: string;
}

export interface ExecState<TView extends ExecBaseModel, TEntity extends ExecBaseModel, TCollection = TView | TEntity> {
    status: ExecStateType;
    collection: TCollection[];
    selected?: number;
    current?: {
        original: Partial<TEntity>;
        modified: Partial<TEntity>;
        valid: ExecEntryValidity;
    };
    position: ExecRMFeatureType;
}

interface ProgressState {
    all: boolean
}

export interface ExecFilterValues {
    [key: string]: {
        value: number | string;
        label: string;
    }
}

export interface ExecFilterParams {
    [key: string]: undefined | number[] | string[];
}

export interface ExecSearchParams {
    [key: string]: string[];
}

export interface ExecPageParams {
    pageNumber: number;
    pageSize: number;
    filteredQuatity: number;
    totalQuatity: number;
}

export interface ExecOrderParams {
    [key: string]: 'Unspecified' | 'Ascending' | 'Descending';
}

export interface ExecQueryParams {
    page: ExecPageParams;
    search: ExecSearchParams;
    filter: ExecFilterParams;
    orders: ExecOrderParams;
}


// State Services

export abstract class BaseStateService<TState> {

    private readonly _state$: BehaviorSubject<TState>;

    protected get State(): TState {
        return {
            ...this._state$.getValue()
        } as TState;
    }
    protected set State(value: Partial<TState>) {
        this._state$.next({
            ...this.State,
            ...value
        });
    }
    protected readonly _select = <TFilter>(mapFn: (state: TState) => TFilter) => {
        return this._state$.asObservable().pipe(
            map(mapFn),
            distinctUntilChanged()
        )
    }

    /**
     *
     */
    constructor(initialState?: TState) {
        this._state$ = new BehaviorSubject(initialState ? initialState : {} as TState);
    }
}


class ExecProgressStateService extends BaseStateService<ProgressState> {

    public readonly $conditions: { readonly [key: string]: Observable<boolean> } = {
        all: this._select(state => state.all)
    };
    /**
     *
     */
    constructor() {
        super({ all: true });
    }

    public update(type: 'start' | 'end', key?: ExecProcessType) {
        const value = type === 'start' ? true : false;
        const state = this.State;
        const newState: any = {};
        if (key && key !== 'all') {
            newState[key] = value;
            if (value === true) {
                newState['all'] = true;
            } else {
                const modified = {
                    ...state,
                    ...newState
                }
                const counts = {
                    true: 0,
                    false: 0
                };
                Object.entries(state).filter(kV => kV[0] !== 'all').forEach(kV => {
                    if (kV[1] === true) {
                        counts.true += 1;
                    } else {
                        counts.false += 1;
                    }
                });
                if (counts.true > 0 && state.all !== true) {
                    newState['all'] = true;
                } else if (counts.false > 0 && state.all !== false) {
                    newState['all'] = false;
                }
            }
        } else {
            Object.entries(state).forEach(kV => {
                if (kV[1] !== value) {
                    newState[kV[0]] = value;
                }
            })
        }
        this.State = newState;
    }
}

export abstract class ExecStateService<
    TView extends ExecBaseModel,
    TEntity extends ExecBaseModel,
    TState extends ExecState<TView, TEntity, TCollection>,
    TCollection = TView | TEntity>
    extends BaseStateService<TState> {

    protected readonly _progressState: ExecProgressStateService;

    public readonly $data = this._select(state => state.collection);
    public readonly $original = this._select(state => state.current?.original as unknown as Partial<TEntity>);
    public readonly $modified = this._select(state => state.current?.modified as unknown as Partial<TEntity>);
    public readonly $loading: Observable<boolean>;
    

    /**
     *
     */
    constructor(
        private readonly _type: ExecEntityType,
        initialValue: TState
    ) {
        super(initialValue);
        this._progressState = new ExecProgressStateService();
        this.$loading = this._progressState.$conditions['all'];
    }

    public readonly trackChanges = (value: Partial<TEntity>, valid: boolean) => {
        const state = this.State;
        if (state.current) {
            this.State = {
                current: {
                    original: state.current.original,
                    modified: value,
                    valid: valid === true? 'valid' : 'invalid'
                }
            };
        }
    }
}

export class ExecSubStateService<
    TEntity extends ExecBaseModel>
    extends ExecStateService<TEntity, TEntity, ExecState<TEntity, TEntity, TEntity>, TEntity> {

    /**
     *
     */
    constructor(
        initialValue: ExecState<TEntity, TEntity, TEntity>
    ) {
        super('unity-child', initialValue);
    }

    protected readonly _recreateEntity = <T>(entity: T): T => {
        return {
            ...entity
        } as T;
    }

    
    public readonly load = (data?: TEntity) => {
        this.State = {
            current: {
                original: data? data : {} as Partial<TEntity>,
                modified: data? this._recreateEntity(data) : {} as Partial<TEntity>,
                valid: data? 
            }
        }
    }

    public readonly getValue

}

// export class ExecBaseRootStateService<
//     TView extends ExecBaseModel,
//     TEntity extends ExecBaseModel>
//     extends ExecBaseStateService<TView, TEntity, TView> {


//     /**
//      *
//      */
//     constructor() {
//         super();
//     }

//     public abstract load = () => void
// }

// export abstract class ExecBaseChildStateService<T extends ExecBaseModel>
//     extends ExecBaseStateService<T> {


//     /**
//      *
//      */
//     constructor() {
//         super();
//     }

//     public override load = (data?: T[]) => {
//         this.State = {
//             collection: data ? data : [],
//             current: undefined
//         }
//     }
// }