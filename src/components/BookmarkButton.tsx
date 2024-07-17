// src/components/BookmarkButton.tsx
import { Bookmark } from '../model/Bookmark';
import '../styles/App.css';
import '../styles/colourThemes.css';

interface BookmarkButtonProps {
  bookmark: Bookmark;
}

export function BookmarkButton({ bookmark }: BookmarkButtonProps) {
  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bookmark-button"
    >
      <img src={bookmark.favicon} alt={`${bookmark.name.charAt(0)}`} className="bookmark-icon" />
      {bookmark.name}
    </a>
  );
}