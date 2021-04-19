import {Query} from '@datorama/akita'
import {VebusState, vebusStore, VebusStore} from './Vebus.store'

export class VebusQuery extends Query<VebusState> {
    instanceId$ = this.select(s => s.instanceId)

    constructor (protected store: VebusStore) {super(store)}
}

export const vebusQuery = new VebusQuery(vebusStore)
