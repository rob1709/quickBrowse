// src/components/BookmarkButton.tsx
import { Bookmark } from '../model/Bookmark';
import '../styles/App.css';
import '../styles/colourThemes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faPen } from '@fortawesome/free-solid-svg-icons';

interface BookmarkButtonProps {
  bookmark: Bookmark;
}

export function BookmarkButton({ bookmark }: BookmarkButtonProps) {
  return (
    <div className="bookmark-button">
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="bookmark-text"
      >
        <img src={bookmark.favicon} alt={`${bookmark.name.charAt(0)}`} className="bookmark-icon" />
        {bookmark.name}
      </a>
      <FontAwesomeIcon icon={faPen} className="edit-icon" />
      <FontAwesomeIcon icon={faCircleXmark} className="edit-icon" />
    </div>
  );
}