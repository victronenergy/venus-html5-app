import {Query} from '@datorama/akita'
import {DcLoadsState, dcLoadsStore, DcLoadsStore} from './DcLoads.store'

export class DcLoadsQuery extends Query<DcLoadsState> {
    constructor (protected store: DcLoadsStore) {
        super(store)
    }

    power$ = this.select(state => state.power)
    voltage$ = this.select(state => state.voltage)
}

export const dcLoadsQuery = new DcLoadsQuery(dcLoadsStore)
