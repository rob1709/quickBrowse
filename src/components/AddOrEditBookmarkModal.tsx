// src/components/AddOrEditBookmarkModal.tsx
import React, { useState } from 'react';
import { Bookmark } from '../model/Bookmark';
import '../styles/addOrEditModal.css';
import '../styles/colourThemes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faXmark } from '@fortawesome/free-solid-svg-icons';

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
      <div className="modal-header">
        <h2>Edit Bookmark</h2>
        <button className="close-button" onClick={modalClosed}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className="modal-content">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Shortcut:</label>
          <input
            type="text"
            value={shortcutKey}
            maxLength={1}
            width="2px"
            onChange={(e) => setShortcutKey(e.target.value)}
          />
        </div>
        <div className="modal-buttons">
          <button onClick={handleConfirm}>
            <FontAwesomeIcon icon={faCheck} /> Confirm
          </button>
          <button className="cancel-button" onClick={modalClosed}>
            <FontAwesomeIcon icon={faTimes} /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
}