import {Store, StoreConfig} from '@datorama/akita'
import {DC_LOADS_STORE_NAME} from './DcLoads.constants'

export interface DcLoadsState {
    voltage: number
    power: number
}

export const createInitialState = (): DcLoadsState => ({
    voltage: 0,
    power: 0,
})


@StoreConfig({name: DC_LOADS_STORE_NAME})
export class DcLoadsStore extends Store<DcLoadsState> {
    constructor () {
        super(createInitialState())
    }
}

export const dcLoadsStore = new DcLoadsStore()
