import Modal from "../../../components/Modal"
import { AC_MODE } from "../../utils/constants"
import { acModeFormatter } from "./AcMode"
import Logger from "../../../utils/logger"
import { translate, Translate } from "react-i18nify"

/**
 * - Mask the Product id with `0xFF00`
 * - If the result is `0x1900` or `0x2600` it is an EU model (230VAC)
 * - If the result is `0x2000` or `0x2700` it is an US model (120VAC)
 */

const getSuggestedAmperageValuesList = (productId: number) => {
  const result = productId & 0xff00
  if (result === 0x1900 || result === 0x2600) {
    return AC_MODE.LIMITS_EU
  } else if (result === 0x2000 || result === 0x2700) {
    return AC_MODE.LIMITS_US
  } else {
    Logger.warn(`Could not determine amperage US/EU for product id ${productId}`)
    return AC_MODE.LIMITS_US
  }
}

type AcModeModalProps = {
  productId: number
  mode: number
  limit?: number
  updateMode: Function
  updateLimit?: Function
  onClose: Function
}

export const AcModeModal = (props: AcModeModalProps) => {
  return (
    <Modal title={translate("acMode.title")} onClose={props.onClose}>
      <div className="ac_mode_modal indicator-main--small">
        <div className={"name"}>
          <Translate value="acMode.modal.name" />
        </div>
        <div className={"ac_mode_modal__group"}>
          {Object.values(AC_MODE.MODES).map((mode) => (
            <button
              key={mode}
              className={"ac_mode_modal__button" + (props.mode === mode ? " success" : "")}
              onClick={() => props.updateMode(mode)}
            >
              <Translate value={`common.${acModeFormatter(mode)}`} />
            </button>
          ))}
        </div>

        {props.updateLimit && (
          <>
            <div className={"name"}>
              <Translate value="acMode.modal.updateLimit" />
            </div>
            <div className={"ac_mode_modal__group"}>
              {Object.values(getSuggestedAmperageValuesList(props.productId)).map((limit) => (
                <button
                  key={limit}
                  className={"ac_mode_modal__button" + (props.limit === limit ? " success" : "")}
                  onClick={() => props.updateLimit!(limit)}
                >
                  {limit + "A"}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
