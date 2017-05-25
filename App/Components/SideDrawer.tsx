import * as React from "react";
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';

interface SideDrawerProps{
    drawerOpen:boolean;
    handleDrawerClose(drawerOpen: boolean): void;
}

const drawerStyle = {
    'background-color': '#243548',
}

const listItemStyle = {
    color: 'white'
}

export class SideDrawer extends React.Component<SideDrawerProps, any> {
    public render() {
        return <Drawer
            docked={false}
            containerStyle={drawerStyle}
            width={'80%'}
            open={this.props.drawerOpen}
            onRequestChange={(drawerOpen) => this.props.handleDrawerClose(drawerOpen)}
        >
            <List>
                <ListItem style={listItemStyle} primaryText="Title 1" />
                <ListItem style={listItemStyle} primaryText="Title 2" />
                <ListItem style={listItemStyle} primaryText="Title 3" />
                <ListItem style={listItemStyle} primaryText="Title 4" />
                <ListItem style={listItemStyle} primaryText="Title 5" />
            </List>
        </Drawer>
    }
}