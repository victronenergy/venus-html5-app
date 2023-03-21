import { useEffect, useState } from "react"
import { useInputLimit, useInputLimitSelector } from "@elninotech/mfd-modules"
import Button from "../Button"
import DeviceSettingModal from "../DeviceSettingModal"
import { translate } from "react-i18nify"
import classnames from "classnames"
import { observer } from "mobx-react"

const InputLimitSelector = ({ inputId }: Props) => {
  const USAmperage = [10, 15, 20, 30, 50, 100]
  const EUAmperage = [3, 6, 10, 13, 16, 25, 32, 63]

  /**
   * - Mask the Product id with `0xFF00`
   * - If the result is `0x1900` or `0x2600` it is an EU model (230VAC)
   * - If the result is `0x2000` or `0x2700` it is a US model (120VAC)
   */

  const getSuggestedAmperageValuesList = (productId: number) => {
    const result = productId & 0xff00
    if (result === 0x1900 || result === 0x2600) {
      return EUAmperage
    } else if (result === 0x2000 || result === 0x2700) {
      return USAmperage
    } else {
      console.log(`Could not determine amperage US/EU for product id ${productId}`)
      return USAmperage
    }
  }

  const { currentLimitIsAdjustable } = useInputLimit(inputId)
  const { currentLimit, currentLimitMax, productId, updateLimit } = useInputLimitSelector(inputId)
  const amperageList = getSuggestedAmperageValuesList(productId).filter((value) => {
    return value <= (currentLimitMax ?? 100)
  })

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
      <Button className="w-full mr-4" size="md" onClick={() => setIsLimitModalOpen(!isLimitModalOpen)}>
        {!!currentLimit ? Number(currentLimit) + "A" : 0 + "A"}
      </Button>
      <DeviceSettingModal open={isLimitModalOpen} onClose={closeLimitModal} onSet={submitLimit} width={"lg"}>
        <label className="flex w-full justify-center text-lg mb-3">{translate("devices.Input current limit")}</label>
        <div className="flex flex-row justify-center mt-10">
          <button
            className="w-28 md:w-36 lg:w-36 h-20 bg-victron-blue/70 border-0 rounded-md text-xl mr-14"
            onClick={decreaseLimit}
          >
            -
          </button>
          <div className="w-24 md:w-32 lg:w-32 flex flex-row pr-2 items-center text-2xl md:text-3xl lg:text-3xl">
            <div>{limitForSubmission ?? 0}</div>
            <div className={"text-victron-gray/70 pl-1"}>A</div>
          </div>
          <button
            className="w-28 md:w-36 lg:w-36 h-20 bg-victron-blue/70 border-0 rounded-md text-xl ml-14"
            onClick={increaseLimit}
          >
            +
          </button>
        </div>
        <div className="flex w-full justify-center mt-10 mb-12">
          <div className="w-[27rem] md:w-[33rem] lg:w-[33rem] h-12 bg-victron-blue/30 border-2 border-victron-blue rounded-md flex flex-row justify-between">
            {amperageList.map((value) => (
              <button
                key={value}
                style={{ width: `${33 / amperageList.length}rem` }}
                className={classnames("h-12 flex justify-center items-center -mt-0.5", {
                  " text-base": amperageList.length === 8,
                  " text-lg": amperageList.length === 7,
                  " bg-victron-blue rounded-md": value === limitForSubmission,
                })}
                onClick={() => {
                  setLimitForSubmission(value)
                }}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </DeviceSettingModal>
    </>
  )
}

interface Props {
  inputId: number
}

export default observer(InputLimitSelector)
