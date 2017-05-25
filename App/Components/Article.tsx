import "./Article.scss";
import * as React from "react";
import WikiSearchService from '../Services/WikiSearchService'
import CircularProgress from 'material-ui/CircularProgress';
import Drawer from 'material-ui/Drawer';

interface WikiState {
        title: string;
        summary: string;
        loading: boolean;
}

export class Article extends React.Component<any, WikiState> {
        constructor(props: any) {
                super();
                const url = props.routeParams.article;
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
        }
        public render() {
                return <div>
                        {this.state.loading ? <CircularProgress className="loading-spinner" /> : <p dangerouslySetInnerHTML={{ __html: this.state.summary }}>
                        </p>}
                </div>;
        }
}