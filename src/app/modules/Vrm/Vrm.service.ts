import { vrmStore, VrmStore } from "./Vrm.store"
import axios from "axios"
import { InstallationsResponse, LoginResponse } from "./Vrm.types"
import { AppService, appStore } from "../App"

export class VrmService {
  constructor(protected store: VrmStore) {}

  private readonly apiBaseUrl = "https://vrmapi.victronenergy.com/v2"

  login = async (username: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/auth/login`, {
        username,
        password,
        remember_me: true,
      })

      const data: LoginResponse = response.data

      this.store.update({
        token: data.token,
        userId: data.idUser,
        username,
      })

      return data
    } catch (e) {
      const response = e.response

      if (response?.data?.errors) {
        throw new Error(response.data.errors)
      }

      if (response?.data) {
        throw new Error(response.data)
      }

      throw new Error("Login failed")
    }
  }

  logout = () => {
    const appService = new AppService(appStore)

    appService.setRemote(false)

    this.store.update({
      token: undefined,
      userId: undefined,
      username: undefined,
    })
  }

  updateInstanceDetails = async (): Promise<void> => {
    const { userId, siteId, token } = this.store?.getValue()

    if (!userId || !siteId || !token) {
      throw new Error("Not logged in")
    }

    const response = await axios.get(`${this.apiBaseUrl}/users/${userId}/installations?extended=1&idSite=${siteId}`, {
      headers: {
        "x-authorization": `Bearer ${token}`,
      },
    })

    if (response.status !== 200) {
      throw new Error(response.data)
    }

    const data: InstallationsResponse = response.data

    const site = data.records.find((s) => s.idSite === siteId)

    if (!site) {
      throw new Error("Incorrect data - site with specified ID not found!")
    }

    this.store.update({ portalId: site.identifier, webhost: site.mqtt_webhost })
  }
}

export const useVrmService = () => new VrmService(vrmStore)
