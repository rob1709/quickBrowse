import { BookmarkCollection } from "./BookmarkCollection";

export class QuickBrowseProfile {

    public readonly name: string; 
    public readonly bookmarks: BookmarkCollection;
    public readonly icon: string;

    public constructor (name: string, bookmarks: BookmarkCollection, icon: string) {
        this.name = name;
        this.bookmarks = bookmarks;
        this.icon = icon;
    }

} 