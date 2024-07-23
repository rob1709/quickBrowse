import { useState } from "react";
import '../styles/profileSelector.css';
import { AddOrEditCollectionModal } from "./AddOrEditProfileModal";
import { BookmarkCollection } from "../model/BookmarkCollection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPen } from "@fortawesome/free-solid-svg-icons";

interface ProfileSelectorProps {
  collections: BookmarkCollection[];
  activeCollection: BookmarkCollection;
  onSelectionChanged: (profile: BookmarkCollection) => void;
  onProfilesChanged: (updatedProfiles: BookmarkCollection[], activeProfile: BookmarkCollection) => void;
  shortcutsEnabled: () => void;
  shortcutsDisabled: () => void;
}

export function ProfileSelector({ collections, onSelectionChanged, activeCollection, shortcutsDisabled, shortcutsEnabled, onProfilesChanged }: ProfileSelectorProps) {
  
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleChange = (original: BookmarkCollection, updated: BookmarkCollection) => {
    const newProfiles = [...collections, updated];
    onProfilesChanged(newProfiles, updated);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setAddModalOpen(false);
    shortcutsEnabled();
  };

  const addNewProfile = () => {
    openModal();
  }

  const openModal = () => {
    shortcutsDisabled();
    setAddModalOpen(true);
  }

  function onEditClick(collection: BookmarkCollection) {
    throw new Error("Function not implemented.");
  }

  function onDeleteClick(bookmark: BookmarkCollection) {
    throw new Error("Function not implemented.");
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
            profile={new BookmarkCollection("", "", [])}
            collectionChanged={handleChange}
            modalClosed={handleCloseModal}
            addMode={true}
          />
        </div>
      )}

    </div>
  );
}