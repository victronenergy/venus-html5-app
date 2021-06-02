import { MqttService, mqttStore } from "../Mqtt"
import { LOCK_STATE_TOPIC } from "./App.provider"
import { appStore, AppStore } from "./App.store"

export class AppService {
  constructor(protected store: AppStore) {}

  toggleLocked = () => {
    this.store.update(({ locked }) => {
      const mqttService = new MqttService(mqttStore)
      mqttService.publish(LOCK_STATE_TOPIC, +!locked)
      return { locked: !locked }
    })
  }
  setLockedWithoutPersistence = (locked: boolean) => {
    this.store.update({ locked })
  }
  setPage = (page: string) => this.store.update({ page })
  setRemote = (remote: boolean) => this.store.update({ remote })
  toggleRemote = () => this.store.update(({ remote }) => ({ remote: !remote }))
}

export const useAppService = () => new AppService(appStore)
