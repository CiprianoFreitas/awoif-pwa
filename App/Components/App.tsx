import * as React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { browserHistory } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { SearchInput } from "./SearchInput";

const muiTheme = getMuiTheme({
    appBar: {
        color: '#a70000',
    },
});

const bodyStyle = {
    margin: 10
};
export class App extends React.Component<any, undefined> {
    handleSearch(term: string) {
        browserHistory.push(`/article/${term}`);
    }
    render() {
        return <MuiThemeProvider muiTheme={muiTheme}>
            <div>
                <AppBar
                    showMenuIconButton={false}
                    title="A Wiki of Ice and Fire"
                />
                <div style={bodyStyle}>
                    <SearchInput handleSearch={this.handleSearch} />
                    {this.props.children}
                </div>
            </div>
        </MuiThemeProvider>;
    }
}
