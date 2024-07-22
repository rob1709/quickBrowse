import React, { useEffect, useMemo, useState } from 'react';
import './styles/App.css';
import './styles/colourThemes.css';
import './styles/addOrEditModal.css';
import { BookmarkCollection } from './model/BookmarkCollection';
import { BookmarkCollectionPanel } from './components/BookmarkCollectionPanel';
import { BrowserManagedBookmarkLoader, LocalBookmarkLoader } from './storage/StorageManager';
import { QuickBrowseProfile } from './model/QuickBrowseProfile';
import { QuickBrowseUserConfig } from './model/QuickBrowseUserConfig';
import { ProfileSelector } from './components/ProfileSelector';

function App() {
  
  const [availableProfiles, setAvailableProfiles] = useState<QuickBrowseProfile[]>([]);
  const [activeProfile, setActiveProfile] = useState(new QuickBrowseProfile("", new BookmarkCollection([]), ""));

  const [shortcutsActive, setShortcutsActive] = useState(true);

  //const bookmarkLoader : BookmarkLoader = new BrowserManagedBookmarkLoader();
  //const storageManager = useMemo(() => new LocalBookmarkLoader(), []);
  const storageManager = useMemo(() => new BrowserManagedBookmarkLoader(), []);

  useEffect(() => {
    // Load bookmarks from storage on startup
    const loadBookmarks = async () => {
      const quickBrowseConfig = await storageManager.loadQuickBrowseConfig()
      setAvailableProfiles(quickBrowseConfig.profiles);
      setActiveProfile(quickBrowseConfig.activeProfile);
    };

    loadBookmarks();
  }, [storageManager]);

  function handleActiveProfileChanged(profile: QuickBrowseProfile) {
    setActiveProfile(profile);
    storageManager.saveQuickBrowseConfig(new QuickBrowseUserConfig(availableProfiles, profile));
  }

  useEffect(() => {
    const handleKeyDown = (event : KeyboardEvent) => {
      if (shortcutsActive && event.key.length === 1) {
        const selectedBookmark = activeProfile.bookmarks.findBookmarkForKeyboardShortcut(event.key);
        // Uncomment the line below for testing purposes if necessary
        // alert(selectedBookmark?.name);
        if (selectedBookmark !== undefined && window.browser) {
          window.browser.tabs.update({ url: selectedBookmark.url }).then(() => {
            window.close();
          });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcutsActive, activeProfile.bookmarks]);

  const handleShortcutsDisabled = () => {
    setShortcutsActive(false);
  };

  const handleShortcutsEnabled = () => {
    setShortcutsActive(true);
  };

  const handleBookmarkCollectionChanged = (updatedCollection: BookmarkCollection) => {
    setActiveProfile(new QuickBrowseProfile(activeProfile.name, updatedCollection, activeProfile.icon));
    storageManager.saveQuickBrowseConfig(new QuickBrowseUserConfig([new QuickBrowseProfile("Home", updatedCollection, "")], activeProfile));
  };

  const handleProfilesChanged = (updatedProfiles: QuickBrowseProfile[], activeProfile: QuickBrowseProfile) => {
    setAvailableProfiles(updatedProfiles);
    storageManager.saveQuickBrowseConfig(new QuickBrowseUserConfig(updatedProfiles, activeProfile));
  }

  return (
    <div className="App">
      <ProfileSelector profiles={availableProfiles} activeProfile={activeProfile} onSelectionChanged={handleActiveProfileChanged} 
                       shortcutsDisabled={handleShortcutsDisabled} shortcutsEnabled={handleShortcutsEnabled}
                       onProfilesChanged={handleProfilesChanged}/>
      <BookmarkCollectionPanel
        bookmarkCollection={activeProfile.bookmarks}
        shortcutsDisabled={handleShortcutsDisabled}
        shortcutsEnabled={handleShortcutsEnabled}
        bookmarkCollectionChanged={handleBookmarkCollectionChanged}
      />
    </div>
  );
}

export default App;