import {dcLoadsStore, DcLoadsStore} from './DcLoads.store'

export class DcLoadsService {
    constructor (private store: DcLoadsStore) {}

    updatePower (power: number) {
        this.store.update({power})
    }

    updateVoltage (voltage: number) {
        this.store.update({voltage})
    }
}

export const dcLoadsService = new DcLoadsService(dcLoadsStore)
