import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import './main.scss';
import App from './components/app/App';
import store from "./store";
import ErrorBoundary from "./components/error-boundary/error-boundary";
import lastcoinService from "./services/lastcoin-service";
import { LastcoinServiceProvider } from "./components/lastcoin-service-context/lastcoin-service-context";

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <LastcoinServiceProvider value={lastcoinService}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </LastcoinServiceProvider>
        </ErrorBoundary>
    </Provider>,
    document.getElementById('root')
);
