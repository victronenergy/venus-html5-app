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
}

export const vrmQuery = new VrmQuery(vrmStore)
