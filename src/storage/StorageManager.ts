import { Bookmark } from "../model/Bookmark";
import { BookmarkCollection } from "../model/BookmarkCollection";
import { QuickBrowseProfile } from "../model/QuickBrowseProfile";

export interface QuickBrowseStorageManager {
    loadQuickBrowseConfig(): Promise<QuickBrowseProfile>;
    saveQuickBrowseProfile(userConfig: QuickBrowseProfile): void;
}

// Used when running for real
export class BrowserManagedBookmarkLoader implements QuickBrowseStorageManager {

    readonly STORAGE_KEY: string = 'quickBrowseProfile';
    
    async loadQuickBrowseConfig(): Promise<QuickBrowseProfile> {
        try {
            const result = await browser.storage.local.get(this.STORAGE_KEY);
            if (result[this.STORAGE_KEY]) {

                const configData = result[this.STORAGE_KEY];

                const collections: BookmarkCollection[] = configData.collections.map((collectionData: any) => {
                    const bookmarks = collectionData.bookmarks.map((bookmark: any) => new Bookmark(bookmark.name, bookmark.url, bookmark.shortcutKey));
                    return new BookmarkCollection(collectionData.name, collectionData.icon, bookmarks);
                });

                const activeCollectionName: any = configData.activeCollection;

                const activeCollection = collections.find(collection => collection.name === activeCollectionName) || collections[0];

                return new QuickBrowseProfile(collections, activeCollection);
            } else {
                var defaultCollection = new BookmarkCollection("Default", "fa-solid fa-user", []);
                return new QuickBrowseProfile([defaultCollection], defaultCollection);
            }
        } catch (error) {
            throw new Error(`Failed to load QuickBrowseConfig`);
        }
    }

    saveQuickBrowseProfile(userConfig: QuickBrowseProfile): void {
        const configData = {
            collections: userConfig.collections.map(collection => ({
                name: collection.name,
                icon: collection.icon,
                bookmarks: collection.bookmarksOrderedByName.map((bookmark: Bookmark) => ({
                    name: bookmark.name,
                    url: bookmark.url,
                    shortcutKey: bookmark.shortcutKey,
                })),
            })),
            activeCollection: userConfig.activeCollection.name
        }

        browser.storage.local.set({
            [this.STORAGE_KEY]: configData,
        });
    }
}