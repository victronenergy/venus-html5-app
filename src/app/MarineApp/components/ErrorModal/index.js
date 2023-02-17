import Modal from "app/components/Modal"
import { SIZE_EXTRA_WIDE } from "app/components/Card"
import Error from "../Views/Error"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import { useErrorHandlerStore } from "app/components/ErrorHandlerModule/ErrorHandler.store"
import "./ErrorModal.scss"

export const ErrorModal = observer(() => {
  const errorHandler = useErrorHandlerStore()

  return (
    <>
      {!!errorHandler.error && (
        <Modal
          cardProps={{ size: SIZE_EXTRA_WIDE, className: "metric modal-marine-card modal-marine-error" }}
          onClose={() => {
            // if user decides to do nothing about the error
            window.location.reload()
          }}
        >
          <div className="error-modal">
            <Error
              error={toJS(errorHandler.error)}
              ignoreButton
              handleIgnore={() => {
                errorHandler.setError(null)
              }}
            />
          </div>
        </Modal>
      )}
    </>
  )
})
