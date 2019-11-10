import React from 'react';
import {LastcoinServiceConsumer} from "../../services/lastcoin-service-context/lastcoin-service-context";

const withLastCoinServices = () => (Wrapped) => {
  return (props) => {
    return (
      <LastcoinServiceConsumer>
        {
          (lastCoinServiceRequest) => {
            return (
              <Wrapped {...props} lastCoinServiceRequest={lastCoinServiceRequest}/>
            );
          }
        }
      </LastcoinServiceConsumer>
    );
  };
};

export default withLastCoinServices;
