import React from "react"

const DiagnosticsTable = ({ title, diagnostics }: Props) => {
  return (
    <div>
      <h2 className={"text-sm md-m:text-base mb-2"}>{title}</h2>
      <table className={"table-fixed border-collapse w-full text-xs md-m:text-sm"}>
        <tbody>
          {diagnostics.map(({ property, value }) => (
            <tr
              key={property}
              className={"border-b border-t border-victron-gray dark:border-victron-gray-dark align-top"}
            >
              <td className={"w-1/3 py-2"}>{property}</td>
              <td className={"py-2"}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface Props {
  diagnostics: { property: string; value: string }[]
  title: string
}

export default DiagnosticsTable
