const wikiUrl = 'https://awoiaf.westeros.org';
const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com';

export default class WikiSearchService {
    static Search(searchTerm: string): Promise<string> {
        searchTerm = this.ToTitleCase(searchTerm);
        return fetch(`${corsAnywhereUrl}/${wikiUrl}/api.php?action=query&format=json&prop=extracts&titles=${searchTerm}&exintro=1s&redirects=`)
            .then(response => response.json() as Promise<any>)
            .then((res: any) => {
                let pages = res.query.pages;
                for (var key in pages) {
                    if (pages.hasOwnProperty(key)) {
                        return pages[key].extract;
                    }
                }
            });
    }

    static Autocomplete(searchTerm: string) {
        searchTerm = this.ToTitleCase(searchTerm);
        return fetch(`${corsAnywhereUrl}/${wikiUrl}/api.php?action=opensearch&format=json&search=${searchTerm}`)
            .then(response => response.json())
            .then(result => result[1]);
    }

    private static ToTitleCase(str: string): string {
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }
}