import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { Client } from "../../models/client";
import { Project } from "../../models/project";
import { ClientAndProjectService } from "../services/client-and-project.service";

export interface ClientAndProjectState {
    collection: Client[],
    selectedClient: Client | null,
    selectedProject: Project | null
}

@Injectable({
    providedIn: 'root'
})
export class ClientAndProjectStateService {
    private readonly _state$ = new BehaviorSubject<ClientAndProjectState>({
        collection: [],
        selectedClient: null,
        selectedProject: null
    } as ClientAndProjectState)
    public readonly $clients = this._select<Client[]>((state: ClientAndProjectState) => {
        return state.collection;
    })

    public readonly $projects = this._select<Project[]>((state: ClientAndProjectState) => {
        let projects: Project[] = []
        state.collection.forEach(client => {
            projects = [
                ...projects,
                ...client.projects
            ]
        });
        return projects;
    })

    protected get State(): ClientAndProjectState {
        return this._state$.getValue();
    }
    protected set State(value: Partial<ClientAndProjectState>) {
        this._state$.next(
            {
                ...this.State,
                ...value
            } as ClientAndProjectState
        );
    }

    protected _select<TFilter>(mapFn: (state: ClientAndProjectState) => TFilter): Observable<TFilter> {
        return this._state$.asObservable().pipe(
            map((state: ClientAndProjectState) => mapFn(state)),
            distinctUntilChanged()
        );
    }
    /**
     *
     */
    constructor(
        private readonly _clientAndProjectService: ClientAndProjectService
    ) {
        this.load();
    }

    private load(): void {
        this._clientAndProjectService.get()
            .subscribe((response: Client[]) => {
                this.State = {
                    collection: response
                } as Partial<ClientAndProjectState>;
            });
    }
}