import * as React from "react";
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import WikiSearchService from '../Services/WikiSearchService';

interface WikiState {
        input: string;
        summary: string;
        autocomplete: string[]
}
const buttonStyle = {
        margin: 12,
};

const bodyStyle = {
        margin: 10
};

export class SearchInput extends React.Component<any, WikiState> {
        constructor() {
                super();
                this.state = { input: '', summary: '', autocomplete: [] };
        }
        handleTextChange(e) {
                this.setState({ input: e.target.value });
        }
        handleSearch(e) {
                WikiSearchService.Search(this.state.input)
                        .then(summary => this.setState({ summary }))
        }
        handleAutoComplete(value) {
                WikiSearchService.Autocomplete(value)
                        .then(results => { this.setState({ autocomplete: results }); })
        }
        handleTapAutoComplete(term, index) {
                if (index == -1) return;
                WikiSearchService.Search(term)
                        .then(summary => this.setState({ summary }))
        }
        public render() {
                return <div style={bodyStyle}>
                        <AutoComplete
                                fullWidth={true}
                                hintText="Search"
                                dataSource={this.state.autocomplete}
                                filter={AutoComplete.caseInsensitiveFilter}
                                onUpdateInput={(e) => this.handleAutoComplete(e)}
                                onNewRequest={(term, index) => this.handleTapAutoComplete(term, index)}
                        />
                        <p dangerouslySetInnerHTML={{ __html: this.state.summary }}></p>
                </div>
        }
}