import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import './main.scss';
import App from './components/app/App';
import store from "./store";
import ErrorBoundary from "./components/error-boundary/error-boundary";
import LastCoinServices from "./services/last-coin-services";
import {LastcoinServiceProvider} from "./services/lastcoin-service-context/lastcoin-service-context";

const lastCoinServiceRequest = new LastCoinServices();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <LastcoinServiceProvider value={lastCoinServiceRequest}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </LastcoinServiceProvider>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
);
