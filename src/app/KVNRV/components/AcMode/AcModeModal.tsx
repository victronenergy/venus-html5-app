import Modal from "../../../components/Modal"
import { AC_MODE } from "../../constants/constants"
import { acModeFormatter } from "./AcMode"

type AcModeModalProps = {
  mode: number
  inputLimit: number
  onClose: Function
  onModeInput: Function
  onLimitInput: Function
}
const AcModeModal = (props: AcModeModalProps) => {
  return (
    <Modal title={"AC Mode"} onClose={props.onClose}>
      <div className="ac_mode_modal indicator-main--small">
        <div className={"name"}>Select mode</div>
        <div className={"ac_mode_modal__group"}>
          {Object.values(AC_MODE.MODES).map((mode) => (
            <button
              key={mode}
              className={"ac_mode_modal__button" + (props.mode === mode ? " success" : "")}
              onClick={() => props.onModeInput(mode)}
            >
              {acModeFormatter(mode)}
            </button>
          ))}
        </div>

        <div className={"name"}>Select shore input limit</div>
        <div className={"ac_mode_modal__group"}>
          {Object.values(AC_MODE.LIMITS).map((limit) => (
            <button
              key={limit}
              className={"ac_mode_modal__button" + (props.inputLimit === limit ? " success" : "")}
              onClick={() => props.onLimitInput(limit)}
            >
              {limit + "A"}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default AcModeModal
