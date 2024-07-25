import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Bookmark } from '../model/Bookmark';
import { BookmarkDynamicPlaceholder } from '../model/BookmarkDynamicPlaceholder';
import '../styles/App.css';
import '../styles/colourThemes.css';

interface DynamicUrlBuilderProps {
  bookmark: Bookmark;
  onCancel: () => void;
  onConfirm: (bookmark: Bookmark, populatedPlaceholders: BookmarkDynamicPlaceholder[]) => void;
}

export function DynamicUrlBuilder({ bookmark, onCancel, onConfirm }: DynamicUrlBuilderProps) {
  const unpopulatedPlaceholders: string[] = bookmark.dynamicPlaceholders;
  const [placeholderValues, setPlaceholderValues] = useState<{ [key: string]: string }>({});
  const [dynamicPlaceholders, setDynamicPlaceholders] = useState<BookmarkDynamicPlaceholder[]>(bookmark.dynamicPlaceholders.map(p => new BookmarkDynamicPlaceholder(p, "")));
  const [url, setUrl] = useState(bookmark.baseUrl);
  const firstInputRef = useRef<HTMLInputElement>(null); // Reference for the first input field

  useEffect(() => {
    // Focus on the first input field when the component mounts
    const timer = setTimeout(() => {
      if (firstInputRef.current) {
        firstInputRef.current.focus();
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = useCallback((placeholder: string, value: string) => {
    setPlaceholderValues(prevValues => ({
      ...prevValues,
      [placeholder]: value
    }));
    
    const newDynamicPlaceholders = dynamicPlaceholders.map(
      p => p.placeholder === placeholder ? new BookmarkDynamicPlaceholder(placeholder, value) : p
    );

    setDynamicPlaceholders(newDynamicPlaceholders);
    const newUrl = bookmark.getUrlForSelectedShorctut(newDynamicPlaceholders);

    setUrl(newUrl);
  }, [dynamicPlaceholders, bookmark]);

  const handleConfirm = useCallback((event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    onConfirm(bookmark, dynamicPlaceholders);
  }, [bookmark, dynamicPlaceholders, onConfirm]);

  return (
    <div className='modal-content'>
      <div className='modal-contents'>
        <div className="add-edit-modal">
          <div className="modal-header">
            <h2>Enter URL values</h2>
          </div>
          <form className="modal-form" onSubmit={handleConfirm} style={{ paddingLeft: '20px', textAlign: 'left' }}>
            <p className="modalText" style={{marginBottom: '20px', textAlign: 'left', fontWeight: '250'}}>{url}</p>
            {unpopulatedPlaceholders.map((placeholder, index) => (
              <div key={placeholder} className="form-group">
                <label>{placeholder}: </label>
                <input
                  ref={index === 0 ? firstInputRef : null} // Attach ref to the first input field
                  type="text"
                  value={placeholderValues[placeholder] || ''}
                  onChange={(e) => handleInputChange(placeholder, e.target.value)}
                />
              </div>
            ))}
            <div className="modal-buttons">
              <button type="submit">OK</button>
              <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}