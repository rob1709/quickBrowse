import React, { useEffect, useMemo, useState } from 'react';
import './styles/App.css';
import './styles/colourThemes.css';
import './styles/addOrEditModal.css';
import { BookmarkCollection } from './model/BookmarkCollection';
import { BookmarkCollectionPanel } from './components/BookmarkCollectionPanel';
import { BrowserManagedBookmarkLoader, QuickBrowseStorageManager } from './storage/StorageManager';
import { QuickBrowseProfile as QuickBrowseProfle } from './model/QuickBrowseProfile';
import { ProfileSelector } from './components/ProfileSelector';
import { LocalBookmarkLoader } from './storage/LocalStorageManager';
import { Bookmark } from './model/Bookmark';

function App() {

  const [quickBrowseProfile, setQuickBrowseProfile] = useState<QuickBrowseProfle>(new QuickBrowseProfle([], new BookmarkCollection("", "", [])));
  const [shortcutsActive, setShortcutsActive] = useState(true);

  const localMode = true;
  const localStorageManager = useMemo(() => new LocalBookmarkLoader(), []);
  const browserStorageManager = useMemo(() => new BrowserManagedBookmarkLoader(), []);
  const storageManager: QuickBrowseStorageManager = localMode ? localStorageManager : browserStorageManager ;
  

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


  const bookmarkSelected = (selectedBookmark: Bookmark) => {

    const url = selectedBookmark?.getUrlForSelectedShorctut([]);

    if (localMode) {
      alert(selectedBookmark?.name + ": " + url);
    } else if (selectedBookmark !== undefined && window.browser) {
      window.browser.tabs.update({ url: selectedBookmark.baseUrl }).then(() => {
        window.close();
      });
    }
  }

  useEffect(() => {
    const handleKeyDown = (event : KeyboardEvent) => {
      if (shortcutsActive && event.key.length === 1) {
        const selectedBookmark = quickBrowseProfile.activeCollection.findBookmarkForKeyboardShortcut(event.key);
        if (selectedBookmark) {
          bookmarkSelected(selectedBookmark);
        }
      };

    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcutsActive, quickBrowseProfile.activeCollection, localMode]);

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
                       onCollectionsChanged={handleCollectionsChanged}/>

      <BookmarkCollectionPanel
        bookmarkCollection={quickBrowseProfile.activeCollection}
        shortcutsDisabled={handleShortcutsDisabled}
        shortcutsEnabled={handleShortcutsEnabled}
        bookmarkCollectionChanged={handleBookmarkCollectionChanged}
        bookmarkSelected={bookmarkSelected}
      />

    </div>
  );
}

export default App;