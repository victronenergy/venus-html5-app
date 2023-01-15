import React from "react";
import classnames from "classnames";

const ProgressBar = ({percentage, color}: Props) => {
  return (
    <div className="w-full flex bg-inherit p-5">
      <div className={`w-1/4 h-1 bg-${color}/30 rounded-2xl mr-2`}>
        <div className={classnames(`h-full bg-${color} rounded-2xl`)}
          style={{width: percentage >= 25 ? "100%" : `${percentage * 4}%`}} />
      </div>
      <div className={`w-1/4 bg-${color}/30 h-1 rounded-2xl mr-2`}>
        <div className={classnames(`h-full bg-${color} rounded-2xl`)}
          style={{width: percentage >= 50 ? "100%" : percentage <= 25 ? '0%' : `${(percentage - 25) * 4}%`}} />
      </div>
      <div className={`w-1/4 bg-${color}/30 h-1 rounded-2xl mr-2`}>
        <div className={classnames(`h-full bg-${color} rounded-2xl`)}
          style={{width: percentage >= 75 ? "100%" : percentage <= 50 ? '0%' : `${(percentage - 50) * 4}%`}} />
      </div>
      <div className={`w-1/4 bg-${color}/30 h-1 rounded-2xl mr-2`}>
        <div className={classnames(`h-full bg-${color} rounded-2xl`)}
          style={{width: percentage <= 75 ? "0%" : `${(percentage - 75) * 4}%`}} />
      </div>
    </div>
    
  );
};

interface Props {
  percentage: number;
  color?: 'tank-fuel' | 'tank-fresh-water' | 'tank-live-well' | 'tank-oil' | 'tank-black-water';
}

export default ProgressBar;