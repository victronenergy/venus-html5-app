export const DC_LOADS_STORE_NAME = "DcLoads"

export const getTopics = (portalId: any) => {
    return {
        voltage: `N/${portalId}/system/0/Dc/Battery/Voltage`,
        power: `N/${portalId}/system/0/Dc/System/Power`
    }
}
