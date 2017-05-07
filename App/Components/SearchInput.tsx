import * as React from "react";
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import WikiSearchService from '../Services/WikiSearchService';

interface WikiState {
        input: string;
        autocomplete: string[]
}
const buttonStyle = {
        margin: 12,
};

export class SearchInput extends React.Component<any, WikiState> {
        constructor() {
                super();
                this.state = { input: '', autocomplete: [] };
        }
        handleTextChange(e) {
                this.setState({ input: e.target.value });
        }
        handleAutoComplete(value) {
                if (value != '')
                        WikiSearchService.Autocomplete(value)
                                .then(results => { this.setState({ autocomplete: results }); })
                else
                        this.setState({ autocomplete: [] });
        }
        handleTapAutoComplete(term, index) {
                if (index == -1) return;
                this.props.router.push(`/article/${term}`);
        }
        public render() {
                return <AutoComplete
                                fullWidth={true}
                                hintText="Search"
                                dataSource={this.state.autocomplete}
                                filter={AutoComplete.caseInsensitiveFilter}
                                onUpdateInput={(e) => this.handleAutoComplete(e)}
                                onNewRequest={(term, index) => this.handleTapAutoComplete(term, index)}
                        />
        }
}