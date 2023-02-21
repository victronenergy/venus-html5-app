import { observer } from "mobx-react"
import { useAppStore, useVrmStore } from "@elninotech/mfd-modules"
import { Translate, translate } from "react-i18nify"
import { Modal } from "../Modal"
import { BUILD_TIMESTAMP } from "../../../utils/constants"
import packageInfo from "../../../../../../package.json"
import React, { useState } from "react"
import LogoIcon from "../../../images/logo.svg"
import { AppViews, useAppViewsStore } from "../../../modules/AppViews"

const VersionInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { portalId = "-", siteId = "-" } = useVrmStore()
  const { humanReadableFirmwareVersion } = useAppStore()
  const appViewsStore = useAppViewsStore()

  const openDiagnostics = () => {
    appViewsStore.setView(AppViews.DIAGNOSTICS)
  }

  return (
    <div className="cursor-pointer pl-4">
      <button onClick={() => setIsModalOpen(!isModalOpen)}>
        {/* todo: fix types for svg */}
        {/* @ts-ignore */}
        <LogoIcon className={"w-32 text-black dark:text-white"} alt={"Victron Energy"} />
      </button>
      <div className="flex justify-center items-center w-full">
        <Modal.Frame
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
          }}
          className="w-full max-w-sm mb-20 ml-6 bottom-0 left-0"
        >
          <Modal.Body>
            <div className="flex flex-col">
              <div className="text-base mb-2 dark:text-white md:mb-4 md-m:text-lg lg-s:text-base lg-l:text-xl">
                <div className="flex flex-col">
                  <div>
                    {/* todo: fix types for svg */}
                    {/* @ts-ignore */}
                    <LogoIcon className={"w-24 text-black dark:text-white"} alt={"Victron Energy"} />
                  </div>
                  <div className="flex flex-col">
                    <div className="py-2">
                      <Translate
                        value="versionInfo.version"
                        version={`${packageInfo.version} ${process.env.REACT_APP_WHITELABEL}`}
                      />
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="min-w-sm">{translate("versionInfo.buildDate")}</div>
                      <div>{BUILD_TIMESTAMP}</div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div>{translate("versionInfo.venusOs")}</div>
                      <div>{humanReadableFirmwareVersion}</div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div>{translate("versionInfo.identifier")}</div>
                      <div>{portalId}</div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div>{translate("versionInfo.vrmPortID")}</div>
                      <div>{siteId}</div>
                    </div>
                  </div>
                  <div className={"pt-2"}>
                    <span className={"underline"} onClick={openDiagnostics}>
                      {translate("diagnostics.diagnostics")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal.Frame>
      </div>
    </div>
  )
}

export default observer(VersionInfo)
