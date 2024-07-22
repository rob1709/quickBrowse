import React, { useState } from 'react';
import '../styles/colourThemes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faXmark } from '@fortawesome/free-solid-svg-icons';
import { BookmarkCollection } from '../model/BookmarkCollection';

interface AddOrEditProfileModalProps {
  profile: BookmarkCollection;
  collectionChanged: (original: BookmarkCollection, edited: BookmarkCollection) => void;
  modalClosed: () => void;
  addMode: Boolean;
}

export function AddOrEditCollectionModal({ profile, collectionChanged: profileChanged, modalClosed, addMode }: AddOrEditProfileModalProps) {
  const [name, setName] = useState(profile.name);
  const [icon, setIcon] = useState(profile.icon);

  const handleConfirm = () => {
    const updatedProfile = new BookmarkCollection(name, icon, profile.bookmarksOrderedByName);
    profileChanged(profile, updatedProfile);
  };

  return (
    <div className="add-edit-modal modal-contents">
      <div className="modal-header">
        <h2>{addMode ? "Add" : "Edit" } Profile</h2>
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
          <a href='https://fontawesome.com/search?o=r&m=free'>
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