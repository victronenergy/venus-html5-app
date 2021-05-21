import { Store, StoreConfig } from "@datorama/akita"

export interface VrmState {
  userId?: number
  username?: string
  token?: string
  mqttHost?: string
  portalId?: string
  siteId?: number
  webhost?: string
  environment: "live" | "acceptance"
}

export const VRM_STORE_NAME = "Vrm"

@StoreConfig({ name: VRM_STORE_NAME })
export class VrmStore extends Store<VrmState> {
  constructor() {
    super({
      siteId: 31112, // TODO: Allow user to choose a site
      environment: "live",
    })
  }
}

export const vrmStore = new VrmStore()
