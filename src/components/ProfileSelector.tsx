import { useState } from "react";
import { QuickBrowseProfile } from "../model/QuickBrowseProfile";
import '../styles/profileSelector.css';
import { AddOrEditProfileModal } from "./AddOrEditProfileModal";
import { BookmarkCollection } from "../model/BookmarkCollection";

interface ProfileSelectorProps {
  profiles: QuickBrowseProfile[];
  activeProfile: QuickBrowseProfile;
  onSelectionChanged: (profile: QuickBrowseProfile) => void;
  onProfilesChanged: (updatedProfiles: QuickBrowseProfile[], activeProfile: QuickBrowseProfile) => void;
  shortcutsEnabled: () => void;
  shortcutsDisabled: () => void;
}

export function ProfileSelector({ profiles, onSelectionChanged, activeProfile, shortcutsDisabled, shortcutsEnabled, onProfilesChanged }: ProfileSelectorProps) {
  
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleChange = (original: QuickBrowseProfile, updated: QuickBrowseProfile) => {
    const newProfiles = [...profiles, updated];
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

  return (
    <div className="profile-selector-bar">
      {profiles.map((profile, index) => (
        <span
          key={index}
          className={"profileSelector" + (profile === activeProfile ? " active" : "")}
          onClick={() => onSelectionChanged(profile)}
        >
          <i className={"fa " + profile.icon + " profileIcon"}></i>
          {profile.name}
        </span>
      ))}

      <span className="profileSelector newProfile" onClick={addNewProfile}>
        <i className="fa-solid fa-circle-plus"></i>
      </span>

      <div className={`modal-overlay ${addModalOpen ? 'active' : ''}`} onClick={() => setAddModalOpen(false)}></div>
      {addModalOpen && (
        <div className='modal-contents'>
          <AddOrEditProfileModal
            profile={new QuickBrowseProfile("", new BookmarkCollection([]),"")}
            profileChanged={handleChange}
            modalClosed={handleCloseModal}
            addMode={true}
          />
        </div>
      )}

    </div>
  );
}