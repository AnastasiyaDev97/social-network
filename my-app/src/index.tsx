import React from 'react';
import './index.css';
import {store} from "./redux/redux-store";
import ReactDOM from "react-dom";
import App from "./App";
import {Provider,/*Provider,*/ StoreContext} from "./StoreContext";
import {BrowserRouter} from "react-router-dom";

export let rerender = () => {
    console.log('1 rerender')
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>,

        </BrowserRouter>, document.getElementById('root')
    );
}
rerender();
store.subscribe(rerender)
