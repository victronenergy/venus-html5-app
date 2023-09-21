import { FC, useEffect, useState } from "react"
import { translate } from "react-i18nify"
import { observer } from "mobx-react"
import { useAppStore, useInputLimit, useInputLimitSelector } from "@victronenergy/mfd-modules"
import DeviceSettingModal from "../DeviceSettingModal"
import { formatValue } from "../../../utils/formatters"
import { AmpList } from "./AmpList/AmpList"
import Button from "../Button"

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
    if (limitForSubmission < (currentLimitMax ?? 100)) setLimitForSubmission(limitForSubmission + 1)
  }

  const decreaseLimit = () => {
    if (limitForSubmission > 0) setLimitForSubmission(limitForSubmission - 1)
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
      <DeviceSettingModal open={isLimitModalOpen} onClose={closeLimitModal} onSet={submitLimit} width={"lg"}>
        <div className="flex justify-center">
          <div className="w-[27rem] md:w-[33rem] lg:w-[33rem]">
            <label className="flex w-full justify-center text-lg mb-3">
              {title + " " + translate("common.inputCurrentLimit")}
            </label>
            <div className="flex justify-between mt-10">
              <button
                className="w-28 md:w-36 lg:w-36 h-20 bg-victron-blue/70 border-0 rounded-md text-xl"
                onClick={decreaseLimit}
              >
                -
              </button>
              <div className="flex text-2xl md:text-3xl lg:text-3xl">
                <span>{formatValue(limitForSubmission ?? 0)}</span>
                <span className="text-victron-gray/70 pl-1">A</span>
              </div>
              <button
                className="w-28 md:w-36 lg:w-36 h-20 bg-victron-blue/70 border-0 rounded-md text-xl"
                onClick={increaseLimit}
              >
                +
              </button>
            </div>

            <AmpList
              productId={productId}
              clickHandler={setLimitForSubmission}
              limitForSubmission={limitForSubmission}
              currentLimitMax={currentLimitMax}
            />
          </div>
        </div>
      </DeviceSettingModal>
    </>
  )
}

export default observer(InputLimitSelector)
