const wikiUrl = 'https://awoiaf.westeros.org';
const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com';

export default class WikiSearchService {
    static Search(searchTerm: string): Promise<string> {
        searchTerm = this.ToTitleCase(searchTerm);
        return fetch(`${corsAnywhereUrl}/${wikiUrl}/index.php?action=render&title=${searchTerm}`)
            .then(response => response.text() as Promise<any>)
            .then((res: string) => {
                var regex = new RegExp('/images', 'g');
                return res.replace(regex, `${wikiUrl}/images`)});
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