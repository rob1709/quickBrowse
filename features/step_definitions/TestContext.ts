import { Bookmark } from "../../src/model/Bookmark";
import { BookmarkCollection } from "../../src/model/BookmarkCollection";
import { BookmarkDynamicPlaceholder } from "../../src/model/BookmarkDynamicPlaceholder";

export class TestContext {

    public static instance: TestContext = new TestContext();

    public bookmarkCollection: BookmarkCollection = BookmarkCollection.empty;

    public selectedBookmark: Bookmark | undefined = undefined;
    lastBookmarkAdded: Bookmark | undefined = undefined;
    validationResult: any;
    placeholders: BookmarkDynamicPlaceholder[] = [];

    private constructor() {}
}