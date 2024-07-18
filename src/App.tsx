import React, { useEffect, useState } from 'react';
import './styles/App.css';
import './styles/colourThemes.css';
import { BookmarkCollection } from './model/BookmarkCollection';
import { Bookmark } from './model/Bookmark';
import { BookmarkCollectionPanel } from './components/BookmarkCollectionPanel';

const initialBookmarks = [
    new Bookmark("Amazon", "https://www.amazon.co.uk", "a"),
    new Bookmark("Reddit", "https://old.reddit.com", "i"),
    new Bookmark("BBC News", "https://www.bbc.co.uk/news", "n"),
    new Bookmark("Rightmove", "https://www.rightmove.co.uk/", "m"),
    new Bookmark("Github", "https://github.com", "g"),
    new Bookmark("Youtube", "https://www.youtube.com", "y"),
    new Bookmark("FontAwesome", "https://fontawesome.com/icons/", "f"),
    new Bookmark("BBC Football", "https://www.bbc.co.uk/sport/football", "B")
];

const initialBookmarkCollection = new BookmarkCollection(initialBookmarks);

function App() {
  const [bookmarkCollection, setBookmarkCollection] = useState(initialBookmarkCollection);
  const [shortcutsActive, setShortcutsActive] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (shortcutsActive && event.key.length === 1) {
        const selectedBookmark = bookmarkCollection.findBookmarkForKeyboardShortcut(event.key);
        // Commented out for testing using npm start. This allows testing of the
        // logic even though the below won't work as we're no in extension context
        //alert(selectedBookmark?.name); 
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