import s from './ArticlePage.module.css';

const ArticlePage = () => {

  // Заглушка даних для демонстрації згідно з дизайном
  const article = {
    title: "9 tested tips to improve your wellbeing and quality of life",
    imageUrl: "path_to_your_image.jpg", // Світлина з лісом/горами
    content: `If you are a person who remains busy in work and other matters...`,
  };


  if (!article) return <div className={s.loader}>Loading...</div>;

  return (
    <main className={s.container}>
      {/* Шапка статті */}
      <header className={s.header}>
        <h1 className={s.title}>{article.title}</h1>
      </header>

      {/* Головне зображення */}
      <div className={s.imageWrapper}>
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className={s.heroImage} 
        />
      </div>

      {/* Контент статті */}
      <article className={s.content}>
        {/* Тут можна використовувати library як react-markdown, якщо контент у Markdown */}
        <p className={s.text}>{article.content}</p>
        
        {/* Приклад структури списку з дизайну */}
        <div className={s.tipsList}>
          <div className={s.tipItem}>
            <h3>1. Take Proper Sleep</h3>
            <p>It may seem to be the most common advice, but trust me...</p>
          </div>
          {/* ... інші поради */}
        </div>
      </article>
    </main>
  );
};

export default ArticlePage;