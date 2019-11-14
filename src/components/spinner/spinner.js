import React from 'react';
import {ReactComponent as SpinnerSVG} from "./coin-spinner.svg";
import './spinner.scss'

const Spinner = () => {
  return (
    <div className='spinner'>
      <SpinnerSVG/>
    </div>
  )
};

export default Spinner;
