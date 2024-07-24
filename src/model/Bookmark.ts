import { BookmarkDynamicPlaceholder } from "./BookmarkDynamicPlaceholder";

export class Bookmark {
        
    public readonly name: string;
    
    public readonly baseUrl: string;

    public readonly shortcutKey: string;

    public readonly favicon: string;

    public readonly dynamicPlaceholders: string[];

    constructor(name: string, url: string, shortcutKey: string) {
        this.name = name;
        this.baseUrl = this.normalizeUrl(url);
        this.shortcutKey = shortcutKey;
        this.favicon = this.buildFaviconUrl(this.baseUrl);
        this.dynamicPlaceholders = this.extractDynamicPlaceholders(url);
    }

    public getUrlForSelectedShorctut(placeholders: BookmarkDynamicPlaceholder[]) {
        var result = this.baseUrl;
        placeholders.forEach(placeholder => {
            result = result.replace("{" + placeholder.placeholder + "}", placeholder.value)
        });
        return result;
    }


    private extractDynamicPlaceholders(url: string) {
        // Regular expression to match the placeholders within curly braces
        const placeholderRegex = /{([^}]+)}/g;
        let match;
        const placeholders: string[] = [];

        // Using exec to find all matches in the URL
        while ((match = placeholderRegex.exec(url)) !== null) {
            // Add the captured group (without curly braces) to the placeholders array
            placeholders.push(match[1]);
        }

        return placeholders;
    }

    private buildFaviconUrl(url: string) {
        try  {
            var urlAsUrl = new URL(this.normalizeUrl(this.baseUrl));
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