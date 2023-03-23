import React, { useState } from "react"
import { observer } from "mobx-react"
import { useAppStore, useTheme } from "@elninotech/mfd-modules"
import { translate } from "react-i18nify"
import { Modal } from "../Modal"
import PreferencesIcon from "../../../images/icons/preferences.svg"
import ToggleSwitch from "../ToggleSwitch"
import RadioButton from "../RadioButton"
import { AppViews, useAppViewsStore } from "../../../modules/AppViews"
import Button from "../Button"

const SettingsMenu = () => {
  const { locked, toggleLocked } = useAppStore()
  const { themeStore } = useTheme()
  const appViewsStore = useAppViewsStore()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const setAutoMode = () => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    if (mediaQuery.matches && !themeStore.darkMode) {
      themeStore.setDarkMode(true)
    } else if (!mediaQuery.matches && themeStore.darkMode) {
      themeStore.setDarkMode(false)
    }
  }

  const openRemoteConsole = () => {
    appViewsStore.setView(AppViews.REMOTE_CONSOLE)
  }

  return (
    <div
      className="fixed right-1 bottom-4 dark:text-white cursor-pointer w-16 outline-none"
      onClick={() => setIsModalOpen(!isModalOpen)}
    >
      <div className="flex justify-center items-center w-full">
        <div className="pl-8 pt-4 w-16 h-12">
          {/* todo: fix types for svg */}
          {/* @ts-ignore */}
          <PreferencesIcon className="w-1" alt={"Settings"} />
        </div>
        <Modal.Frame
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
          }}
          className="w-3/4 max-w-md mb-20 mr-6 bottom-0 right-0"
        >
          <Modal.Body>
            <div className="flex flex-col">
              <div className="text-sm mb-2 dark:text-white md:mb-4 md-m:text-base">
                <label className="flex justify-between items-center pb-4">
                  <span className="mr-1 text-sm sm-m:mr-2 sm-l:text-base">{translate("locker.lockMessage")}</span>
                  <ToggleSwitch onChange={toggleLocked} selected={locked} />
                </label>
                <div className="border border-victron-gray-300"></div>
                <label className="text-xs text-victron-gray sm-l:text-sm">{translate("common.mode")}</label>
                <label
                  className="flex justify-between items-center pt-2 pb-4 sm-m:pb-6 sm-l:pb-8"
                  onClick={() => themeStore.setDarkMode(false)}
                >
                  <span className="mr-1 text-sm sm-m:mr-2 sm-l:text-base">{translate("common.light")}</span>
                  <RadioButton
                    onChange={() => themeStore.setDarkMode(false)}
                    selected={!themeStore.darkMode}
                    disabled={locked}
                  />
                </label>
                <label
                  className="flex justify-between items-center pb-4 sm-m:pb-6 sm-l:pb-8"
                  onClick={() => themeStore.setDarkMode(true)}
                >
                  <span className="mr-1 text-sm sm-m:mr-2 sm-l:text-base">{translate("common.dark")}</span>
                  <RadioButton
                    onChange={() => themeStore.setDarkMode(true)}
                    selected={themeStore.darkMode}
                    disabled={locked}
                  />
                </label>
                <label className="flex justify-between items-center pb-4 sm-m:pb-6 sm-l:pb-8">
                  <span className="mr-1 text-sm sm-m:mr-2 sm-l:text-base">{translate("common.auto")}</span>
                  <ToggleSwitch onChange={setAutoMode} disabled={locked} />
                </label>
                <div className="border border-victron-gray-300"></div>
              </div>
            </div>
          </Modal.Body>
          <Button onClick={openRemoteConsole} className="w-full" size="md">
            {translate("header.remoteConsole")}
          </Button>
        </Modal.Frame>
      </div>
    </div>
  )
}

export default observer(SettingsMenu)
