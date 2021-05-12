import Modal from "../../../components/Modal"
import { AC_MODE } from "../../utils/constants"
import { acModeFormatter } from "./AcMode"

type AcModeModalProps = {
  mode: number
  limit?: number
  updateMode: Function
  updateLimit?: Function
  onClose: Function
}

export const AcModeModal = (props: AcModeModalProps) => {
  return (
    <Modal title={"AC Mode"} onClose={props.onClose}>
      <div className="ac_mode_modal indicator-main--small">
        <div className={"name"}>Select mode</div>
        <div className={"ac_mode_modal__group"}>
          {Object.values(AC_MODE.MODES).map((mode) => (
            <button
              key={mode}
              className={"ac_mode_modal__button" + (props.mode === mode ? " success" : "")}
              onClick={() => props.updateMode(mode)}
            >
              {acModeFormatter(mode)}
            </button>
          ))}
        </div>

        {props.updateLimit && (
          <>
            <div className={"name"}>Select shore input limit</div>
            <div className={"ac_mode_modal__group"}>
              {Object.values(AC_MODE.LIMITS).map((limit) => (
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
