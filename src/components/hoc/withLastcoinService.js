import React from 'react';
import {LastcoinServiceConsumer} from "../lastcoin-service-context/lastcoin-service-context";

const withLastcoinService = () => (Wrapped) => {
  return (props) => {
    return (
      <LastcoinServiceConsumer>
        {
          (lastcoinService) => {
            return (
              <Wrapped {...props} lastcoinService={lastcoinService}/>
            );
          }
        }
      </LastcoinServiceConsumer>
    );
  };
};

export default withLastcoinService;
