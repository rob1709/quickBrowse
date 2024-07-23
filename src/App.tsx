import React, { useEffect, useMemo, useState } from 'react';
import './styles/App.css';
import './styles/colourThemes.css';
import './styles/addOrEditModal.css';
import { BookmarkCollection } from './model/BookmarkCollection';
import { BookmarkCollectionPanel } from './components/BookmarkCollectionPanel';
import { BrowserManagedBookmarkLoader } from './storage/StorageManager';
import { QuickBrowseProfile as QuickBrowseProfle } from './model/QuickBrowseProfile';
import { ProfileSelector } from './components/ProfileSelector';
import { LocalBookmarkLoader } from './storage/LocalStorageManager';

function App() {

  const [quickBrowseProfile, setQuickBrowseProfile] = useState<QuickBrowseProfle>(new QuickBrowseProfle([], new BookmarkCollection("", "", [])));
  const [shortcutsActive, setShortcutsActive] = useState(true);

  //const bookmarkLoader : BookmarkLoader = new BrowserManagedBookmarkLoader();
  const storageManager = useMemo(() => new LocalBookmarkLoader(), []);
  //const storageManager = useMemo(() => new BrowserManagedBookmarkLoader(), []);

  useEffect(() => {
    // Load bookmarks from storage on startup
    const loadBookmarks = async () => {
      const quickBrowseConfig = await storageManager.loadQuickBrowseConfig()
      setQuickBrowseProfile(quickBrowseConfig);
    };

    loadBookmarks();
  }, [storageManager]);

  function handleSwitchToNewCollection(collection: BookmarkCollection) {
    const newProfile = new QuickBrowseProfle(quickBrowseProfile.collections, collection);
    setQuickBrowseProfile(newProfile);
    storageManager.saveQuickBrowseProfile(newProfile);
  }

  useEffect(() => {
    const handleKeyDown = (event : KeyboardEvent) => {
      if (shortcutsActive && event.key.length === 1) {
        const selectedBookmark = quickBrowseProfile.activeCollection.findBookmarkForKeyboardShortcut(event.key);
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
  }, [shortcutsActive, quickBrowseProfile.activeCollection]);

  const handleShortcutsDisabled = () => {
    setShortcutsActive(false);
  };

  const handleShortcutsEnabled = () => {
    setShortcutsActive(true);
  };

  const handleBookmarkCollectionChanged = (updatedCollection: BookmarkCollection) => {
    const newProfile = quickBrowseProfile.updateCollection(quickBrowseProfile.activeCollection, updatedCollection);
    setQuickBrowseProfile(newProfile);
    storageManager.saveQuickBrowseProfile(newProfile);
  };

  const handleCollectionsChanged = (updatedCollections: BookmarkCollection[], activeCollection: BookmarkCollection) => {
    const quickBrowseProfile = new QuickBrowseProfle(updatedCollections, activeCollection);
    setQuickBrowseProfile(quickBrowseProfile);
    storageManager.saveQuickBrowseProfile(quickBrowseProfile);
  }

  return (
    <div className="App">

      <ProfileSelector collections={quickBrowseProfile.collections} activeCollection={quickBrowseProfile.activeCollection} onSelectionChanged={handleSwitchToNewCollection} 
                       shortcutsDisabled={handleShortcutsDisabled} shortcutsEnabled={handleShortcutsEnabled}
                       onProfilesChanged={handleCollectionsChanged}/>

      <BookmarkCollectionPanel
        bookmarkCollection={quickBrowseProfile.activeCollection}
        shortcutsDisabled={handleShortcutsDisabled}
        shortcutsEnabled={handleShortcutsEnabled}
        bookmarkCollectionChanged={handleBookmarkCollectionChanged}
      />

    </div>
  );
}

export default App;