import "./Article.scss";
import * as React from "react";
import WikiSearchService from '../Services/WikiSearchService'
import CircularProgress from 'material-ui/CircularProgress';
import Drawer from 'material-ui/Drawer';
import { MenuItem } from './SideDrawer';

interface ArticleProps {
        setMenuItems(descriptions: MenuItem[]): void;
}

interface WikiState {
        title: string;
        summary: string;
        loading: boolean;
}

export class Article extends React.Component<ArticleProps, WikiState> {
        private handleMenuItems;
        constructor(props: any) {
                super();
                const url = props.routeParams.article;
                this.handleMenuItems = props.setMenuItems;
                this.state = { summary: '', loading: true, title: url };
                this.getSummary(url)
        }
        componentWillReceiveProps(newProps: any, context: any) {
                const url = newProps.routeParams.article;
                if (url === this.state.title) return;
                this.getSummary(url)
        }
        getSummary(term) {
                this.setState({ loading: true, title: term });
                return WikiSearchService.Search(term)
                        .then(summary => this.setState({ summary }))
                        .then(() => { this.setState({ loading: false }); })
                        .then(() => {
                                var links = document.querySelectorAll("a[title]");
                                for (let i = 0; i < links.length; i++) {
                                        let currentLink = links[i];
                                        currentLink.setAttribute("href", currentLink.getAttribute("title"));
                                }
                        })
                        .then(this.parseTitles)
                        .then(this.handleMenuItems);
        }
        parseTitles(): MenuItem[] {
                let descriptions : MenuItem[] = new Array;
                var titleEls = document.getElementsByClassName('mw-headline');
                for (let i = 0; i < titleEls.length; i++) {
                        let currentEl = titleEls[i];
                        descriptions.push({ description :currentEl.innerHTML, link: currentEl.id})
                }
                return descriptions;
        }
        public render() {
                return <div>
                        {this.state.loading ? <CircularProgress className="loading-spinner" /> : <p dangerouslySetInnerHTML={{ __html: this.state.summary }}>
                        </p>}
                </div>;
        }
}