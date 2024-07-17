import './App.css';
import { BookmarkCollection } from './model/BookmarkCollection';
import { Bookmark } from './model/Bookmark';

const sampleBookmarks = new BookmarkCollection([
    new Bookmark("Amazon", "https://www.amazon.co.uk", ""),
    new Bookmark("Reddit", "https://old.reddit.com", ""),
    new Bookmark("BBC News", "https://www.bbc.co.uk/news", ""),
    new Bookmark("Rightmove", "https://www.rightmove.co.uk/", ""),
    new Bookmark("Github", "https://github.com", ""),
    new Bookmark("Youtube", "https://www.youtube.com", ""),
    new Bookmark("BBC Football", "https://www.bbc.co.uk/sport/football", "")
]);

function App() {
  const bookmarks = sampleBookmarks.bookmarksOrderedByName; // Assuming this returns the array of bookmarks

  return (
    <div className="App">
      <div className="bookmark-panel">
        {bookmarks.map((bookmark, index) => (
          <a
            key={index}
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bookmark-button"
          >
            <div className="bookmark-icon">{bookmark.name.charAt(0)}</div>
            {bookmark.name}
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;