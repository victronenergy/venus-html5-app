import { useState, useEffect } from "react"
import { observer } from "mobx-react"
import { useAppStore, useTheme } from "@victronenergy/mfd-modules"
import { translate } from "react-i18nify"
import { Modal } from "../Modal"
import PreferencesIcon from "../../../images/icons/preferences.svg"
import CloseIcon from "../../../images/icons/close.svg"
import ToggleSwitch from "../ToggleSwitch"
import RadioButton from "../RadioButton"
import { AppViews, useAppViewsStore } from "../../../modules/AppViews"
import Button from "../Button"
import classNames from "classnames"

const SettingsMenu = () => {
  const { locked, toggleLocked } = useAppStore()
  const { themeStore } = useTheme()
  const appViewsStore = useAppViewsStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isHorizontal, setIsHorizontal] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 3 * window.innerHeight || window.innerHeight < 400) {
        setIsHorizontal(true)
      } else {
        setIsHorizontal(false)
      }
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    // Clean up after unmount
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

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
    <div className="dark:text-white cursor-pointer w-[64px] outline-none" onClick={() => setIsModalOpen(!isModalOpen)}>
      <div className="flex justify-center items-center w-full">
        {!isModalOpen ? (
          <div className="h-full">
            {/* todo: fix types for svg */}
            {/* @ts-ignore */}
            <PreferencesIcon alt={"Settings"} />
          </div>
        ) : (
          <>
            <CloseIcon
              // @ts-ignore
              className="w-[32px] ml-auto mr-2 opacity-1 z-20 text-white dark:text-victron-blue"
              onClick={() => setIsModalOpen(false)}
            />
          </>
        )}

        <Modal.Frame
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
          }}
          className={classNames("w-3/4 max-w-md bottom-0 right-0", isHorizontal ? "mr-14 mb-2" : "mb-14 mr-2")}
        >
          <Modal.Body variant="popUp">
            <div className="text-sm dark:text-white md-m:text-base">
              <label className="flex justify-between items-center pb-4">
                <span className="mr-1 text-sm sm-m:mr-2 sm-l:text-base text-black dark:text-white">
                  {translate("locker.lockMessage")}
                </span>
                <ToggleSwitch onChange={toggleLocked} selected={locked} />
              </label>
              <div className="mr-2 mb-2 sm-l:mb-4 text-victron-gray-400 text-xs sm-l:text-sm dark:text-victron-gray-500">
                {translate("locker.lockDescription")}
              </div>
              <div className="border border-victron-gray-600 dark:border-victron-gray-300"></div>
              <label className="text-xs text-victron-gray-400 sm-l:text-sm dark:text-victron-gray-500">
                {translate("common.mode")}
              </label>
              <label
                className="flex justify-between items-center pt-2 pb-4 sm-m:pb-6 sm-l:pb-8"
                onClick={() => themeStore.setDarkMode(false)}
              >
                <span className="mr-1 text-sm sm-m:mr-2 sm-l:text-base text-black dark:text-white">
                  {translate("common.light")}
                </span>
                <RadioButton onChange={() => themeStore.setDarkMode(false)} selected={!themeStore.darkMode} />
              </label>
              <label
                className="flex justify-between items-center pb-4 sm-m:pb-6 sm-l:pb-8"
                onClick={() => themeStore.setDarkMode(true)}
              >
                <span className="mr-1 text-sm sm-m:mr-2 sm-l:text-base text-black dark:text-white">
                  {translate("common.dark")}
                </span>
                <RadioButton onChange={() => themeStore.setDarkMode(true)} selected={themeStore.darkMode} />
              </label>
              <label className="flex justify-between items-center pb-4 sm-m:pb-6 sm-l:pb-8">
                <span className="mr-1 text-sm sm-m:mr-2 sm-l:text-base text-black dark:text-white">
                  {translate("common.auto")}
                </span>
                <ToggleSwitch onChange={setAutoMode} />
              </label>
              <Button onClick={openRemoteConsole} className="w-full" size="md">
                {translate("header.remoteConsole")}
              </Button>
            </div>
          </Modal.Body>
        </Modal.Frame>
      </div>
    </div>
  )
}

export default observer(SettingsMenu)
