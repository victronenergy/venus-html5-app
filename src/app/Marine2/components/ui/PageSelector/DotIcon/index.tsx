import { FC } from "react"
import PlainDotIcon from "../../../../images/icons/selectors/dot.svg"
import DotSelectedIcon from "../../../../images/icons/selectors/dot-selected.svg"
import DotSelectedVerticalIcon from "../../../../images/icons/selectors/dot-selected-vert.svg"

interface DotProps {
  isCurrentPage: boolean
  isHorizontal: boolean
}

export const DotIcon: FC<DotProps> = ({ isCurrentPage, isHorizontal }) => {
  if (isCurrentPage && isHorizontal) {
    return <DotSelectedIcon className="w-px-16 h-px-8 text-victron-darkGray dark:text-white" />
  }

  if (isCurrentPage && !isHorizontal) {
    return <DotSelectedVerticalIcon className="w-px-8 h-px-16 text-victron-darkGray dark:text-white" />
  }

  return <PlainDotIcon className="w-px-8 h-px-8 text-victron-gray dark:text-victron-gray-400" />
}
