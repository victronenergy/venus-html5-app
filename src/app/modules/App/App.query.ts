import {Query} from '@datorama/akita'
import {AppState, appStore, AppStore} from './App.store'

export class AppQuery extends Query<AppState> {
    constructor (protected store: AppStore) {
        super(store)
    }

    portalId$ = this.select(state => state.portalId)
    metricsRef$ = this.select(state => state.metricsRef)
}

export const appQuery = new AppQuery(appStore)
