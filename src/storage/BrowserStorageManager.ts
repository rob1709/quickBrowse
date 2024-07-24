import { Bookmark } from "../model/Bookmark";
import { BookmarkCollection } from "../model/BookmarkCollection";
import { QuickBrowseProfile } from "../model/QuickBrowseProfile";
import { QuickBrowseStorageManager } from "./StorageManager";

// Used when running for real
export class BrowserManagedStorageManager implements QuickBrowseStorageManager {

    readonly STORAGE_KEY: string = 'quickBrowseProfile';
    
    async loadQuickBrowseConfig(): Promise<QuickBrowseProfile> {
        
        try {
            const syncedStorage = await browser.storage.sync.get(this.STORAGE_KEY);
            const localStorage = await browser.storage.local.get(this.STORAGE_KEY);
            if (syncedStorage[this.STORAGE_KEY]) {

                const configData = syncedStorage[this.STORAGE_KEY];
                const localData = localStorage[this.STORAGE_KEY];

                const collections: BookmarkCollection[] = configData.collections.map((collectionData: any) => {
                    const bookmarks = collectionData.bookmarks.map((bookmark: any) => new Bookmark(bookmark.name, bookmark.url, bookmark.shortcutKey));
                    return new BookmarkCollection(collectionData.name, collectionData.icon, bookmarks);
                });

                const activeCollectionName: any = localData.activeCollection;

                const activeCollection = collections.find(collection => collection.name === activeCollectionName) || collections[0];

                return new QuickBrowseProfile(collections, activeCollection);
            } else {
                var defaultCollection = new BookmarkCollection("Default", "fa-bookmark", []);
                return new QuickBrowseProfile([defaultCollection], defaultCollection);
            }
        } catch (error) {
            console.log(error);
            throw new Error(`Failed to load QuickBrowseConfig`);
        }
    }

    saveQuickBrowseProfile(userConfig: QuickBrowseProfile): void {

        const localData = {
            activeCollection: userConfig.activeCollection.name
        }

        const syncedData = {
            collections: userConfig.collections.map(collection => ({
                name: collection.name,
                icon: collection.icon,
                bookmarks: collection.bookmarksOrderedByName.map((bookmark: Bookmark) => ({
                    name: bookmark.name,
                    url: bookmark.baseUrl,
                    shortcutKey: bookmark.shortcutKey,
                })),
            }))
        }

        browser.storage.local.set({
            [this.STORAGE_KEY]: localData,
        });

        browser.storage.sync.set({
            [this.STORAGE_KEY]: syncedData,
        });

    }
}