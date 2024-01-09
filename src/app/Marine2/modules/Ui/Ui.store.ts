import { makeAutoObservable, observable, computed } from "mobx"

export class UiState {
  language = "en_US"
  pendingRequestCount = 0

  // .struct makes sure observer won't be signaled unless the
  // dimensions object changed in a deepEqual manner.
  windowDimensions = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

  constructor() {
    makeAutoObservable(this, { windowDimensions: observable.struct })
    window.onresize = () => {
      //this.windowDimensions = getWindowDimensions()
    }
  }

  get appIsInSync() {
    return this.pendingRequestCount === 0
  }
}
