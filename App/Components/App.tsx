import * as React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { browserHistory } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { SearchInput } from "./SearchInput";
import { SideDrawer } from "./SideDrawer";

const muiTheme = getMuiTheme({
    appBar: {
        color: '#243548',
    },
});

const bodyStyle = {
    margin: 10
};

interface AppState {
    drawerOpen: boolean
}

export class App extends React.Component<any, AppState> {
    constructor(props: any) {
        super();
        this.state = { drawerOpen: false };
    }
    handleSearch(term: string) {
        browserHistory.push(`/article/${term}`);
    }
    render() {
        return <MuiThemeProvider muiTheme={muiTheme}>
            <div>
                <AppBar
                    onLeftIconButtonTouchTap={() => this.setState({ drawerOpen: !this.state.drawerOpen })}
                    title="A Wiki of Ice and Fire"
                />
                <SideDrawer
                    drawerOpen={this.state.drawerOpen}
                    handleDrawerClose={(drawerOpen) => this.setState({ drawerOpen })} />
                <div style={bodyStyle}>
                    <SearchInput handleSearch={this.handleSearch} />
                    {this.props.children}
                </div>
            </div>
        </MuiThemeProvider>;
    }
}
