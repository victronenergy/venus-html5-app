import {Store, StoreConfig} from '@datorama/akita'

export type InstanceId = number | null | undefined

export interface VebusState {
    instanceId: InstanceId
}

export const VEBUS_STORE_NAME = 'vebus'

@StoreConfig({name: VEBUS_STORE_NAME})
export class VebusStore extends Store<VebusState> {
    constructor () {
        super({})
    }
}

export const vebusStore = new VebusStore()
