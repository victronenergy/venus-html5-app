import { FC, useEffect, useState } from "react"
import { translate } from "react-i18nify"
import DeviceSettingModal from "../../../ui/DeviceSettingModal/DeviceSettingModal"
import { useInverterCharger } from "@victronenergy/mfd-modules"
import { Options } from "./Options/Options"
import { observer } from "mobx-react"

interface Props {
  title?: string
  open: boolean
  onClose: (arg: boolean) => void
}

export const Modal: FC<Props> = observer(({ title, open, onClose }) => {
  const { mode, modeIsAdjustable, updateMode } = useInverterCharger()
  const [modeForSubmission, setModeForSubmission] = useState(Number(mode))

  useEffect(() => {
    setModeForSubmission(Number(mode))
  }, [mode])

  if (modeIsAdjustable !== 1) return null

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
      <Options modeForSubmission={modeForSubmission} onChange={setModeForSubmission} />
    </DeviceSettingModal>
  )
})
