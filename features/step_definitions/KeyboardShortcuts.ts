import { When, Then} from '@cucumber/cucumber';
import { TestContext } from './TestContext';
import { strict as assert } from 'assert';
import { BookmarkDynamicPlaceholder } from '../../src/model/BookmarkDynamicPlaceholder';


When('the extension is open and I press {string}', (keyPress: string) => {
  TestContext.instance.selectedBookmark = TestContext.instance.bookmarkCollection.findBookmarkForKeyboardShortcut(keyPress);
  TestContext.instance.placeholders = [];
})

Then('the URL is {string}', (expectedUrl: string) => {
  const actual = TestContext.instance.selectedBookmark?.getUrlForSelectedShorctut(TestContext.instance.placeholders);
  assert.equal(actual, expectedUrl,  'Actual: ' + actual + ". Expected:" + expectedUrl);
})

When('I set placeholder {string} to {string}', (placeholder: string, value: string) => {
  TestContext.instance.placeholders.push(new BookmarkDynamicPlaceholder(placeholder, value));
})
