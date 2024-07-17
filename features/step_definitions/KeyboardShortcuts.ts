import { When, Then} from '@cucumber/cucumber';
import { TestContext } from '../TestContext';
import { strict as assert } from 'assert';
import { BookmarkCollection } from '../../src/model/BookmarkCollection';
import { Bookmark } from '../../src/model/Bookmark';


When('the extension is open and I press {string}', (keyPress: string) => {
  TestContext.instance.selectedBookmark = TestContext.instance.bookmarkCollection.findBookmarkForKeyboardShortcut(keyPress);
})

Then('the URL is {string}', (expectedUrl: string) => {
  assert.equal(TestContext.instance.selectedBookmark?.url, expectedUrl);
})
