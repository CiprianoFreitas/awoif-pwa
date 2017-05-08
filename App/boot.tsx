import '../index.html'
import '../200.html'

import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./Components/App";
import { Router, Route, browserHistory } from 'react-router';
import { SearchInput } from "./Components/SearchInput";
import { Article } from "./Components/Article";
import * as injectTapEventPlugin from 'react-tap-event-plugin';


declare var require: any;
// Client render
injectTapEventPlugin();

if (typeof document !== 'undefined') {
    if ('serviceWorker' in navigator) {
        const register = require("serviceworker-loader!../service-worker.js");
        register({ scope: './' })
            .then(() => console.log('Service worker registered'))
            .catch((err: any) => console.log('Service worker failed to register', err))
    }
    ReactDOM.render(
        <Router history={browserHistory}>
            <Route component={App}>
                <Route path="/" component={SearchInput} />
                <Route path="/article/:article" component={Article} />
            </Route>
        </Router>,
        document.getElementById("app")
    );
}
