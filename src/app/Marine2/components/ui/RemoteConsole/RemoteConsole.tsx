import { observer } from "mobx-react-lite"
import { translate } from "react-i18nify"
import { QRCode } from "react-qrcode-logo"
import Paginator from "../Paginator"

const RemoteConsole = ({ host, width, height }: Props) => {
  return (
    <>
      <div>
        <QRCode value={window.location.origin} />
      </div>
    </>
  )
}

interface Props {
  host: string
  width: number
  height: number
}

export default observer(RemoteConsole)
