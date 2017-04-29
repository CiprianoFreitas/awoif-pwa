import * as React from "react";

interface WikiState {
        input: string;
        summary: string;
}

export class SearchInput extends React.Component<any, WikiState> {
        constructor() {
                super();
                this.state = { input: '', summary: 'Pesquisar primeiro' };
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
                return <div>
                        <input type="text" placeholder="Search" onChange={(e) => this.handleTextChange(e)} />
                        <button onClick={(e) => this.handleSearch(e)}>Search</button>
                        <p dangerouslySetInnerHTML={{__html: this.state.summary}}></p>
                </div>
        }
}