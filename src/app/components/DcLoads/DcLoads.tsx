import {useObservableState} from 'observable-hooks'
import React from 'react'
import DcIcon from '../../../images/icons/dc.svg'
import {dcLoadsQuery} from '../../modules/DcLoads'
import MetricValues from '../MetricValues'
import NumericValue from '../NumericValue/index'
import DcLoadsData from './DcLoadsData'
import HeaderView from '../HeaderView'

export const DcLoads = () => {
    const {voltage, power} = useObservableState(dcLoadsQuery.all$) ?? {}

    return (
        <DcLoadsData>
            <HeaderView icon={DcIcon} title="DC Loads" showBoat>
                <MetricValues>
                    <NumericValue value={voltage && power ? power / voltage : undefined} unit="A" precision={1}/>
                    <NumericValue value={power} unit="W"/>
                </MetricValues>
            </HeaderView>
        </DcLoadsData>
    )
}

export default DcLoads
