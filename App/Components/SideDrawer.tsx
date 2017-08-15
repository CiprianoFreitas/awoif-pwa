import * as React from "react";
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';

export interface MenuItem {
    description: string;
    link: string
}

interface SideDrawerProps {
    drawerOpen: boolean;
    handleDrawerClose(drawerOpen: boolean): void;
    menuItems: MenuItem[]
}

const drawerStyle = {
    'background-color': '#243548',
}

const listItemStyle = {
    color: 'white'
}

export class SideDrawer extends React.Component<SideDrawerProps, any> {
    private StripHtmlTags(desc: string) {
        return desc.replace(/<\/?[^>]+(>|$)/g, "");
    }
    private GoTo(link: string) {
        window.location.href = "#" + link;
        this.props.handleDrawerClose(false);
    }
    public GetMenuItems() {
        let items = new Array;
        this.props.menuItems.forEach(element => {
            items.push(<ListItem style={listItemStyle}
                primaryText={this.StripHtmlTags(element.description)}
                onClick={() => this.GoTo(element.link)} />)
        });
        return items;
    }
    public render() {
        return <Drawer
            docked={false}
            containerStyle={drawerStyle}
            width={'80%'}
            open={this.props.drawerOpen}
            onRequestChange={(drawerOpen) => this.props.handleDrawerClose(drawerOpen)}
        >
            <List>
                {this.GetMenuItems()}
            </List>
        </Drawer>
    }
}