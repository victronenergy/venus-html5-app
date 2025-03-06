import { useEffect, useState } from "react"
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
    <div className="text-content-victronBlue cursor-pointer outline-none" onClick={() => setIsModalOpen(!isModalOpen)}>
      <div className="flex justify-center items-center w-full">
        {!isModalOpen ? (
          <div className="h-full">
            <PreferencesIcon className="w-px-44 h-px-44 justify-center p-3" alt={"Settings"} />
          </div>
        ) : (
          <>
            <CloseIcon
              className="w-px-44 h-px-44 justify-center p-3 opacity-1 z-20 text-content-victronBlue"
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
            <div className="text-sm md-m:text-base">
              <label className="flex justify-between items-center pb-4">
                <span className="mr-1 text-sm sm-m:mr-2 sm-l:text-base text-content-primary">
                  {translate("locker.lockMessage")}
                </span>
                <ToggleSwitch id="ToggleLocked" onChange={toggleLocked} selected={locked} />
              </label>
              <div className="mr-2 mb-2 sm-l:mb-4 text-xs sm-l:text-sm text-content-tertiary">
                {translate("locker.lockDescription")}
              </div>
              <div className="border border-surface-victronGray"></div>
              <label className="text-xs sm-l:text-sm text-content-secondary">{translate("common.mode")}</label>
              <label
                className="flex justify-between items-center pt-2 pb-4 sm-m:pb-6 sm-l:pb-8"
                onClick={() => themeStore.setDarkMode(false)}
              >
                <span className="mr-1 text-sm sm-m:mr-2 sm-l:text-base text-content-primary">
                  {translate("common.light")}
                </span>
                <RadioButton onChange={() => themeStore.setDarkMode(false)} selected={!themeStore.darkMode} />
              </label>
              <label
                className="flex justify-between items-center pb-4 sm-m:pb-6 sm-l:pb-8"
                onClick={() => themeStore.setDarkMode(true)}
              >
                <span className="mr-1 text-sm sm-m:mr-2 sm-l:text-base text-content-primary">
                  {translate("common.dark")}
                </span>
                <RadioButton onChange={() => themeStore.setDarkMode(true)} selected={themeStore.darkMode} />
              </label>
              <label className="flex justify-between items-center pb-4 sm-m:pb-6 sm-l:pb-8">
                <span className="mr-1 text-sm sm-m:mr-2 sm-l:text-base text-content-primary">
                  {translate("common.auto")}
                </span>
                <ToggleSwitch id="ToggleAutoMode" onChange={setAutoMode} />
              </label>
              <label className="flex justify-between items-center pb-4 sm-m:pb-6 sm-l:pb-8">
                <span className="mr-1 text-sm sm-m:mr-2 sm-l:text-base text-content-primary">
                  {translate("common.night")}
                </span>
                <ToggleSwitch
                  id="ToggleNightMode"
                  onChange={() => {
                    themeStore.setNightMode(!themeStore.nightMode)
                    if (themeStore.nightMode) {
                      themeStore.setDarkMode(true)
                    }
                  }}
                  selected={themeStore.nightMode}
                />
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
