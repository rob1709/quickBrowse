import React, { useState, useEffect } from 'react';
import '../styles/colourThemes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faXmark } from '@fortawesome/free-solid-svg-icons';
import { BookmarkCollection } from '../model/BookmarkCollection';

interface AddOrEditProfileModalProps {
  collection: BookmarkCollection;
  collectionChanged: (original: BookmarkCollection, edited: BookmarkCollection) => void;
  modalClosed: () => void;
  addMode: Boolean;
}

export function AddOrEditCollectionModal({ collection: profile, collectionChanged: profileChanged, modalClosed, addMode }: AddOrEditProfileModalProps) {
  const [name, setName] = useState(profile.name);
  const [icon, setIcon] = useState(profile.icon);

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
  }, [name, icon]); // Add dependencies to ensure the latest state is used

  const handleConfirm = () => {
    const updatedProfile = new BookmarkCollection(name, icon, profile.bookmarksOrderedByName);
    profileChanged(profile, updatedProfile);
  };

  return (
    <div className="add-edit-modal modal-contents">
      <div className="modal-header">
        <h2>{addMode ? "Add" : "Edit"} Profile</h2>
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
          <label>Icon:</label>
          <input
            type="text"
            className="shortcut-input"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
          <a
            href="https://fontawesome.com/search?o=r&m=free"
            style={{ marginLeft: '40px' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Find Icons
          </a>
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