import React, { useState, useEffect } from 'react';
import { Bookmark } from '../model/Bookmark';
import '../styles/colourThemes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faXmark } from '@fortawesome/free-solid-svg-icons';
import { BookmarkCollection } from '../model/BookmarkCollection';

interface AddOrEditBookmarkModalProps {
  bookmark: Bookmark;
  bookmarkChanged: (original: Bookmark, edited: Bookmark) => void;
  modalClosed: () => void;
  addMode: Boolean;
  collection: BookmarkCollection;
}

export function AddOrEditBookmarkModal({ bookmark, bookmarkChanged, modalClosed, addMode, collection }: AddOrEditBookmarkModalProps) {
  const [name, setName] = useState(bookmark.name);
  const [error, setError] = useState("");
  const [url, setUrl] = useState(bookmark.baseUrl);
  const [shortcutKey, setShortcutKey] = useState(bookmark.shortcutKey);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleConfirm();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [name, url, shortcutKey]); // Add dependencies to ensure the latest state is used

  const handleConfirm = () => {
    const updatedBookmark = new Bookmark(name, url, shortcutKey);
    const validationResult = validateRequest(updatedBookmark);
    if (validationResult === undefined) {
      bookmarkChanged(bookmark, updatedBookmark);
    } else {
      setError(validationResult);
    }
  };

  function validateRequest(updatedBookmark: Bookmark) {
    if (addMode) {
      return collection.validateBookmarkCreation(updatedBookmark);
    } else {
      return collection.validateBookmarkAmendment(bookmark, updatedBookmark);
    }
  }

  const handleShortcutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(-1);
    setShortcutKey(newValue);
  };

  return (
    <div className="add-edit-modal">
      <div className="modal-header">
        <h2>{addMode ? "Add" : "Edit"} Bookmark</h2>
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
            style={{ width: '450px' }} 
          />
        </div>

        <div className="form-group">
          <label>Shortcut:</label>
          <input
            type="text"
            className="shortcut-input"
            value={shortcutKey}
            onChange={handleShortcutChange}
            style={{ width: '20px' }} 
          />
        </div>

        <p className='errorText'>{error}</p>

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