// src/components/BookmarkButton.tsx
import { Bookmark } from '../model/Bookmark';
import '../styles/App.css';
import '../styles/colourThemes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faPen } from '@fortawesome/free-solid-svg-icons';

interface BookmarkButtonProps {
  bookmark: Bookmark;
  onSelect: (selectedBookmark: Bookmark) => void;
  onEditClick: (bookmark: Bookmark) => void;
  onDeleteClick: (bookmark: Bookmark) => void;
}

export function BookmarkButton({ bookmark, onSelect, onEditClick, onDeleteClick }: BookmarkButtonProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    browser.tabs.update({ url: bookmark.baseUrl }).then(() => {
      window.close();
    });
  };

  return (
    <div className="bookmark-button">
      <a
        target="_self"
        rel="noopener noreferrer"
        className="bookmark-text"
        onClick={() => onSelect(bookmark)}
      >
        <img src={bookmark.favicon} alt={`${bookmark.name.charAt(0)}`} className="bookmark-icon" />
        {bookmark.name}
        <span className='bookmarkShortcutText'>({bookmark.shortcutKey})</span>
      </a>
      <FontAwesomeIcon icon={faPen} className="button-icon" onClick={() => onEditClick(bookmark)}  />
      <FontAwesomeIcon icon={faCircleXmark} className="button-icon" onClick={() => onDeleteClick(bookmark)} />
    </div>
  );
}