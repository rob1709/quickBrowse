export class Bookmark {
        
    public readonly name: string;
    
    public readonly url: string;

    public readonly shortcutKey: string;

    constructor(name: string, url: string, shortcutKey: string) {
        this.name = name;
        this.url = url;
        this.shortcutKey = shortcutKey;
    }
}