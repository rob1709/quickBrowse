import React, { useEffect, useMemo, useState } from 'react';
import './styles/App.css';
import './styles/colourThemes.css';
import './styles/addOrEditModal.css';
import { BookmarkCollection } from './model/BookmarkCollection';
import { BookmarkCollectionPanel } from './components/BookmarkCollectionPanel';
import { QuickBrowseStorageManager } from './storage/StorageManager';
import { QuickBrowseProfile as QuickBrowseProfle } from './model/QuickBrowseProfile';
import { ProfileSelector } from './components/ProfileSelector';
import { LocalBookmarkLoader } from './storage/LocalStorageManager';
import { Bookmark } from './model/Bookmark';
import { BrowserManagedStorageManager } from './storage/BrowserStorageManager';
import { DynamicUrlBuilder } from './components/DynamicUrlBuilder';
import { BookmarkDynamicPlaceholder } from './model/BookmarkDynamicPlaceholder';

function App() {

  const [quickBrowseProfile, setQuickBrowseProfile] = useState<QuickBrowseProfle>(new QuickBrowseProfle([], new BookmarkCollection("", "", [])));
  const [shortcutsActive, setShortcutsActive] = useState(true);
  const [placeholderModalOpen, setPlaceholderModalOpen] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState<Bookmark>(new Bookmark("", "", ""));

  const localMode = true;
  const localStorageManager = useMemo(() => new LocalBookmarkLoader(), []);
  const browserStorageManager = useMemo(() => new BrowserManagedStorageManager(), []);
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

    if (selectedBookmark.dynamicPlaceholders.length > 0 ) {
      setShortcutsActive(false);
      setSelectedBookmark(selectedBookmark);
      setPlaceholderModalOpen(true);
    } else {
      navigateToSelection(selectedBookmark, []);
    }
  }

  function navigateToSelection(selectedBookmark: Bookmark, populatedPlaceholders: BookmarkDynamicPlaceholder[]) {
    if (selectedBookmark) {
      const url = selectedBookmark?.getUrlForSelectedShorctut([]);

      if (localMode) {
        alert(selectedBookmark?.name + ": " + url);
      } else if (selectedBookmark !== undefined && window.browser) {
        window.browser.tabs.update({ url: selectedBookmark.baseUrl }).then(() => {
        window.close();
        });
      }
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

  const closePlaceholderModal = () => {
    handleShortcutsEnabled();
    setPlaceholderModalOpen(false);
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
      <div className={`modal-overlay ${placeholderModalOpen ? 'active' : ''}`} onClick={() => closePlaceholderModal()}></div>
      {placeholderModalOpen && (
        <DynamicUrlBuilder bookmark={selectedBookmark} onCancel={() => closePlaceholderModal()} 
                          onConfirm={(bookmark, dynamicPlaceholders) => { closePlaceholderModal(); navigateToSelection(bookmark, dynamicPlaceholders); }} />
      )}
    </div>
  );
}

export default App;