import * as React from "react";
import WikiSearchService from '../Services/WikiSearchService'

interface WikiState {
        summary: string;
}

export class Article extends React.Component<any, any> {
        constructor(props: any) {
                super();
                this.state = { summary: '' };
                const url = props.routeParams.article;
                this.getSummary(url);
        }
        getSummary(term) {
                WikiSearchService.Search(term)
                        .then(summary => this.setState({ summary }))
        }
        public render() {

                return <p dangerouslySetInnerHTML={{ __html: this.state.summary }}></p>;
        }
}