import * as React from "react";
import WikiSearchService from '../Services/WikiSearchService'

interface WikiState {
        summary: string;
}

export class Article extends React.Component<any, any> {
        constructor() {
                super();
                this.state = { summary: '' };
        }
        getSummary(term) {
                WikiSearchService.Search(term)
                        .then(summary => this.setState({ summary }))
        }
        public render() {
                const url = this.props.routeParams.article;
                this.getSummary(url);
                return <p dangerouslySetInnerHTML={{ __html: this.state.summary }}></p>;
        }
}