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

Given('I add a bookmark called {string} for {string} with shortcut {string}', (name: string, url: string, shortcut: string) => {
  var bookmarkToAdd = new Bookmark(name, url, shortcut);
  TestContext.instance.bookmarkCollection = TestContext.instance.bookmarkCollection.addBookmark(bookmarkToAdd);
  TestContext.instance.lastBookmarkAdded = bookmarkToAdd;
})

When('I edit this to be {string} for url {string} with shortcut {string}', (name: string, url: string, shortcut: string) => {
  var udpatedBookmark = new Bookmark(name, url, shortcut);
  if (TestContext.instance.lastBookmarkAdded) {
    TestContext.instance.bookmarkCollection = TestContext.instance.bookmarkCollection.updateBookmark(TestContext.instance.lastBookmarkAdded, udpatedBookmark);
  }
})

