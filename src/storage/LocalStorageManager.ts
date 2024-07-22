import { Bookmark } from "../model/Bookmark";
import { BookmarkCollection } from "../model/BookmarkCollection";
import { QuickBrowseProfile } from "../model/QuickBrowseProfile";
import { QuickBrowseStorageManager } from "./StorageManager";

// Can be used when running locally (e.g. when developing a standard react app, in which case the browser. 
// calls don't work.
export class LocalBookmarkLoader implements QuickBrowseStorageManager {

    readonly STORAGE_KEY: string = 'bookmarks';
    
    loadQuickBrowseConfig(): Promise<QuickBrowseProfile> {
        return new Promise<QuickBrowseProfile>((resolve, reject) => {
            try {
                var homeProfile = new BookmarkCollection(
                    "Home", 
                    "fa-house-chimney",
                    [
                        new Bookmark('Reddit', 'old.reddit.com', 'i'),
                        new Bookmark('BBC news', 'www.bbc.co.uk/news', 'n'),
                        new Bookmark('Netflix', 'www.netflix.com', 'N'),
                        new Bookmark('Github', 'www.github.com', 'g'),
                        new Bookmark('Rightmove', 'www.rightmove.co.uk', 'm'),
                        new Bookmark('Amazon', 'www.amazon.co.uk', 'a'),
                        new Bookmark('Apple', 'www.apple.com', 'A')
                    ]
                );
    
                var workProfile = new BookmarkCollection(
                    "Work", 
                    "fa-solid fa-briefcase",
                    [
                        new Bookmark('Jira', 'www.jira.com', 'j'),
                        new Bookmark('Bitbucket', 'www.bitbucket.com', 'b')
                    ]
                );

                var musicProfile = new BookmarkCollection(
                    "Music", 
                    "fa-solid fa-music",
                    [
                        new Bookmark('Reaper', 'https://www.reaper.fm/download.php', 'r')
                    ]
                );
    
                var config = new QuickBrowseProfile([
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

    saveQuickBrowseProfile(bookmarkCollection: QuickBrowseProfile): void { }

}