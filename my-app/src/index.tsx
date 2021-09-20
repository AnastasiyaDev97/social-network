import React from 'react';
import './index.css';
import {store} from "./redux/redux-store";
import ReactDOM from "react-dom";
import App from "./App";

export let rerender = () => {
    console.log('1 rerender')
    ReactDOM.render(
        <React.StrictMode>
            <App state={store.getState()} store={store}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
rerender();
store.subscribe(rerender)
