import React, { useEffect, useState } from 'react';
import './styles/App.css';
import './styles/colourThemes.css';
import { BookmarkCollection } from './model/BookmarkCollection';
import { Bookmark } from './model/Bookmark';
import { BookmarkCollectionPanel } from './components/BookmarkCollectionPanel';

const STORAGE_KEY = 'bookmarks';

function App() {
  const [bookmarkCollection, setBookmarkCollection] = useState(new BookmarkCollection([]));
  const [shortcutsActive, setShortcutsActive] = useState(true);

  useEffect(() => {
    // Load bookmarks from storage on startup
    const loadBookmarks = async () => {
      const result = await browser.storage.local.get(STORAGE_KEY);
      if (result[STORAGE_KEY]) {
        const savedBookmarks = result[STORAGE_KEY].map(
          (bookmark: Bookmark) => new Bookmark(bookmark.name, bookmark.url, bookmark.shortcutKey)
        );
        setBookmarkCollection(new BookmarkCollection(savedBookmarks));
      }
    };

    loadBookmarks();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event : KeyboardEvent) => {
      if (shortcutsActive && event.key.length === 1) {
        const selectedBookmark = bookmarkCollection.findBookmarkForKeyboardShortcut(event.key);
        // Uncomment the line below for testing purposes if necessary
        // alert(selectedBookmark?.name);
        if (selectedBookmark !== undefined && window.browser) {
          window.browser.tabs.update({ url: selectedBookmark.url }).then(() => {
            window.close();
          });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcutsActive, bookmarkCollection]);

  const handleShortcutsDisabled = () => {
    setShortcutsActive(false);
  };

  const handleShortcutsEnabled = () => {
    setShortcutsActive(true);
  };

  const handleBookmarkCollectionChanged = (updatedCollection: BookmarkCollection) => {
    setBookmarkCollection(updatedCollection);
    // Save bookmarks to storage whenever they are updated
    browser.storage.local.set({
      [STORAGE_KEY]: updatedCollection.bookmarksOrderedByName.map((bookmark: Bookmark) => ({
        name: bookmark.name,
        url: bookmark.url,
        shortcutKey: bookmark.shortcutKey,
      })),
    });
  };

  return (
    <div className="App">
      <BookmarkCollectionPanel
        bookmarkCollection={bookmarkCollection}
        shortcutsDisabled={handleShortcutsDisabled}
        shortcutsEnabled={handleShortcutsEnabled}
        bookmarkCollectionChanged={handleBookmarkCollectionChanged}
      />
    </div>
  );
}

export default App;