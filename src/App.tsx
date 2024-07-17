import './App.css';
import './styles/colourThemes.css';
import { useState } from 'react';
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
  const [theme, setTheme] = useState('light');
  const bookmarks = sampleBookmarks.bookmarksOrderedByName;

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('colour-theme', newTheme);
  };

  return (
    <div className="App">
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
      <div className="bookmark-panel">
        {bookmarks.map((bookmark, index) => (
          <a
            key={index}
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bookmark-button"
          >
            <img src={bookmark.favicon} alt={`${bookmark.name.charAt(0)}`} className="bookmark-icon" />
            {bookmark.name}
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;