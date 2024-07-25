import '../styles/App.css';
import '../styles/colourThemes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface BookmarkButtonProps {
  onClick: () => void;
}

export function AddBookmarkButton({onClick}: BookmarkButtonProps) {

  // eslint-disable-next-line
  return (
    
    <div className="bookmark-button-add" onClick={onClick}>
      
      <a rel="noopener noreferrer"
        className="bookmark-text clickable">
        
      
      <FontAwesomeIcon icon={faPlus} className="bookmark-icon" />
      Add bookmark...
      </a>
    </div>
  );
}