import { FC, useEffect, useState } from "react"
import { observer } from "mobx-react"
import { useAppStore, useInputLimit, useInputLimitSelector } from "@victronenergy/mfd-modules"
import DeviceSettingModal from "../DeviceSettingModal"

import { AmpList } from "./AmpList/AmpList"
import Button from "../Button"
import { LimitAdjuster } from "../LimitAdjuster/LimitAdjuster"
import { CURRENT_LIMIT_STEP } from "../../../utils/constants/generic"
import {
  currentStepDecrementFor,
  currentStepIncrementFor,
  isCurrentStepDividable,
} from "../../../utils/helpers/current-limit-adjuster"
import { formatValue } from "../../../utils/formatters/generic"

interface Props {
  instanceId: number
  inputId: number
  title: string
  subtitle: string
}

const InputLimitSelector: FC<Props> = ({ instanceId, inputId, title, subtitle }) => {
  const { locked } = useAppStore() // lock from theme settings
  const { currentLimitIsAdjustable } = useInputLimit(instanceId, inputId)
  const { currentLimit, currentLimitMax, productId, updateLimit } = useInputLimitSelector(instanceId, inputId)
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
        {currentLimit ? formatValue(Number(currentLimit)) + "A" : 0 + "A"}
      </Button>
      <DeviceSettingModal
        title={title}
        subtitle={subtitle}
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
