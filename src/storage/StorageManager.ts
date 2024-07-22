import { Bookmark } from "../model/Bookmark";
import { BookmarkCollection } from "../model/BookmarkCollection";
import { QuickBrowseProfile } from "../model/QuickBrowseProfile";
import { QuickBrowseUserConfig } from "../model/QuickBrowseUserConfig";



export interface StorageManager {
    loadQuickBrowseConfig() : Promise<QuickBrowseUserConfig>;
    saveQuickBrowseConfig(bookmarkCollection: QuickBrowseUserConfig): void;
}

// Used when running for real
export class BrowserManagedBookmarkLoader implements StorageManager {

    readonly STORAGE_KEY: string = 'bookmarks';
    
    async loadQuickBrowseConfig(): Promise<QuickBrowseUserConfig> {
        try {
            const bookmarkCollection = await this.loadBookmarks();
            const config = this.convertToQuickBrowseUserConfig(bookmarkCollection);
            return config;
        } catch (error) {
            throw new Error(`Failed to load bookmarks`);
        }
    }

    async loadBookmarks(): Promise<BookmarkCollection> {
        const result = await browser.storage.local.get(this.STORAGE_KEY);
        if (result[this.STORAGE_KEY]) {
            const savedBookmarks = result[this.STORAGE_KEY].map(
                (bookmark: any) => new Bookmark(bookmark.name, bookmark.url, bookmark.shortcutKey)
            );
            return new BookmarkCollection(savedBookmarks);
        } else {
            return new BookmarkCollection([]);
        }
    }

    saveQuickBrowseConfig(bookmarkCollection: QuickBrowseUserConfig): void {
        const bookmarkArray = bookmarkCollection.profiles.flatMap(profile => profile.bookmarks.bookmarksOrderedByName);
        browser.storage.local.set({
            [this.STORAGE_KEY]: bookmarkArray.map((bookmark: Bookmark) => ({
                name: bookmark.name,
                url: bookmark.url,
                shortcutKey: bookmark.shortcutKey,
            })),
        });
    }

    private convertToQuickBrowseUserConfig(bookmarkCollection: BookmarkCollection): QuickBrowseUserConfig {
        // Implement the logic to convert BookmarkCollection to QuickBrowseUserConfig
        // For simplicity, assuming one profile
        const profile = new QuickBrowseProfile("Default", bookmarkCollection, "fa-default-icon");
        return new QuickBrowseUserConfig([profile], profile);
    }
}

// Can be used when running locally (e.g. when developing a standard react app, in which case the browser. 
// calls don't work.
export class LocalBookmarkLoader implements StorageManager {

    readonly STORAGE_KEY: string = 'bookmarks';
    
    loadQuickBrowseConfig(): Promise<QuickBrowseUserConfig> {
        return new Promise<QuickBrowseUserConfig>((resolve, reject) => {
            try {
                var homeProfile = new QuickBrowseProfile(
                    "Home", 
                    new BookmarkCollection([
                        new Bookmark('Reddit', 'old.reddit.com', 'i'),
                        new Bookmark('BBC news', 'www.bbc.co.uk/news', 'n'),
                        new Bookmark('Netflix', 'www.netflix.com', 'N'),
                        new Bookmark('Github', 'www.github.com', 'g'),
                        new Bookmark('Rightmove', 'www.rightmove.co.uk', 'm'),
                        new Bookmark('Amazon', 'www.amazon.co.uk', 'a'),
                        new Bookmark('Apple', 'www.apple.com', 'A')
                    ]),
                    "fa-house-chimney" 
                );
    
                var workProfile = new QuickBrowseProfile(
                    "Work", 
                    new BookmarkCollection([
                        new Bookmark('Jira', 'www.jira.com', 'j'),
                        new Bookmark('Bitbucket', 'www.bitbucket.com', 'b')
                    ]),
                    "fa-solid fa-briefcase" 
                );

                var musicProfile = new QuickBrowseProfile(
                    "Music", 
                    new BookmarkCollection([
                        new Bookmark('Reaper', 'https://www.reaper.fm/download.php', 'r')
                    ]),
                    "fa-solid fa-music" 
                );
    
                var config = new QuickBrowseUserConfig([
                    homeProfile,
                    workProfile,
                    musicProfile
                ],
                workProfile
                );
    
                resolve(config);
            } catch (error) {
                reject(error);
            }
        });
    }

    saveQuickBrowseConfig(bookmarkCollection: QuickBrowseUserConfig): void { }

}