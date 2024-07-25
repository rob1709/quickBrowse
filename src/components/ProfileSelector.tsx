import { useState } from "react";
import '../styles/profileSelector.css';
import { AddOrEditCollectionModal } from "./AddOrEditCollectionModal";
import { BookmarkCollection } from "../model/BookmarkCollection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPen } from "@fortawesome/free-solid-svg-icons";
import { Warning } from "./Warning";

interface ProfileSelectorProps {
  collections: BookmarkCollection[];
  activeCollection: BookmarkCollection;
  onSelectionChanged: (profile: BookmarkCollection) => void;
  onCollectionsChanged: (updatedCollections: BookmarkCollection[], activeColleciton: BookmarkCollection) => void;
  shortcutsEnabled: () => void;
  shortcutsDisabled: () => void;
}

export function ProfileSelector({ collections, onSelectionChanged, activeCollection, shortcutsDisabled, shortcutsEnabled, onCollectionsChanged: onProfilesChanged }: ProfileSelectorProps) {
  
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState<BookmarkCollection | null>(null);
  const [selectedCollection, setSelectedCollection] = useState(new BookmarkCollection("", "", []));

  const handleChange = (original: BookmarkCollection, updated: BookmarkCollection) => {
    var newCollections;

    if (collections.includes(original)) {
      newCollections = collections.map( collection => 
        collection === original ? updated : collection
      );
    } else {
      newCollections = [...collections, updated];
    }
    onProfilesChanged(newCollections, updated);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setAddModalOpen(false);
    setDeleteModalOpen(false);
    shortcutsEnabled();
  };

  const addNewProfile = () => {
    setSelectedCollection(new BookmarkCollection("", "", []));
    shortcutsDisabled();
    openModal();
  }

  function onEditClick(collection: BookmarkCollection) {
    setSelectedCollection(collection);
    shortcutsDisabled();
    setAddModalOpen(true);
  }

  const openModal = () => {
    shortcutsDisabled();
    setAddModalOpen(true);
  }

  const onDeleteClick = (collection: BookmarkCollection) => {
    setCollectionToDelete(collection);
    shortcutsDisabled();
    setDeleteModalOpen(true);
  };

  function confirmDelete() {
    const updatedCollections = collections.filter(collection => collection !== collectionToDelete);
    const newActiveCollection = (activeCollection === collectionToDelete) ? collections[0] : activeCollection;
    onProfilesChanged(updatedCollections, newActiveCollection);
    handleCloseModal();
  }

  return (
    <div className="profile-selector-bar">
      {collections.map((collection, index) => (
        <span
          key={index}
          className={"profileSelector" + (collection === activeCollection ? " active" : "")}
        >
          <span className="clickable" onClick={() => onSelectionChanged(collection)} style={{paddingRight: "15px"}}>
          <i className={"fa " + collection.icon + " profileIcon"}></i>
          {collection.name}
        </span>
          <FontAwesomeIcon icon={faPen} className="button-icon" onClick={() => onEditClick(collection)}  />
          <FontAwesomeIcon icon={faCircleXmark} className="button-icon" onClick={() => onDeleteClick(collection)} />
        </span>
      ))}

      <span className="profileSelector newProfile" onClick={addNewProfile}>
        <i className="fa-solid fa-circle-plus"></i>
      </span>

      <div className={`modal-overlay ${addModalOpen ? 'active' : ''}`} onClick={() => setAddModalOpen(false)}></div>
      {addModalOpen && (
        <div className='modal-contents'>
          <AddOrEditCollectionModal
            collection={selectedCollection}
            collectionChanged={handleChange}
            modalClosed={handleCloseModal}
            addMode={true}
          />
        </div>
      )}

<div className={`modal-overlay ${deleteModalOpen ? 'active' : ''}`} onClick={() => setDeleteModalOpen(false)}></div>
      {deleteModalOpen && (
        <Warning title={"Delete " + collectionToDelete?.name + "?"}
                 text={"Are you sure you want to delete collection '" + collectionToDelete?.name + "'?"} 
                 onCancel={handleCloseModal}
                 onConfirm={confirmDelete}
        />
      )}

    </div>
  );
}