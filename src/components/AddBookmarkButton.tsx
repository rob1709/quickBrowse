// src/components/BookmarkButton.tsx
import { Bookmark } from '../model/Bookmark';
import '../styles/App.css';
import '../styles/colourThemes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark, faPlus } from '@fortawesome/free-solid-svg-icons';

interface BookmarkButtonProps {
  bookmark: Bookmark;
}

export function AddBookmarkButton() {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  };

  return (
    <div className="bookmark-button-add">
      <a>
      
      <FontAwesomeIcon icon={faPlus} className="bookmark-icon" />
      Add bookmark...
      </a>
    </div>
  );
}