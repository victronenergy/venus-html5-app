import { FC, useEffect, useState } from "react"
import { observer } from "mobx-react"
import { translate } from "react-i18nify"
import { InverterInstanceId, useInverter } from "@victronenergy/mfd-modules"
import DeviceSettingModal from "../../../ui/DeviceSettingModal/DeviceSettingModal"
import { Options } from "./Options/Options"

interface Props {
  instanceId: InverterInstanceId
  isVebusInverter: boolean
  title?: string
  open: boolean
  onClose: (arg: boolean) => void
}

export const Modal: FC<Props> = observer(({ instanceId, isVebusInverter, title, open, onClose }) => {
  const source = isVebusInverter ? "vebus" : "inverter"

  const { mode, updateMode } = useInverter(instanceId, source)
  const [modeForSubmission, setModeForSubmission] = useState(Number(mode))

  useEffect(() => {
    setModeForSubmission(Number(mode))
  }, [mode])

  const closeModeModal = () => {
    onClose(!open)
    setModeForSubmission(Number(mode))
  }

  const submitMode = () => {
    updateMode(modeForSubmission)
    closeModeModal()
  }

  return (
    <DeviceSettingModal
      title={title}
      subtitle={translate("common.mode")}
      open={open}
      onClose={closeModeModal}
      onSet={submitMode}
    >
      <Options mode={modeForSubmission} onChange={setModeForSubmission} isVebus={isVebusInverter} />
    </DeviceSettingModal>
  )
})
