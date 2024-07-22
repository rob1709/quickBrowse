import { BookmarkCollection } from "./BookmarkCollection";

export class QuickBrowseProfile {
    public readonly collections: BookmarkCollection[];

    public activeCollection: BookmarkCollection;

    public constructor(collections: BookmarkCollection[], activeCollection: BookmarkCollection) {
        this.collections = collections;
        this.activeCollection = activeCollection;
    }

    public updateCollection(old: BookmarkCollection, updated: BookmarkCollection) {
        const updatedCollections = this.collections.map(collection =>
            (collection === old) ? updated : collection
        );
        const active = (this.activeCollection === old) ? updated : old;
        return new QuickBrowseProfile(updatedCollections, active);
    }
}