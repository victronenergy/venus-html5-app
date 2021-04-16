import {DcLoadsState, dcLoadsStore, DcLoadsStore} from './DcLoads.store'

export class DcLoadsService {
    constructor (private store: DcLoadsStore) {}

    updatePower (power: number) {
        this.store.update({power})
    }

    updateVoltage (voltage: number) {
        this.store.update({voltage})
    }

    reset () {
        this.store.reset()
    }

    updateAll (data: Partial<DcLoadsState>) {
        this.store.update(data)
    }
}

export const dcLoadsService = new DcLoadsService(dcLoadsStore)
