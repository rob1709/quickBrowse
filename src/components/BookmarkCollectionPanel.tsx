import { BookmarkCollection } from '../model/BookmarkCollection';
import '../styles/App.css';
import '../styles/colourThemes.css';
import { BookmarkButton } from './BookmarkButton';

interface BookmarkCollectionPanelProps {
  bookmarkCollection: BookmarkCollection;
}

export function BookmarkCollectionPanel({ bookmarkCollection }: BookmarkCollectionPanelProps) {
  return (
    <div className="bookmark-panel">
    {bookmarkCollection.bookmarksOrderedByName.map((bookmark, index) => (
      <BookmarkButton key={index} bookmark={bookmark} />
    ))}
  </div>
  );
}