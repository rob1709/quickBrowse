import React, { useState } from 'react';
import { BookmarkCollection } from '../model/BookmarkCollection';
import '../styles/App.css';
import '../styles/colourThemes.css';
import '../styles/addOrEditModal.css'
import { AddBookmarkButton } from './AddBookmarkButton';
import { BookmarkButton } from './BookmarkButton';
import { AddOrEditBookmarkModal } from './AddOrEditBookmarkModal';
import { Bookmark } from '../model/Bookmark';

interface BookmarkCollectionPanelProps {
  bookmarkCollection: BookmarkCollection; // Initial collection passed from parent
  shortcutsEnabled: () => void;
  shortcutsDisabled: () => void;
  bookmarkCollectionChanged: (updatedBookmarks: BookmarkCollection) => void;
}

export function BookmarkCollectionPanel({ bookmarkCollection: initialBookmarkCollection, shortcutsDisabled, shortcutsEnabled, bookmarkCollectionChanged }: BookmarkCollectionPanelProps) {
  const [bookmarkCollection, setBookmarkCollection] = useState(initialBookmarkCollection);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState<Bookmark | null>(null);

  const handleEditClick = (bookmark: Bookmark) => {
    setSelectedBookmark(bookmark);
    shortcutsDisabled();
    setIsModalOpen(true);
  };

  const handleBookmarkChanged = (originalBookmark: Bookmark, updatedBookmark: Bookmark) => {
    const updatedCollection = bookmarkCollection.updateBookmark(originalBookmark, updatedBookmark);
    setBookmarkCollection(updatedCollection);
    bookmarkCollectionChanged(updatedCollection);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    shortcutsEnabled();
  }

  return (
    <div className="bookmark-panel add-bookmark">
      {bookmarkCollection.bookmarksOrderedByName.map((bookmark, index) => (
        <BookmarkButton key={index} bookmark={bookmark} onEditClick={handleEditClick} />
      ))}
      <AddBookmarkButton />
      <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`} onClick={() => setIsModalOpen(false)}></div>
      {isModalOpen && (
        <div className='modal-contents'>
          <AddOrEditBookmarkModal
            bookmark={selectedBookmark!}
            bookmarkChanged={handleBookmarkChanged}
            modalClosed={() => handleCloseModal()}
          />
        </div>
      )}
    </div>
  );
}