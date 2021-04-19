import {Store, StoreConfig} from '@datorama/akita'

export interface VebusState {
    instanceId: number | null | undefined
}

export const VEBUS_STORE_NAME = 'vebus'

@StoreConfig({name: VEBUS_STORE_NAME})
export class VebusStore extends Store<VebusState> {
    constructor () {
        super({})
    }
}

export const vebusStore = new VebusStore()
