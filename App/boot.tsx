import '../index.html'

import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./Components/App";

declare var require: any;

// Client render
if (typeof document !== 'undefined') {
    const register = require("serviceworker-loader!../service-worker.js");
    register({ scope: './' })
        .then(() => console.log('Service worker registered'))
        .catch((err : any) => console.log('Service worker failed to register', err))

    ReactDOM.render(
        <App />,
        document.getElementById("app")
    );
}
