import { Bookmark } from "../src/model/Bookmark";
import { BookmarkCollection } from "../src/model/BookmarkCollection";

export class TestContext {

    public static instance: TestContext = new TestContext();

    public bookmarkCollection: BookmarkCollection = BookmarkCollection.empty;

    public selectedBookmark: Bookmark | undefined = undefined;
  lastBookmarkAdded: Bookmark | undefined = undefined;

    private constructor() {}
}