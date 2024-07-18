export class Bookmark {
        
    public readonly name: string;
    
    public readonly url: string;

    public readonly shortcutKey: string;

    public readonly favicon: string;

    constructor(name: string, url: string, shortcutKey: string) {
        this.name = name;
        this.url = url;
        this.shortcutKey = shortcutKey;
        this.favicon = this.buildFaviconUrl(this.url);
    }

    private buildFaviconUrl(url: string) {
        try  {
            var urlAsUrl = new URL(this.normalizeUrl(this.url));
            return `${urlAsUrl.origin}/favicon.ico`;
        } catch (exception) {
            return "";
        }
    }

    private normalizeUrl(url: string): string {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return `https://${url}`;
        }
        return url;
    }
}