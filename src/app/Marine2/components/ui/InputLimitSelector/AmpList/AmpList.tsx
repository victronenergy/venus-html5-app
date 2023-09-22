import { FC } from "react"
import classnames from "classnames"

interface Props {
  productId: number
  clickHandler: (arg: number) => void
  limitForSubmission: number
  currentLimitMax: number
}

export const AmpList: FC<Props> = ({ productId, clickHandler, limitForSubmission, currentLimitMax }) => {
  // TODO refactor, move to constants.
  const USAmperage = [10, 15, 20, 30, 50, 100]
  const EUAmperage = [3, 6, 10, 13, 16, 25, 32, 63]

  // TODO refactor, move to utils.
  // - Mask the Product id with `0xFF00`
  // - If the result is `0x1900` or `0x2600` it is an EU model (230VAC)
  // - If the result is `0x2000` or `0x2700` it is a US model (120VAC)
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

  const amperageList = getSuggestedAmperageValuesList(productId).filter((value) => value <= (currentLimitMax ?? 100))

  const getClassNames = (value: number) =>
    classnames("h-12 flex justify-center items-center -mt-0.5", {
      "text-base": amperageList.length === 8,
      "text-lg": amperageList.length === 7,
      "bg-victron-blue": value === limitForSubmission,
    })

  const style = {
    width: `${33 / amperageList.length}rem`,
  }

  return (
    <div className="flex justify-between h-12 mt-8 bg-victron-blue/30 border-2 border-victron-blue rounded-md overflow-hidden">
      {amperageList.map((value) => (
        <button key={value} style={style} className={getClassNames(value)} onClick={() => clickHandler(value)}>
          {value}
        </button>
      ))}
    </div>
  )
}
