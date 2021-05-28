import { Store, StoreConfig } from "@datorama/akita"
import { Installation } from "./Vrm.types"

export interface VrmState {
  userId?: number
  username?: string
  token?: string
  mqttHost?: string
  portalId?: string
  siteId?: number
  webhost?: string
  installations?: Installation[]
  environment: "live" | "acceptance"
}

export const VRM_STORE_NAME = "Vrm"

@StoreConfig({ name: VRM_STORE_NAME, resettable: true })
export class VrmStore extends Store<VrmState> {
  constructor() {
    super({
      environment: "live",
    })
  }
}

export const vrmStore = new VrmStore()
