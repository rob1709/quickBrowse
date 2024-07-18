import { KeyObject } from "crypto";
import { Bookmark } from "./Bookmark";

export class BookmarkCollection {

    private readonly bookmarks: Bookmark[];
        
    public readonly bookmarksOrderedByName: Bookmark[];
    
    constructor(bookmarks: Bookmark[]) {
        this.bookmarks = bookmarks;
        this.bookmarksOrderedByName = [...bookmarks].sort((a, b) => 
            a.name.localeCompare(b.name)
        );
    }

    public addBookmark(bookmark: Bookmark): BookmarkCollection {
        const newBookmarks = [...this.bookmarks, bookmark];
        return new BookmarkCollection(newBookmarks);
    }
        
    updateBookmark(oldBookmark: Bookmark, updatedBookmark: Bookmark): BookmarkCollection {
        const updatedBookmarks = this.bookmarks.map((bookmark) =>
          bookmark === oldBookmark ? updatedBookmark : bookmark
        );
        return new BookmarkCollection(updatedBookmarks);
      }

    public print() {
        return this.bookmarks.length === 0 ? "no bookmarks" : "[" + this.bookmarksOrderedByName.map(bookmark => bookmark.name).join(",") + "]";
    } 

    public static readonly empty: BookmarkCollection = new BookmarkCollection([]);

    public findBookmarkForKeyboardShortcut(keyPress: string) {
        var result = this.bookmarks.find(bookmark => bookmark.shortcutKey === keyPress);
        if (result === undefined) {
            var reverseCase = this.reverseCase(keyPress);
            result = this.bookmarks.find(bookmark => bookmark.shortcutKey === reverseCase);
        }
        return result;
    }

    public reverseCase(keyPress: string) {
        var keyPressLowerCase = keyPress.toLowerCase();
        if (keyPressLowerCase !== keyPress) {
            return keyPressLowerCase;
        } else {
            return keyPress.toUpperCase();
        }   
    }
      

}