import Box from "../../ui/Box"
import DevicesIcon from "../../../images/icons/devices.svg"
import { AppViews } from "../../../modules/AppViews"
import { observer } from "mobx-react"
import { translate } from "react-i18nify"
import {
  ChargerInstanceId,
  useChargers,
  useGeneratorFp,
  useGeneratorRelay,
  useInverters,
  useVebus,
} from "@elninotech/mfd-modules"
import Charger from "../Charger"
import Inverter from "../Inverter"
import GeneratorFp from "../GeneratorFp"
import GeneratorRelays from "../GeneratorRelays"
import InverterCharger from "../InverterCharger"
import Grid from "../../ui/Grid"
// import { withErrorBoundary } from "react-error-boundary"
// import ErrorFallback from "../../../components/ui/ErrorBoundary/ErrorFallback"

const DevicesOverview = ({ mode = "compact" }: Props) => {
  const { inverters } = useInverters()
  const { instanceId, vebusInverters } = useVebus()
  const { chargers } = useChargers()
  const generatorFp = useGeneratorFp()
  const generatorRelay = useGeneratorRelay()

  const getDetailDevices = function () {
    let boxes = []

    if (!!chargers) {
      inverters.forEach((charger) => {
        boxes.push(<Charger key={charger} componentMode={"full"} instanceId={charger} />)
      })
    }

    if (!!inverters) {
      inverters.forEach((id) => {
        boxes.push(<Inverter key={id} componentMode={"full"} instanceId={id} isVebusInverter={false} />)
      })
    }

    if (!!vebusInverters) {
      vebusInverters.forEach((id) => {
        boxes.push(<Inverter key={id} componentMode={"full"} instanceId={id} isVebusInverter={true} />)
      })
    }

    if (!!instanceId) {
      boxes.push(<InverterCharger componentMode={"full"} />)
    }

    if (!!generatorFp.phases) boxes.push(<GeneratorFp generatorFp={generatorFp} mode={"full"} />)
    if (!!generatorRelay.settings) boxes.push(<GeneratorRelays generatorRelay={generatorRelay} mode={"full"} />)

    return boxes
  }
  if (mode === "compact") {
    return (
      <Box
        title={translate("boxes.devices")}
        icon={
          <DevicesIcon
            /* todo: fix types for svg */
            /* @ts-ignore */
            className={"w-6 text-victron-gray dark:text-victron-gray-dark"}
          />
        }
        linkedView={AppViews.BOX_DEVICES_OVERVIEW}
      >
        <>
          {chargers && chargers.map((charger: ChargerInstanceId) => <Charger key={charger} instanceId={charger} />)}
          {inverters && inverters.map((id) => <Inverter key={id} instanceId={id} isVebusInverter={false} />)}
          {!!vebusInverters.length &&
            vebusInverters.map((id) => <Inverter key={id} instanceId={id} isVebusInverter={true} />)}
          {!!instanceId && <InverterCharger />}
          {!!generatorFp.phases && <GeneratorFp generatorFp={generatorFp} />}
          {!!generatorRelay.settings && <GeneratorRelays generatorRelay={generatorRelay} />}
        </>
      </Box>
    )
  }

  return <Grid childClassName={"p-1"}>{getDetailDevices()}</Grid>
}

interface Props {
  mode?: "compact" | "full"
}

// fixme: this causes type errors in the RootView component
// const ComponentWithErrorBoundary = withErrorBoundary(DevicesOverview, {
//   FallbackComponent: ErrorFallback,
//   onError(error, info) {
//     console.error(error, info)
//   },
// })

//export default ComponentWithErrorBoundary
export default observer(DevicesOverview)
