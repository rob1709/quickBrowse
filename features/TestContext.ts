import { BookmarkCollection } from "../src/model/BookmarkCollection";

export class TestContext {

    public static instance: TestContext = new TestContext();

    public bookmarkCollection: BookmarkCollection = BookmarkCollection.empty;


    private constructor() {}
}