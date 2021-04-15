import {RefObject} from 'react'
import {appStore, AppStore} from './App.store'

export class AppService {
    constructor (private store: AppStore) {}

    updatePortalId (portalId: string | number) {
        this.store.update({portalId})
    }

    updateMetricsRef (metricsRef: RefObject<any>) {
        this.store.update({metricsRef})
    }
}

export const appService = new AppService(appStore)
