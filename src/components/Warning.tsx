import '../styles/App.css';
import '../styles/colourThemes.css';

interface WarningProps {
  title: string;
  text: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function Warning({ title, text, onCancel, onConfirm}: WarningProps) {

  return (
        <div className='modal-content'>
        <div className='modal-contents'>
          <div className="add-edit-modal">
            <div className="modal-header">
              <h2>{title}</h2>
            </div>
            <div className="modal-content">
            <p className="modalText">{text}</p>
            <div className="modal-buttons">
              <button onClick={onConfirm}>Yes</button>
              <button onClick={onCancel} className="cancel-button">No</button>
            </div>
            </div>
          </div>
        </div>
        </div>
  );
}