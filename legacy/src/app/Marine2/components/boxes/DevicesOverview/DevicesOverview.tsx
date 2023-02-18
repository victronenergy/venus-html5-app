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
  useInverterCharger,
  useInverters,
  useVebus,
} from "@elninotech/mfd-modules"
import Charger from "../Charger"
import Inverter from "../Inverter"
import GeneratorFp from "../GeneratorFp"
import GeneratorRelays from "../GeneratorRelays"
// import { withErrorBoundary } from "react-error-boundary"
// import ErrorFallback from "../../../components/ui/ErrorBoundary/ErrorFallback"

const DevicesOverview = ({ mode = "compact" }: Props) => {
  const { inverters } = useInverters()
  const { vebusInverters } = useVebus()
  const { chargers } = useChargers()
  // const { state, customName, productName, modeIsAdjustable, updateMode } = useInverterCharger()

  const values = useGeneratorRelay()
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
        linkedView={AppViews.BOX_BATTERIES_OVERVIEW}
      >
        <>
          {chargers && chargers.map((charger: ChargerInstanceId) => <Charger key={charger} instanceId={charger} />)}
          {inverters && inverters.map((id) => <Inverter key={id} instanceId={id} isVebusInverter={false} />)}
          {!!vebusInverters.length &&
            vebusInverters.map((id) => <Inverter key={id} instanceId={id} isVebusInverter={true} />)}
          <GeneratorFp />
          <GeneratorRelays />
        </>
      </Box>
    )
  }

  return (
    <Box
      title={translate("boxes.devices")}
      icon={
        <DevicesIcon
          /* todo: fix types for svg */
          /* @ts-ignore */
          className={"w-6 text-black dark:text-white"}
        />
      }
    >
      <>
        <div>Devices full content</div>
      </>
    </Box>
  )
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
