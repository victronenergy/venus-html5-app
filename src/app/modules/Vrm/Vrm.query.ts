import { Query } from "@datorama/akita"
import { VrmState, vrmStore, VrmStore } from "./Vrm.store"

export class VrmQuery extends Query<VrmState> {
  constructor(protected store: VrmStore) {
    super(store)
  }

  all$ = this.select()
  loggedIn$ = this.select((s) => {
    return s.username && s.token && s.webhost && s.portalId
  })
  username$ = this.select((s) => s.username)
  installations$ = this.select((s) => s.installations)
  siteId$ = this.select((s) => s.siteId)
  userId$ = this.select((s) => s.userId)
}

export const vrmQuery = new VrmQuery(vrmStore)
