import '../index.html'

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Hello } from "./Hello";

declare var require: any;

// Client render
if (typeof document !== 'undefined') {
    const register = require("serviceworker-loader!../service-worker.js");
    register({ scope: './' })
        .then(() => console.log('It worked!'))
        .catch((err : any) => console.log('Didn\'t work', err))

    ReactDOM.render(
        <Hello />,
        document.getElementById("app")
    );
}
