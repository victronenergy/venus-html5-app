export interface LoginResponse {
  token: string
  idUser: number
  verification_mode: string
  verification_sent: boolean
}

export interface InstallationsResponse {
  success: boolean
  records: Installation[]
}

export interface Installation {
  idSite: number
  identifier: string
  mqtt_webhost: string
  name: string
}
