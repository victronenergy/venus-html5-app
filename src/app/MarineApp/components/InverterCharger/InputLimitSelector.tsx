import React, { useEffect, useState } from "react"

import { useInputLimitSelector, useShorePowerInput } from "@victronenergy/mfd-modules"

import SelectorButton from "../SelectorButton"

import Logger from "../../../utils/logger"
import Loading from "../Loading"

import "./InputLimitSelector.scss"
import { observer } from "mobx-react"
import { Translate } from "react-i18nify"

const USAmperage = [10, 15, 20, 30, 50, 100]
const EUAmperage = [3, 6, 10, 13, 16, 25, 32, 63]

/**
 * - Mask the Product id with `0xFF00`
 * - If the result is `0x1900` or `0x2600` it is an EU model (230VAC)
 * - If the result is `0x2000` or `0x2700` it is an US model (120VAC)
 */

const getSuggestedAmperageValuesList = (productId: number) => {
  const result = productId & 0xff00
  if (result === 0x1900 || result === 0x2600) {
    return EUAmperage
  } else if (result === 0x2000 || result === 0x2700) {
    return USAmperage
  } else {
    Logger.warn(`Could not determine amperage US/EU for product id ${productId}`)
    return USAmperage
  }
}

type InputLimitSelectorProps = {
  onLimitSelected: Function
  inputId: number
}

const InputLimitSelector = observer(({ inputId, onLimitSelected }: InputLimitSelectorProps) => {
  const { currentLimit, currentLimitMax, productId, updateLimit } = useInputLimitSelector(inputId)

  const selectedHandler = (value: number) => {
    updateLimit(value)
    onLimitSelected(value)
  }

  const firstSelectorButtonNode = React.useRef<HTMLDivElement>(null)
  const amperageContainerNode = React.useRef<HTMLDivElement>(null)

  const [showEmpties, toggleShowEmpties] = useState(false)

  useEffect(() => {
    if (
      amperageContainerNode &&
      firstSelectorButtonNode &&
      Number(amperageContainerNode.current?.clientHeight) > Number(firstSelectorButtonNode.current?.clientHeight) * 2
    ) {
      toggleShowEmpties(!showEmpties)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const amperageList = getSuggestedAmperageValuesList(productId).filter((value) => {
    return value <= (currentLimitMax ?? 100)
  })

  return (
    <div className="amperage-selector__container">
      <div className="amperage-selector" ref={amperageContainerNode}>
        <div className="text text--large text--center amperage-selector__description">
          <Translate value="acMode.modal.updateLimit" />
        </div>
        {amperageList.map((currentValue, index) => {
          const ref = index === 0 ? firstSelectorButtonNode : null
          return (
            <div ref={ref}>
              <SelectorButton
                key={currentValue}
                className={"selector-button__amperage text--very-large"}
                active={currentLimit === currentValue}
                onClick={() => selectedHandler(currentValue)}
                large
              >
                {currentValue}A
              </SelectorButton>
            </div>
          )
        })}

        {
          // Add these to "cheat" the flexbox and allow center alignment of selector buttons
          // AND left alignment to the last row of buttons if multilined
          showEmpties && amperageList.map((amperage) => <div className="empty" key={amperage} />)
        }
      </div>
    </div>
  )
})

const InputLimitSelectorWrapper = observer((props: any) => {
  const { inputId } = useShorePowerInput()
  if (inputId) {
    return <InputLimitSelector inputId={inputId} {...props} />
  } else {
    return <Loading />
  }
})

export default InputLimitSelectorWrapper
