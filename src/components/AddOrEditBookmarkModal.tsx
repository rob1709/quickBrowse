// src/components/AddOrEditBookmarkModal.tsx
import React, { useState } from 'react';
import { Bookmark } from '../model/Bookmark';
import '../styles/App.css';
import '../styles/colourThemes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

interface AddOrEditBookmarkModalProps {
  bookmark: Bookmark;
  bookmarkChanged: (bookmark: Bookmark) => void;
  modalClosed: () => void;
}

export function AddOrEditBookmarkModal({ bookmark, bookmarkChanged, modalClosed }: AddOrEditBookmarkModalProps) {
  const [name, setName] = useState(bookmark.name);
  const [url, setUrl] = useState(bookmark.url);
  const [shortcutKey, setShortcutKey] = useState(bookmark.shortcutKey);

  const handleConfirm = () => {
    const updatedBookmark = new Bookmark(name, url, shortcutKey);
    bookmarkChanged(updatedBookmark);
  };

  return (
    <div className="add-edit-bookmark-modal">
      <div className="modal-content">
        <h2>Edit Bookmark</h2>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <label>
          Shortcut Key:
          <input
            type="text"
            value={shortcutKey}
            onChange={(e) => setShortcutKey(e.target.value)}
          />
        </label>
        <div className="modal-buttons">
          <button onClick={handleConfirm}>
            <FontAwesomeIcon icon={faCheck} /> Confirm
          </button>
          <button onClick={modalClosed}>
            <FontAwesomeIcon icon={faTimes} /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
}