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

    this.store.reset()
  }

  updateInstanceDetails = async (): Promise<void> => {
    const { userId, token } = this.store?.getValue()

    if (!userId || !token) {
      throw new Error("Not logged in")
    }

    const response = await axios.get(`${this.apiBaseUrl}/users/${userId}/installations?extended=1`, {
      headers: {
        "x-authorization": `Bearer ${token}`,
      },
    })

    if (response.status !== 200) {
      throw new Error(response.data)
    }

    const data: InstallationsResponse = response.data

    if (data.records.length === 0) {
      throw new Error("This account has no installations!")
    }

    this.store.update({
      installations: data.records.map((v) => ({
        idSite: v.idSite,
        identifier: v.identifier,
        mqtt_webhost: v.mqtt_webhost,
        name: v.name,
      })),
    })

    if (data.records.length === 1) {
      this.setActiveInstallation(data.records[0].idSite)
    }
  }

  setActiveInstallation = (siteId: number) => {
    const installations = this.store?.getValue()?.installations

    if (!installations) {
      throw new Error("No installations, try logging in again!")
    }

    const site = installations.find((v) => v.idSite === siteId)

    if (!site) {
      throw new Error("Incorrect data - site with specified ID not found!")
    }

    this.store.update({ portalId: site.identifier, webhost: site.mqtt_webhost, siteId: siteId })
  }
}

export const useVrmService = () => new VrmService(vrmStore)
