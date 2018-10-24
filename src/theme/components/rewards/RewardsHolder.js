import React from 'react';

import RewardsBox from './RewardsBox';

const RewardsHolder = () => {

  const renderRewardBox = () => {
    return(
      <div className="row">
        <RewardsBox/>
        <RewardsBox/>
        <RewardsBox/>
        <RewardsBox/>
        <RewardsBox/>
        <RewardsBox/>
        <RewardsBox/>
      </div>
    )
  };

  return(
    <div>
      {renderRewardBox()}
    </div>
  )
};

export default RewardsHolder
