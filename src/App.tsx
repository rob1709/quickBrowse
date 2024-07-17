import React, { useEffect } from 'react';
import './styles/App.css';
import './styles/colourThemes.css';
import { BookmarkCollection } from './model/BookmarkCollection';
import { Bookmark } from './model/Bookmark';
import { BookmarkCollectionPanel } from './components/BookmarkCollectionPanel';
import { HeaderBar } from './components/HeaderBar';

const bookmarkCollection = new BookmarkCollection([
    new Bookmark("Amazon", "https://www.amazon.co.uk", "a"),
    new Bookmark("Reddit", "https://old.reddit.com", "i"),
    new Bookmark("BBC News", "https://www.bbc.co.uk/news", "n"),
    new Bookmark("Rightmove", "https://www.rightmove.co.uk/", "m"),
    new Bookmark("Github", "https://github.com", "g"),
    new Bookmark("Youtube", "https://www.youtube.com", "y"),
    new Bookmark("BBC Football", "https://www.bbc.co.uk/sport/football", "B")
]);

function App() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.length === 1) {
        const selectedBookmark = bookmarkCollection.findBookmarkForKeyboardShortcut(event.key);
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
  }, []);

  return (
    <div className="App">
      <BookmarkCollectionPanel bookmarkCollection={bookmarkCollection} />
    </div>
  );
}

export default App;