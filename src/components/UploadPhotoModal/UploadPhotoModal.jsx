import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateAvatar } from '../../redux/auth/operations';
import s from './UploadPhotoModal.module.css';

const UploadPhotoModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleSave = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file); 

    try {
      const result = await dispatch(updateAvatar(formData));
      // Якщо в результаті немає помилки, закриваємо
      if (!result.error) {
        onClose();
      }
    } catch (error) {
      console.error('Помилка при завантаженні файлу:', error);
    }
  };

  return (
    <div className={s.backdrop} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={s.modal}>
        <button className={s.closeBtn} onClick={onClose}>&times;</button>
        
        <h2 className={s.title}>Upload your photo</h2>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className={s.hiddenInput} 
        />

        <div className={s.uploadZone} onClick={handleBoxClick}>
          {preview ? (
            <div className={s.avatarWrapper}>
              <img src={preview} alt="Preview" className={s.previewImage} />
            </div>
          ) : (
            <div className={s.cameraIconBox}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
          )}
        </div>

        <button 
          className={`${s.saveBtn} ${preview ? s.active : ''}`} 
          disabled={!file}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default UploadPhotoModal;