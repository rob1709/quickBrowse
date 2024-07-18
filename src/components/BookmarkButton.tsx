// src/components/BookmarkButton.tsx
import { Bookmark } from '../model/Bookmark';
import '../styles/App.css';
import '../styles/colourThemes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faPen } from '@fortawesome/free-solid-svg-icons';

interface BookmarkButtonProps {
  bookmark: Bookmark;
  onEditClick: (bookmark: Bookmark) => void;
}

export function BookmarkButton({ bookmark, onEditClick }: BookmarkButtonProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    browser.tabs.update({ url: bookmark.url }).then(() => {
      window.close();
    });
  };

  return (
    <div className="bookmark-button">
      <a
        href={bookmark.url}
        target="_self"
        rel="noopener noreferrer"
        className="bookmark-text"
        onClick={handleClick}
      >
        <img src={bookmark.favicon} alt={`${bookmark.name.charAt(0)}`} className="bookmark-icon" />
        {bookmark.name}
      </a>
      <FontAwesomeIcon icon={faPen} className="button-icon" onClick={() => onEditClick(bookmark)}  />
      <FontAwesomeIcon icon={faCircleXmark} className="button-icon" />
    </div>
  );
}