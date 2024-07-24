import React, { useState } from 'react';
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

  const handleInputChange = (placeholder: string, value: string) => {
    setPlaceholderValues(prevValues => ({
      ...prevValues,
      [placeholder]: value
    }));
    
    const newDynamicPlaceholders = dynamicPlaceholders.map(
        p => p.placeholder === placeholder ? new BookmarkDynamicPlaceholder(placeholder, value) : p
    )

    setDynamicPlaceholders(newDynamicPlaceholders);
    const newUrl = bookmark.getUrlForSelectedShorctut(newDynamicPlaceholders);

    setUrl(newUrl);
  };

  const handleConfirm = () => {
    onConfirm(bookmark, dynamicPlaceholders);
  };

  return (
    <div className='modal-content'>
      <div className='modal-contents'>
        <div className="add-edit-modal">
          <div className="modal-header">
            <h2>Enter URL values</h2>
          </div>
          <div style={{ paddingLeft: '20px', textAlign: 'left'  }} className="modal-content">
            <p style={{ textAlign: 'left' }} className="modalText">{url}</p>
            {unpopulatedPlaceholders.map(placeholder => (
              <div key={placeholder} className="form-group" style={{marginBottom: '0px'}}>
                <label>{placeholder}: </label>
                <input
                  type="text"
                  value={placeholderValues[placeholder] || ''}
                  onChange={(e) => handleInputChange(placeholder, e.target.value)}
                />
              </div>
            ))}
            <div className="modal-buttons">
              <button onClick={handleConfirm}>Yes</button>
              <button onClick={onCancel} className="cancel-button">No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}