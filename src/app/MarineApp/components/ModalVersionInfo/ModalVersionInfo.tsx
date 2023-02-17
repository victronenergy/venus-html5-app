import Modal from "app/components/Modal"
import { forwardRef, useImperativeHandle, useState } from "react"
import { translate, Translate } from "react-i18nify"
import "./ModalVersionInfo.scss"
import Logo from "../../images/icons/logo.png"
import { SIZE_EXTRA_WIDE } from "app/components/Card"

import packageInfo from "../../../../../package.json"
import { BUILD_TIMESTAMP } from "app/utils/constants"
import { useVrmStore, useAppStore } from "@elninotech/mfd-modules"
import { observer } from "mobx-react"

export const ModalVersionInfo = observer(
  forwardRef((_, ref) => {
    const [isOpen, setOpen] = useState(false)
    const { portalId = "-", siteId = "-" } = useVrmStore()
    const { humanReadableFirmwareVersion } = useAppStore()

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
    }))

    return (
      <>
        {isOpen && (
          <Modal
            cardProps={{ size: SIZE_EXTRA_WIDE, className: "metric modal-marine-card" }}
            onClose={() => setOpen(false)}
            title={translate("header.versionInfo")}
          >
            <div className="modal-ver-container">
              <div className="left-info">
                <div className="left-info-content">
                  <img src={Logo} alt={"Marine logo"} />
                  <div className="version-item">
                    <Translate
                      value="versionInfo.version"
                      version={`${packageInfo.version} ${process.env.REACT_APP_WHITELABEL}`}
                    />
                  </div>
                </div>
              </div>
              <div className="right-info">
                <div className="first-column">
                  <p>
                    <Translate value="versionInfo.buildDate" />
                  </p>
                  <p>
                    <Translate value="versionInfo.venusOs" />
                  </p>
                  <p>
                    <Translate value="versionInfo.identifier" />
                  </p>
                  <p>
                    <Translate value="versionInfo.vrmPortID" />
                  </p>
                </div>
                <div className="second-column">
                  <p>{BUILD_TIMESTAMP}</p>
                  <p>{humanReadableFirmwareVersion}</p>
                  <p>{portalId}</p>
                  <p>{siteId}</p>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </>
    )
  })
)
