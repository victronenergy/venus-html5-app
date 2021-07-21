import React from "react"

import { useAcLoads } from "@elninotech/mfd-modules"

import HeaderView from "../HeaderView"
import ColumnContainer from "../ColumnContainer"
import MetricValues from "../MetricValues"
import NumericValue from "../../../components/NumericValue"
import { ListView, ListRow } from "../ListView"

import AcIcon from "../../images/icons/ac.svg"
import { translate, Translate } from "react-i18nify"
import { observer } from "mobx-react"

const AcLoads = observer(() => {
  const { current, voltage, power, phases } = useAcLoads()
  const showAsList = phases > 1

  if (current && voltage && power && phases) {
    return showAsList ? (
      <ColumnContainer>
        <ListView
          icon={AcIcon}
          title={<Translate value="widgets.acLoads" />}
          subTitle={<Translate value="common.nrOfPhases" phases={phases} />}
          child={false}
        >
          {voltage.slice(0, phases).map((v, i) => (
            <ListRow key={i}>
              <span className="value value__phase">L {i + 1}</span>
              <NumericValue value={v} unit="V" />
              <NumericValue value={current[i]} unit="A" precision={1} />
              <NumericValue value={power[i]} unit={"W"} />
            </ListRow>
          ))}
        </ListView>
      </ColumnContainer>
    ) : (
      <ColumnContainer>
        <HeaderView icon={AcIcon} title={translate("widgets.acLoads")}>
          <MetricValues>
            <NumericValue value={voltage[0]} unit="V" />
            <NumericValue value={current[0]} unit="A" precision={1} />
            <NumericValue value={power[0]} unit={"W"} />
          </MetricValues>
        </HeaderView>
      </ColumnContainer>
    )
  } else {
    return <div />
  }
})

export default AcLoads
