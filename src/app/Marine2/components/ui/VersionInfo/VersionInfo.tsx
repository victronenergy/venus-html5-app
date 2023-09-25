import { observer } from "mobx-react"
import { useAppStore, useMqtt } from "@victronenergy/mfd-modules"
import { Translate, translate } from "react-i18nify"
import { Modal } from "../Modal"
import { BUILD_TIMESTAMP } from "../../../utils/constants"
import packageInfo from "../../../../../../package.json"
import React, { useState } from "react"
import LogoIcon from "../../../images/logo.svg"
import LogoOnlyIcon from "../../../images/logo-only.svg"
import { AppViews, useAppViewsStore } from "../../../modules/AppViews"
import Button from "../Button"

const VersionInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { humanReadableFirmwareVersion } = useAppStore()
  const appViewsStore = useAppViewsStore()
  const { portalId } = useMqtt()

  const openDiagnostics = () => {
    appViewsStore.setView(AppViews.DIAGNOSTICS)
  }

  const toggleVersionInfo = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div
      className="w-40 min-w-0 shrink overflow-hidden cursor-pointer py-3 px-5 outline-none"
      onClick={toggleVersionInfo}
    >
      {/* todo: fix types for svg */}
      {/* @ts-ignore */}
      <LogoIcon className="w-32 text-victron-blue dark:text-white hidden sm:block" alt="Victron Energy" />
      {/* todo: fix types for svg */}
      {/* @ts-ignore */}
      <LogoOnlyIcon className="w-10 text-black dark:text-white sm:hidden block" alt="Victron Energy" />
      <Modal.Frame
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="w-full max-w-sm mb-16 ml-6 bottom-0 -left-4"
      >
        <Modal.Body variant="popUp">
          <div className="text-sm dark:text-white md-m:text-base lg-s:text-sm lg-l:text-base">
            {/* todo: fix types for svg */}
            {/* @ts-ignore */}
            <LogoIcon className="w-24 text-black dark:text-white" alt="Victron Energy" />
            <div className="mt-1 py-2">
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

            <div className="mt-2">
              <Button onClick={openDiagnostics} className="w-full mt-1" size="md">
                {translate("diagnostics.diagnostics")}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal.Frame>
    </div>
  )
}

export default observer(VersionInfo)
