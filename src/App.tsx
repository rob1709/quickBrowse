import React, { useEffect, useMemo, useState } from 'react';
import './styles/App.css';
import './styles/colourThemes.css';
import { BookmarkCollection } from './model/BookmarkCollection';
import { BookmarkCollectionPanel } from './components/BookmarkCollectionPanel';
import { LocalBookmarkLoader } from './storage/StorageManager';
import { QuickBrowseProfile } from './model/QuickBrowseProfile';
import { QuickBrowseUserConfig } from './model/QuickBrowseUserConfig';
import { ProfileSelector } from './components/ProfileSelector';

function App() {
  
  const [availableProfiles, setAvailableProfiles] = useState<QuickBrowseProfile[]>([]);
  const [currentProfile, setCurrentProfile] = useState(new QuickBrowseProfile("", new BookmarkCollection([]), ""));

  //const [bookmarkCollection, setBookmarkCollection] = useState(new BookmarkCollection([]));
  const [shortcutsActive, setShortcutsActive] = useState(true);

  //const bookmarkLoader : BookmarkLoader = new BrowserManagedBookmarkLoader();
  const storageManager = useMemo(() => new LocalBookmarkLoader(), []);

  useEffect(() => {
    // Load bookmarks from storage on startup
    const loadBookmarks = async () => {
      const quickBrowseConfig = await storageManager.loadQuickBrowseConfig()
      setAvailableProfiles(quickBrowseConfig.profiles);
      setCurrentProfile(quickBrowseConfig.profiles[0]);
    };

    loadBookmarks();
  }, [storageManager]);

  useEffect(() => {
    const handleKeyDown = (event : KeyboardEvent) => {
      if (shortcutsActive && event.key.length === 1) {
        const selectedBookmark = currentProfile.bookmarks.findBookmarkForKeyboardShortcut(event.key);
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
  }, [shortcutsActive, currentProfile.bookmarks]);

  const handleShortcutsDisabled = () => {
    setShortcutsActive(false);
  };

  const handleShortcutsEnabled = () => {
    setShortcutsActive(true);
  };

  const handleBookmarkCollectionChanged = (updatedCollection: BookmarkCollection) => {
    setCurrentProfile(new QuickBrowseProfile(currentProfile.name, updatedCollection, currentProfile.icon));
    storageManager.saveQuickBrowseConfig(new QuickBrowseUserConfig([new QuickBrowseProfile("Home", updatedCollection, "")]));
  };

  

  return (
    <div className="App">
      <ProfileSelector profiles={availableProfiles} activeProfile={currentProfile} onSelectionChanged={selection => setCurrentProfile(selection)}/>
      <BookmarkCollectionPanel
        bookmarkCollection={currentProfile.bookmarks}
        shortcutsDisabled={handleShortcutsDisabled}
        shortcutsEnabled={handleShortcutsEnabled}
        bookmarkCollectionChanged={handleBookmarkCollectionChanged}
      />
    </div>
  );
}

export default App;