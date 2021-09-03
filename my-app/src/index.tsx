import React from 'react';
import './index.css';
import {state, stateType, subscriber} from "./redux/state";
import ReactDOM from "react-dom";
import App from "./App";

export let rerender = () => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
rerender();
subscriber(rerender)