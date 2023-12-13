import React, { FC, ReactNode } from "react"
import InfoIcon from "../../../images/icons/info.svg"
import WarningIcon from "../../../images/icons/warning.svg"

type VariantType = "info" | "warning"

interface Props {
  variant: VariantType
  label?: string
  title: string
  text: string
}

export const Message: FC<Props> = ({ variant, label, title, text }) => {
  const variantToIcon: Record<VariantType, ReactNode> = {
    info: (
      <InfoIcon className="w-12 text-victron-blue dark:text-victron-blue-dark cursor-pointer outline-none" alt="Info" />
    ),
    warning: (
      <WarningIcon
        className="w-12 text-victron-red dark:text-victron-red-dark cursor-pointer outline-none"
        alt="Info"
      />
    ),
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 text-center">
      {variantToIcon[variant]}
      <span>
        {label && <label className="text-center text-sm">{label}</label>}
        <h3 className="text-center text-lg">{title}</h3>
      </span>
      <p className="text-base">{text}</p>
    </div>
  )
}
