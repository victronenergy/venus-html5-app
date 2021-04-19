import React from 'react'
import DcIcon from '../../../images/icons/dc.svg'
import {useDcLoads} from '../../modules/DcLoads'
import HeaderView from '../HeaderView'
import HidingContainer from '../HidingContainer'
import MetricValues from '../MetricValues'
import NumericValue from '../NumericValue/index'

export const DcLoads = () => {
    const {voltage, power} = useDcLoads()

    return (
        <HidingContainer>
            <HeaderView icon={DcIcon} title="DC Loads" showBoat>
                <MetricValues>
                    <NumericValue value={voltage && power ? power / voltage : undefined} unit="A" precision={1}/>
                    <NumericValue value={power} unit="W"/>
                </MetricValues>
            </HeaderView>
        </HidingContainer>
    )
}

export default DcLoads
