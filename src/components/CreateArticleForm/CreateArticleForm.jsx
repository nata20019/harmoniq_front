import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsLoading } from '../../redux/articles/selectors';
import { fetchArticles } from '../../redux/articles/operations';
import { createArticle } from '../../redux/articles/operations';
import s from './CreateArticleForm.module.css';

const CreateArticleForm = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  // Обробка вибору файлу
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Створюємо тимчасове посилання для прев'ю
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', text);
    if (image) formData.append('image', image); // Ключ 'image' має збігатися з налаштуваннями multer на бекенді

    const result = await dispatch(createArticle(formData));
    
    if (!result.error) {
      // Оновлюємо загальний список статей перед переходом
  await dispatch(fetchArticles());
      navigate('/articles'); // Повертаємося до списку після успіху
    }
  };

  return (
    <div className={s.pageWrapper}>
      <form className={s.form} onSubmit={handleSubmit}>
        <h1 className={s.pageTitle}>Create an article</h1>

        <div className={s.flexContainer}>
          {/* Блок завантаження фото */}
          <div 
            className={s.uploadArea} 
            onClick={() => fileInputRef.current.click()}
            style={{ backgroundImage: preview ? `url(${preview})` : 'none' }}
          >
            {!preview && <div className={s.cameraIcon}>📷</div>}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              accept="image/*" 
              hidden 
            />
          </div>

          {/* Поле для заголовку */}
          <div className={s.inputGroup}>
            <label>Title</label>
            <input 
              type="text" 
              placeholder="Enter the title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Поле для тексту */}
        <div className={s.textAreaGroup}>
          <label>Enter a text:</label>
          <textarea 
            placeholder="Start writing..." 
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isLoading} className={s.publishBtn}>
          Publish Article
        </button>
      </form>
    </div>
  );
};

export default CreateArticleForm;