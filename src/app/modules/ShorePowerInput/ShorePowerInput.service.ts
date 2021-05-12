import {ShorePowerInputId, shorePowerInputStore, ShorePowerInputStore} from './ShorePowerInput.store'

export class ShorePowerInputService {
    constructor (protected store: ShorePowerInputStore) {}

    setInputId = (id: ShorePowerInputId) => this.store.update({inputId: id})
}

export const useShorePowerInputService = () => new ShorePowerInputService(shorePowerInputStore)
