import React, { Component } from "react"

import { Card, SIZE_BIG } from "../Card"
import { useWater, FreshWaterType } from "../../../modules/Water/Water.provider"
import { NotAvailable } from "../NotAvailable"
import NumericValue from "../../../components/NumericValue"
import WaterTank from "../../images/WaterTank.svg"
import WaterTankTop from "../../images/WaterTankTop.svg"
import "./FreshWater.scss"


type FreshWaterProps = {
  fresh_water: FreshWaterType
}
type FreshWaterState = {
  height: number
}

export class FreshWater extends Component<FreshWaterProps, FreshWaterState>{
  water_body_ref: React.RefObject<HTMLDivElement>

  constructor(props: FreshWaterProps) {
    super(props);

    this.water_body_ref = React.createRef()
    this.state = { height: 0 }
  }

  componentDidUpdate() {
    if (this.water_body_ref.current) {
      this.water_body_ref.current.style.height = this.props.fresh_water.level * 100 + '%'
    }
  }

  render() {
    const {fresh_water} = this.props

    return (
      <div className="">
        <Card title={'Fresh Water'} icon={undefined} size={SIZE_BIG}>
          {fresh_water ? (
            <div className="fresh_water">
              <div className="indicator-main">
                <span>
                  <NumericValue value={fresh_water.level * 100} unit="%" defaultValue={'--'} precision={0} />
                  <span className="name">
                    {fresh_water.size + ' gal.'}
                  </span>
                </span>
              </div>

              <div className="wrapper">
                <div className={'water-tank'}>
                  <img src={WaterTank} className="water-tank__outline" />
                  <div className={"water-tank__text"}>
                    <NumericValue value={fresh_water.level * 100} unit="%" defaultValue={'--'} precision={0} />
                  </div>

                  <div className={"water-tank__water"}>
                    <span>
                      <img src={WaterTankTop} className="water-tank__water__top" />
                      <div ref={this.water_body_ref} className={"water-tank__water__body"} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <NotAvailable />
          )}
        </Card>
      </div>
    )
  }
}


const withFreshWater = (Component: any) => {
  return (props: any) => {
    const {fresh_water} = useWater()

    return <Component fresh_water={fresh_water} {...props} />;
  };
};


export default withFreshWater(FreshWater)
