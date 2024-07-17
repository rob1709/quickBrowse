import { Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { TestContext } from '../TestContext';
import { BookmarkCollection } from '../../src/model/BookmarkCollection';


When('I view bookmarks alphabetically by name', () => {
  TestContext.instance.bookmarkCollection.bookmarksOrderedByName;
});

Then('my bookmark list contains an entry for {string} with url {string}', (name: string, url: string) => {
  const bookmarks = TestContext.instance.bookmarkCollection;
  const bookmarkWithMatchingName = bookmarks.bookmarksOrderedByName.find(bookmark => bookmark.name === name);
  assert(bookmarkWithMatchingName !== undefined, 'Bookmark not found in collection. Collection contained ' + TestContext.instance.bookmarkCollection.print());
  assert.equal(bookmarkWithMatchingName.url, url, `Expected URL to be "${url}", but found "${bookmarkWithMatchingName.url}"`);
});

Then(/^bookmark (\d+) is for '([^']+)' with url '([^']+)'$/, function (positionIndexedAtOne: number, bookmarkName: string, bookmarkUrl: string) {
  const bookmarks = TestContext.instance.bookmarkCollection.bookmarksOrderedByName;
  assert.equal(bookmarks[positionIndexedAtOne - 1].name, bookmarkName, `Expected bookmark at position ${positionIndexedAtOne} to have name ${bookmarkName}`);
  assert.equal(bookmarks[positionIndexedAtOne - 1].url, bookmarkUrl, `Expected bookmark at position ${positionIndexedAtOne} to have URL ${bookmarkUrl}`);
});