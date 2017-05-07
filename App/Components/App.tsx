import * as React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


const muiTheme = getMuiTheme({
    appBar: {
        color: '#a70000',
    },
});

const bodyStyle = {
    margin: 10
};
export class App extends React.Component<any, undefined> {
    render() {
        return <MuiThemeProvider muiTheme={muiTheme}>
            <div>
                <AppBar
                    showMenuIconButton={false}
                    title="A Wiki of Ice and Fire"
                />
                <div style={bodyStyle}>
                    {this.props.children}
                </div>
            </div>
        </MuiThemeProvider>;
    }
}
