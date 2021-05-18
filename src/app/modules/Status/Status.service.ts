import { statusStore, StatusStore, StatusUpdate } from "./Status.store"

export class StatusService {
  constructor(protected store: StatusStore) {}

  isUpdatePresent(su_part: string) {
    return this.store.getValue()?.status?.some((s) => s.part === su_part)
  }

  addStatus = (status: StatusUpdate) => {
    if (status.part && !this.isUpdatePresent(status.part)) {
      let sus = this.store.getValue().status.slice()
      sus.push(status)
      this.store.update({ status: sus })
    } else {
      const existingStatus = this.store.getValue()?.status?.find((s) => s.part === status.part)
      if (existingStatus && existingStatus.level !== status.level) {
        this.removeStatus(status.part)
        this.addStatus(status)
      }
    }
  }
  removeStatus = (status_part: string) => {
    if (this.isUpdatePresent(status_part)) {
      let sus = this.store.getValue().status.slice()
      sus.splice(
        sus.findIndex((s) => s.part === status_part),
        1
      )
      this.store.update({ status: sus })
    }
  }
}

export const useStatusService = () => new StatusService(statusStore)
