import {Store, StoreConfig} from '@datorama/akita'
import {RefObject} from 'react'
import {APP_STORE_NAME} from './App.constants'

export interface AppState {
    portalId: string | number | null
    metricsRef: RefObject<any> | null
}

export const createInitialState = (): AppState => ({
    portalId: null,
    metricsRef: null
})

@StoreConfig({name: APP_STORE_NAME})
export class AppStore extends Store<AppState> {
    constructor () {
        super(createInitialState())
    }
}

export const appStore = new AppStore()
