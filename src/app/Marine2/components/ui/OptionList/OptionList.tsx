import { FC, ReactNode } from "react"

interface OptionListProps {
  children: ReactNode
}
export const OptionList: FC<OptionListProps> = ({ children }) => (
  <div className="divide-y divide-outline-primary text-base">{children}</div>
)
