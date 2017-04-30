import * as React from "react";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

interface WikiState {
        input: string;
        summary: string;
}
const buttonStyle = {
  margin: 12,
};

const bodyStyle = {
        margin:10
};

export class SearchInput extends React.Component<any, WikiState> {
        constructor() {
                super();
                this.state = { input: '', summary: '' };
        }
        handleTextChange(e) {
                this.setState({ input: e.target.value });
        }
        handleSearch(e) {
                fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${this.state.input}&exintro=1s&origin=*&redirects=`)
                        .then(response => response.json() as Promise<any>)
                        .then((res: any) => {
                                let pages = res.query.pages;
                                console.log(res);
                                for (var key in pages) {
                                        console.log(key)
                                        if (pages.hasOwnProperty(key)) {
                                                this.setState({ summary: pages[key].extract });
                                        }
                                }
                        });
        }
        public render() {
                return <div style={bodyStyle}>
                        <TextField
                                hintText="Search"
                                onChange={(e) => this.handleTextChange(e)}
                        />
                        <RaisedButton onClick={(e) => this.handleSearch(e)} label="Search" primary={true} style={buttonStyle} />
                        <p dangerouslySetInnerHTML={{ __html: this.state.summary }}></p>
                </div>
        }
}