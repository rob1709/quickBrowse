// src/components/BookmarkCollectionPanel.tsx
import React, { useState } from 'react';
import { BookmarkCollection } from '../model/BookmarkCollection';
import '../styles/App.css';
import '../styles/colourThemes.css';
import { AddBookmarkButton } from './AddBookmarkButton';
import { BookmarkButton } from './BookmarkButton';
import { AddOrEditBookmarkModal } from './AddOrEditBookmarkModal';
import { Bookmark } from '../model/Bookmark';

interface BookmarkCollectionPanelProps {
  bookmarkCollection: BookmarkCollection;
}

export function BookmarkCollectionPanel({ bookmarkCollection }: BookmarkCollectionPanelProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState<Bookmark | null>(null);

  const handleEditClick = (bookmark: Bookmark) => {
    setSelectedBookmark(bookmark);
    setIsModalOpen(true);
  };

  const handleBookmarkChanged = (updatedBookmark: Bookmark) => {
    //bookmarkCollection.updateBookmark(updatedBookmark);
    setIsModalOpen(false);
  };

  return (
    <div className="bookmark-panel add-bookmark">
      {bookmarkCollection.bookmarksOrderedByName.map((bookmark, index) => (
        <BookmarkButton key={index} bookmark={bookmark} onEditClick={handleEditClick} />
      ))}
      <AddBookmarkButton />
      {isModalOpen && selectedBookmark && (
        <AddOrEditBookmarkModal
          bookmark={selectedBookmark}
          bookmarkChanged={handleBookmarkChanged}
          modalClosed={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}