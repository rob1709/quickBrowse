import { Bookmark } from "./Bookmark";

export class BookmarkCollection {

    public readonly name: string; 

    public readonly icon: string;

    private readonly bookmarks: Bookmark[];
        
    public readonly bookmarksOrderedByName: Bookmark[];
    
    constructor(name: string, icon: string, bookmarks: Bookmark[]) {
        this.name = name;
        this.icon = icon;
        this.bookmarks = bookmarks;
        this.bookmarksOrderedByName = [...bookmarks].sort((a, b) => 
            a.name.localeCompare(b.name)
        );
    }

    public addBookmark(bookmark: Bookmark): BookmarkCollection {
        const newBookmarks = [...this.bookmarks, bookmark];
        return new BookmarkCollection(this.name, this.icon, newBookmarks);
    }
        
    updateBookmark(oldBookmark: Bookmark, updatedBookmark: Bookmark): BookmarkCollection {
        const updatedBookmarks = this.bookmarks.map((bookmark) =>
          bookmark === oldBookmark ? updatedBookmark : bookmark
        );
        return new BookmarkCollection(this.name, this.icon, updatedBookmarks);
    }

    validateBookmarkAmendment(bookmarkBeingEdited: Bookmark, updatedBookmark: Bookmark): any {
      var otherBookmarksInCollection = this.deleteBookmark(bookmarkBeingEdited);
      return otherBookmarksInCollection.validateBookmarkCreation(updatedBookmark);
    }

    validateBookmarkCreation(newBookmark: Bookmark) {
        var bookmarkWithSameShortcut = this.bookmarks.find(bookmark => bookmark.shortcutKey === newBookmark.shortcutKey);
        if (bookmarkWithSameShortcut) {
            return "Shortcut '" + newBookmark.shortcutKey + "' already in use for " + bookmarkWithSameShortcut.name;
        } else {
            return undefined;
        }
    }

    deleteBookmark(bookmarkToDelete: Bookmark) {
        return new BookmarkCollection(this.name, this.icon, this.bookmarks.filter(bookmark => bookmark !== bookmarkToDelete))
    }

    public print() {
        return this.bookmarks.length === 0 ? "no bookmarks" : "[" + this.bookmarksOrderedByName.map(bookmark => bookmark.name).join(",") + "]";
    } 

    public static readonly empty: BookmarkCollection = new BookmarkCollection("", "", []);

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