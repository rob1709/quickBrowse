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

    public print() {
        return this.bookmarks.length === 0 ? "no bookmarks" : "[" + this.bookmarksOrderedByName.join(",") + "]";
    } 

    public static readonly empty: BookmarkCollection = new BookmarkCollection([]);

}