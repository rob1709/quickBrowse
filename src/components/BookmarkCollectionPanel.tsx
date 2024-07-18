import React, { useState } from 'react';
import { BookmarkCollection } from '../model/BookmarkCollection';
import '../styles/App.css';
import '../styles/colourThemes.css';
import '../styles/addOrEditModal.css';
import { AddBookmarkButton } from './AddBookmarkButton';
import { BookmarkButton } from './BookmarkButton';
import { AddOrEditBookmarkModal } from './AddOrEditBookmarkModal';
import { Bookmark } from '../model/Bookmark';

interface BookmarkCollectionPanelProps {
  bookmarkCollection: BookmarkCollection;
  shortcutsEnabled: () => void;
  shortcutsDisabled: () => void;
  bookmarkCollectionChanged: (updatedBookmarks: BookmarkCollection) => void;
}

export function BookmarkCollectionPanel({ bookmarkCollection, shortcutsDisabled, shortcutsEnabled, bookmarkCollectionChanged }: BookmarkCollectionPanelProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState<Bookmark | null>(null);
  const [bookmarkToDelete, setBookmarkToDelete] = useState<Bookmark | null>(null);

  const handleEditClick = (bookmark: Bookmark) => {
    setSelectedBookmark(bookmark);
    shortcutsDisabled();
    setEditModalOpen(true);
  };

  const handleAddClick = () => {
    handleEditClick(new Bookmark("","",""));
    shortcutsDisabled();
    setAddModalOpen(true);
  };

  const handleDeleteClick = (bookmark: Bookmark) => {
    setBookmarkToDelete(bookmark);
    shortcutsDisabled();
    setDeleteModalOpen(true);
  };

  const confirmDeleteBookmark = () => {
    if (bookmarkToDelete) {
      const updatedCollection = bookmarkCollection.deleteBookmark(bookmarkToDelete);
      bookmarkCollectionChanged(updatedCollection);
      handleCloseModal();
    }
  };

  const handleBookmarkAdded = (originalBookmark: Bookmark, newBookmark: Bookmark) => {
    const updatedCollection = bookmarkCollection.addBookmark(newBookmark);
    bookmarkCollectionChanged(updatedCollection);
    handleCloseModal();
  };

  const handleBookmarkChanged = (originalBookmark: Bookmark, updatedBookmark: Bookmark) => {
    const updatedCollection = bookmarkCollection.updateBookmark(originalBookmark, updatedBookmark);
    bookmarkCollectionChanged(updatedCollection);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setAddModalOpen(false);
    setDeleteModalOpen(false);
    shortcutsEnabled();
  };

  return (
    <div className="bookmark-panel add-bookmark">
      {bookmarkCollection.bookmarksOrderedByName.map((bookmark, index) => (
        <BookmarkButton key={index} bookmark={bookmark} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />
      ))}
      <AddBookmarkButton onClick={handleAddClick} />

      <div className={`modal-overlay ${editModalOpen ? 'active' : ''}`} onClick={() => setEditModalOpen(false)}></div>
      {editModalOpen && (
        <div className='modal-contents'>
          <AddOrEditBookmarkModal
            bookmark={selectedBookmark!}
            bookmarkChanged={handleBookmarkChanged}
            modalClosed={handleCloseModal}
            addMode={false}
            collection={bookmarkCollection}
          />
        </div>
      )}

      <div className={`modal-overlay ${addModalOpen ? 'active' : ''}`} onClick={() => setAddModalOpen(false)}></div>
      {addModalOpen && (
        <div className='modal-contents'>
          <AddOrEditBookmarkModal
            bookmark={new Bookmark("","","")}
            bookmarkChanged={handleBookmarkAdded}
            modalClosed={handleCloseModal}
            addMode={true}
            collection={bookmarkCollection}
          />
        </div>
      )}

      <div className={`modal-overlay ${deleteModalOpen ? 'active' : ''}`} onClick={() => setDeleteModalOpen(false)}></div>
      {deleteModalOpen && (
        <div className='modal-contents'>
          <div className="add-edit-bookmark-modal">
            <div className="modal-header">
              <h2>Delete {bookmarkToDelete?.name}?</h2>
            </div>
            <div className="modal-content">
            <p className='modalText'>Are you sure you want to delete bookmark for {bookmarkToDelete?.name}?</p>
            <div className="modal-buttons">
              <button onClick={confirmDeleteBookmark}>Yes</button>
              <button onClick={handleCloseModal} className="cancel-button">No</button>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}