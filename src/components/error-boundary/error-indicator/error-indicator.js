import React from 'react';
import icon from './error-pig2.png';

const ErrorIndicator = () => {
  return (
    <div className='error_indicator'>
      <img src={icon} width='200px' height='200px' alt='Error icon'/>
      <span>Oоps...</span>
      <span>Don't worry, your coins are safe.</span>
      <span>We are already solving the problem.</span>
    </div>
  );
};

export default ErrorIndicator;
