import { FC, useEffect, useState } from "react"
import { translate } from "react-i18nify"
import { observer } from "mobx-react"
import { useAppStore, useInputLimit, useInputLimitSelector } from "@victronenergy/mfd-modules"
import DeviceSettingModal from "../DeviceSettingModal"
import { formatValue } from "../../../utils/formatters"
import { AmpList } from "./AmpList/AmpList"
import Button from "../Button"
import { LimitAdjuster } from "../LimitAdjuster/LimitAdjuster"
import { CURRENT_LIMIT_STEP } from "../../../utils/constants/generic"
import {
  currentStepDecrementFor,
  currentStepIncrementFor,
  isCurrentStepDividable,
} from "../../../utils/helpers/current-limit-adjuster"

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

  useEffect(() => {
    setLimitForSubmission(Number(currentLimit))
  }, [currentLimit])

  const increaseLimit = () => {
    if (limitForSubmission < (currentLimitMax ?? 100)) {
      isCurrentStepDividable(limitForSubmission)
        ? setLimitForSubmission(limitForSubmission + CURRENT_LIMIT_STEP)
        : setLimitForSubmission(currentStepIncrementFor(limitForSubmission))
    }
  }

  const decreaseLimit = () => {
    if (limitForSubmission > 0) {
      isCurrentStepDividable(limitForSubmission)
        ? setLimitForSubmission(limitForSubmission - CURRENT_LIMIT_STEP)
        : setLimitForSubmission(currentStepDecrementFor(limitForSubmission))
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
