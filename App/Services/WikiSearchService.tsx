const wikiUrl = 'https://en.wikipedia.org';
export default class WikiSearchService {
    static Search(searchTerm: string): Promise<string> {
        return fetch(`${wikiUrl}/w/api.php?action=query&format=json&prop=extracts&titles=${searchTerm}&exintro=1s&origin=*&redirects=`)
            .then(response => response.json() as Promise<any>)
            .then((res: any) => {
                let pages = res.query.pages;
                console.log(res);
                for (var key in pages) {
                    console.log(key)
                    if (pages.hasOwnProperty(key)) {
                        return pages[key].extract;
                    }
                }
            });
    }

    static Autocomplete(searchTerm: string[]) {
        return fetch(`${wikiUrl}/w/api.php?action=opensearch&format=json&search=${searchTerm}&origin=*`)
            .then(response => response.json() as Promise<any>)
            .then(result => { return result[1]; });
    }
}