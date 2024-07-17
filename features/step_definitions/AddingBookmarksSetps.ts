import { Given, When } from '@cucumber/cucumber';
import { TestContext } from '../TestContext';
import { BookmarkCollection } from '../../src/model/BookmarkCollection';
import { Bookmark } from '../../src/model/Bookmark';

Given('I have an empty list of bookmarks', () => {
  TestContext.instance.bookmarkCollection = BookmarkCollection.empty;
})

When('I add a bookmark called {string} for {string}', (name: string, url: string) => {
  TestContext.instance.bookmarkCollection = TestContext.instance.bookmarkCollection.addBookmark(new Bookmark(name, url, ""));
})

