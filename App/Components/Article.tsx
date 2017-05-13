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
                        .then(() => { this.setState({ loading: false }); });
        }
        componentWillReceiveProps(newProps: any, context: any) {
                this.setState({ loading: true });
                const url = newProps.routeParams.article;
                this.getSummary(url)
                        .then(() => { this.setState({ loading: false }); });
        }
        getSummary(term) {
                return WikiSearchService.Search(term)
                        .then(summary => this.setState({ summary }))
        }
        public render() {
                return <div>
                        {this.state.loading ? <CircularProgress /> : <p dangerouslySetInnerHTML={{ __html: this.state.summary }}>
                        </p>}
                </div>;
        }
}