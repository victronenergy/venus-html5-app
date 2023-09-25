import { FC, useEffect, useState } from "react"
import { translate } from "react-i18nify"
import { observer } from "mobx-react"
import { useAppStore, useInputLimit, useInputLimitSelector } from "@victronenergy/mfd-modules"
import DeviceSettingModal from "../DeviceSettingModal"
import { formatValue } from "../../../utils/formatters"
import { AmpList } from "./AmpList/AmpList"
import Button from "../Button"
import { LimitAdjuster } from "../LimitAdjuster/LimitAdjuster"

interface Props {
  inputId: number
  title: string
}

const InputLimitSelector: FC<Props> = ({ inputId, title }) => {
  const { locked } = useAppStore() // lock from theme settings
  const { currentLimitIsAdjustable } = useInputLimit(inputId)
  const { currentLimit, currentLimitMax, productId, updateLimit } = useInputLimitSelector(inputId)
  const [limitForSubmission, setLimitForSubmission] = useState(Number(currentLimit))
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false)

  const step = 0.5

  useEffect(() => {
    setLimitForSubmission(Number(currentLimit))
  }, [currentLimit])

  const increaseLimit = () => {
    if (limitForSubmission < (currentLimitMax ?? 100)) {
      const newValue = currentLimit % step !== 0 ? currentLimit + (step - (currentLimit % step)) : currentLimit + step
      console.log(newValue)
      setLimitForSubmission(newValue)
    }
  }

  const decreaseLimit = () => {
    if (limitForSubmission > 0) {
      const newValue = currentLimit % step !== 0 ? currentLimit - (currentLimit % step) : currentLimit - step

      setLimitForSubmission(newValue)
    }
  }

  const closeLimitModal = () => {
    setIsLimitModalOpen(false)
    setLimitForSubmission(Number(currentLimit))
  }

  const submitLimit = () => {
    updateLimit(limitForSubmission)
    closeLimitModal()
  }

  if (!currentLimitIsAdjustable) return null

  return (
    <>
      <Button
        disabled={locked}
        className="w-full mr-4"
        size="md"
        onClick={() => setIsLimitModalOpen(!isLimitModalOpen)}
      >
        {!!currentLimit ? formatValue(Number(currentLimit)) + "A" : 0 + "A"}
      </Button>
      <DeviceSettingModal
        title={title}
        subtitle={translate("common.inputCurrentLimit")}
        open={isLimitModalOpen}
        onClose={closeLimitModal}
        onSet={submitLimit}
      >
        <LimitAdjuster decreaseLimit={decreaseLimit} increaseLimit={increaseLimit} value={limitForSubmission} />
        <AmpList
          productId={productId}
          clickHandler={setLimitForSubmission}
          limitForSubmission={limitForSubmission}
          currentLimitMax={currentLimitMax}
        />
      </DeviceSettingModal>
    </>
  )
}

export default observer(InputLimitSelector)
