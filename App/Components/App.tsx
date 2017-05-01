import * as React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { SearchInput } from "./SearchInput";
import AppBar from 'material-ui/AppBar';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
    appBar: {
        color: '#a70000',
    },
});
export class App extends React.Component<any, undefined> {
    render() {
        injectTapEventPlugin();

        return <MuiThemeProvider muiTheme={muiTheme}>
            <div>
                <AppBar
                    showMenuIconButton={false}
                    title="Wiki of Fire and Ice"
                />
                <SearchInput />
            </div>
        </MuiThemeProvider>;
    }
}
