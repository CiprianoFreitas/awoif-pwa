import "./Article.scss";
import * as React from "react";
import WikiSearchService from '../Services/WikiSearchService'
import CircularProgress from 'material-ui/CircularProgress';

interface WikiState {
        summary: string;
        loading: boolean;
}

export class Article extends React.Component<any, WikiState> {
        constructor(props: any) {
                super();
                this.state = { summary: '', loading: true };
                const url = props.routeParams.article;
                this.getSummary(url)
        }
        componentWillReceiveProps(newProps: any, context: any) {
                const url = newProps.routeParams.article;
                this.getSummary(url)
        }
        getSummary(term) {
                this.setState({ loading: true });
                return WikiSearchService.Search(term)
                        .then(summary => this.setState({ summary }))
                        .then(() => { this.setState({ loading: false }); })
                        .then(()=>{
                                var links = document.querySelectorAll("a[title]");
                                for(let i = 0; i < links.length; i++){
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