import * as React from "react";
import AutoComplete from 'material-ui/AutoComplete';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import WikiSearchService from '../Services/WikiSearchService';

interface SearchInputState {
        input: string;
        autocomplete: string[];
}

interface SearchInputProps {
        handleSearch(term: string);
}

export class SearchInput extends React.Component<SearchInputProps, SearchInputState> {
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
                this.props.handleSearch(term);
        }
        public render() {
                return <Card>
                        <AutoComplete
                                textFieldStyle={{ margin: "0 0.5em" }}
                                underlineShow={false}
                                fullWidth={true}
                                hintText="Search"
                                dataSource={this.state.autocomplete}
                                filter={AutoComplete.caseInsensitiveFilter}
                                onUpdateInput={(e) => this.handleAutoComplete(e)}
                                onNewRequest={(term, index) => this.handleTapAutoComplete(term, index)}
                        />
                </Card>
        }
}