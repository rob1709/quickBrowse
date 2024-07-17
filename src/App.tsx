import './styles/App.css';
import './styles/colourThemes.css';
import { useState } from 'react';
import { BookmarkCollection } from './model/BookmarkCollection';
import { Bookmark } from './model/Bookmark';
import { BookmarkCollectionPanel } from './components/BookmarkCollectionPanel';
import { ThemeSelector } from './components/ThemeSelector';

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


  return (
    <div className="App">
      <ThemeSelector/>
      <BookmarkCollectionPanel bookmarkCollection={sampleBookmarks} />
    </div>
  );
}

export default App;