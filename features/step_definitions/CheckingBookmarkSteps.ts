import { Given, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { BookmarkCollection } from '../../src/model/BookmarkCollection';
import { TestContext } from '../TestContext';

Then('my bookmark list contains an entry for {string} with url {string}', (name: string, url: string) => {
    var bookmarks = TestContext.instance.bookmarkCollection;
    var bookmarkWithMatchingName = (bookmarks.bookmarksOrderedByName.find(bookmark => bookmark.name === name));
    assert(bookmarkWithMatchingName !== undefined, 'Bookmark not found in collection. Collection contained ' + TestContext.instance.bookmarkCollection.print());
    assert.equal(bookmarkWithMatchingName.url, url, `Expected URL to be "${url}", but found "${bookmarkWithMatchingName.url}"`);
  })