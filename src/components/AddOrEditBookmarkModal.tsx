import React, { useState, useEffect, useCallback } from 'react';
import { Bookmark } from '../model/Bookmark';
import '../styles/colourThemes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faXmark, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { BookmarkCollection } from '../model/BookmarkCollection';
import { Tooltip } from 'react-tooltip';
import setupDynamicShortcutImage from '../images/setupDynamicShortcut.png';
import selectDynamicShortcutImage from '../images/selectDynamicShortcut.png';
import dynamicShortcutResult from '../images/dynamicShortcutResult.png';
import { Fade } from 'react-slideshow-image';

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    setupDynamicShortcutImage,
    selectDynamicShortcutImage,
    dynamicShortcutResult,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const validateRequest = useCallback((updatedBookmark: Bookmark) => {
    if (addMode) {
      return collection.validateBookmarkCreation(updatedBookmark);
    } else {
      return collection.validateBookmarkAmendment(bookmark, updatedBookmark);
    }
  }, [addMode, collection, bookmark]);

  const handleConfirm = useCallback((event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    const updatedBookmark = new Bookmark(name, url, shortcutKey);
    const validationResult = validateRequest(updatedBookmark);
    if (validationResult === undefined) {
      bookmarkChanged(bookmark, updatedBookmark);
    } else {
      setError(validationResult);
    }
  }, [name, url, shortcutKey, bookmark, bookmarkChanged, validateRequest]);

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
        <form onSubmit={handleConfirm}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus={true}
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
            <span className='input-help'>
              <FontAwesomeIcon icon={faCircleInfo} />
              <span style={{ marginLeft: '5px' }} >Advanced</span>

              <Tooltip anchorSelect=".input-help" place="left" className='tooltipModal' style={{ maxWidth: 550, minHeight:420, borderRadius: 12, opacity: "100%" }}>
                <h3>Dynamic Bookmarks</h3>
                Use braces to add dynamic placeholders (e.g. amazon.co.uk/s?k={"{Search}"}). You can enter these when opening the bookmark:
                
                <div className="image-container">

                <Fade arrows={false} autoplay={true} duration={1500}>
                
                  <div className="each-slide">
                    <div>
                      <img className="dynamic-shortcut-image" src={images[0]} />
                    </div>
                  </div>

                  <div className="each-slide">
                  
                    <div>
                      <img className="dynamic-shortcut-image" src={images[1]} />
                    </div>
                  </div>

                  <div className="each-slide">
                    <div>
                      <img className="dynamic-shortcut-image" src={images[2]} />
                  </div>
                </div>

              </Fade>
              <img src={images[currentImageIndex]} alt="Dynamic Shortcut" className="dynamic-shortcut-image" />
              </div>
              </Tooltip>

            </span>
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
            <button type="submit">
              <FontAwesomeIcon icon={faCheck} /> Confirm
            </button>
            <button type="button" className="cancel-button" onClick={modalClosed}>
              <FontAwesomeIcon icon={faTimes} /> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}