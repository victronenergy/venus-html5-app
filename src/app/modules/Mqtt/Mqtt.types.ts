export type MqttMessage = string | any[] | undefined
export type MqttMessages = { [topic: string]: MqttMessage }
export type PortalId = string | null | undefined
export type Topics = { [key: string]: string | string[] | undefined }
