import {Query} from '@datorama/akita'
import {ShorePowerInputState, shorePowerInputStore, ShorePowerInputStore} from './ShorePowerInput.store'

export class ShorePowerInputQuery extends Query<ShorePowerInputState> {
    inputId$ = this.select(s => s.inputId)

    constructor (protected store: ShorePowerInputStore) {
        super(store);
    }
}

export const shorePowerInputQuery = new ShorePowerInputQuery(shorePowerInputStore)
