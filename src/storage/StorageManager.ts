import { profile } from "console";
import { Bookmark } from "../model/Bookmark";
import { BookmarkCollection } from "../model/BookmarkCollection";
import { QuickBrowseProfile } from "../model/QuickBrowseProfile";
import { QuickBrowseUserConfig } from "../model/QuickBrowseUserConfig";

export interface StorageManager {
    loadQuickBrowseConfig(): Promise<QuickBrowseUserConfig>;
    saveQuickBrowseConfig(userConfig: QuickBrowseUserConfig): void;
}

// Used when running for real
export class BrowserManagedBookmarkLoader implements StorageManager {

    readonly STORAGE_KEY: string = 'quickBrowseConfig';
    
    async loadQuickBrowseConfig(): Promise<QuickBrowseUserConfig> {
        try {
            const result = await browser.storage.local.get(this.STORAGE_KEY);
            if (result[this.STORAGE_KEY]) {
                const configData = result[this.STORAGE_KEY];
                const profiles: QuickBrowseProfile[] = configData.profiles.map((profileData: any) => {
                    const bookmarks = new BookmarkCollection(
                        profileData.bookmarks.map(
                            (bookmark: any) => new Bookmark(bookmark.name, bookmark.url, bookmark.shortcutKey)
                        )
                    );
                    return new QuickBrowseProfile(profileData.name, bookmarks, profileData.icon);
                });
                const activeProfileData: QuickBrowseProfile = configData.activeProfile;
                const activeProfile = profiles.find(profile => profile.name === activeProfileData.name) || profiles[0];
                return new QuickBrowseUserConfig(profiles, activeProfile);
            } else {
                var defaultProfile = new QuickBrowseProfile("Default", new BookmarkCollection([]), "fa-solid fa-user");
                return new QuickBrowseUserConfig([defaultProfile], defaultProfile);
            }
        } catch (error) {
            throw new Error(`Failed to load QuickBrowseConfig`);
        }
    }

    saveQuickBrowseConfig(userConfig: QuickBrowseUserConfig): void {
        alert ('Saving config')
        const configData = {
            profiles: userConfig.profiles.map(profile => ({
                name: profile.name,
                icon: profile.icon,
                bookmarks: profile.bookmarks.bookmarksOrderedByName.map((bookmark: Bookmark) => ({
                    name: bookmark.name,
                    url: bookmark.url,
                    shortcutKey: bookmark.shortcutKey,
                })),
            })),
            activeProfile: {
                name: userConfig.activeProfile.name,
                icon: userConfig.activeProfile.icon,
                bookmarks: userConfig.activeProfile.bookmarks.bookmarksOrderedByName.map((bookmark: Bookmark) => ({
                    name: bookmark.name,
                    url: bookmark.url,
                    shortcutKey: bookmark.shortcutKey,
                })),
            },
        };

        browser.storage.local.set({
            [this.STORAGE_KEY]: configData,
        });
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