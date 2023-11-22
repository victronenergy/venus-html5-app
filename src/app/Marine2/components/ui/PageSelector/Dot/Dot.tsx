import { FC } from "react"
import DotIcon from "../../../../images/icons/selectors/dot.svg"
import DotSelectedIcon from "../../../../images/icons/selectors/dot-selected.svg"
import DotSelectedVerticalIcon from "../../../../images/icons/selectors/dot-selected-vert.svg"

interface DotProps {
  isCurrentPage: boolean
  isHorizontal: boolean
}

export const Dot: FC<DotProps> = ({ isCurrentPage, isHorizontal }) => {
  if (isCurrentPage && isHorizontal) {
    /* todo: fix types for svg */
    /* @ts-ignore */
    return <DotSelectedIcon className="text-victron-darkGray dark:text-white" />
  }

  if (isCurrentPage && !isHorizontal) {
    /* todo: fix types for svg */
    /* @ts-ignore */
    return <DotSelectedVerticalIcon className="text-victron-darkGray dark:text-white" />
  }

  /* todo: fix types for svg */
  /* @ts-ignore */
  return <DotIcon className="text-victron-gray dark:text-victron-gray-400" />
}
