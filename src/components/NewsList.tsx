import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useFetchNews } from '@/hooks/useFetchNews';
import NewsCard from './NewsCard';
import { NewsPost, POST_TAGS, BASE_URL } from '@/api/config';

// Убедимся, что тип для детальной новости правильный
interface NewsDetailPost extends NewsPost {
  content?: string; // Это поле может приходить с полным HTML
}

const NewsList = () => {
  const { posts, loading, hasMore, loadMore, error } = useFetchNews();
  const [selectedNews, setSelectedNews] = useState<NewsDetailPost | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Для отладки: выводим в консоль данные, приходящие с сервера
  useEffect(() => {
    if (posts.length > 0) {
      console.log('ДАННЫЕ СПИСКА НОВОСТЕЙ С СЕРВЕРА:', posts);
    }
  }, [posts]);

  // --- ИЗМЕНЕНИЕ №1: Функция getCategoryBadge находится здесь ---
  // Она должна быть внутри компонента NewsList, чтобы быть доступной для модального окна.
  const getCategoryBadge = (type: number) => {
    const badges = ['badge-news', 'badge-achievements', 'badge-education', 'badge-events'];
    const categoryLabel = POST_TAGS[type] || 'Новости';
    const badgeClass = badges[type] || badges[0];
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badgeClass}`}>
        {categoryLabel}
      </span>
    );
  };
  
  const formatDate = (dateInSeconds: number) => {
    const date = new Date(dateInSeconds * 1000);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleReadMore = async (post: NewsPost) => {
    setLoadingDetail(true);
    setSelectedNews(post); // Сразу открываем модальное окно с базовыми данными
    try {
      const url = `${BASE_URL}/content/news/${post.slug}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch news detail');
      const detailData: NewsDetailPost = await response.json();
      setSelectedNews(detailData); // Обновляем данными с полным текстом
    } catch (err) {
      console.error('Error loading news detail:', err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const closeModal = () => setSelectedNews(null);

  if (error) {
    return (
      <section className="py-12 text-center">
        <p className="text-red-500">Ошибка загрузки новостей: {error}</p>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Новости и события</h2>
        <p className="text-muted-foreground text-lg">
          Следите за последними новостями нашего образовательного центра
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {posts.map((post) => (
          <NewsCard key={post.id} post={post} onReadMore={handleReadMore} />
        ))}
      </div>

      {loading && <div className="text-center"><p>Загрузка...</p></div>}

      {!loading && hasMore && posts.length > 0 && (
        <div className="text-center">
          <button onClick={loadMore} className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Показать еще
          </button>
        </div>
      )}

      {selectedNews && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="relative group">
              <img
                src={selectedNews.image_url || '/placeholder.png'}
                alt={selectedNews.title}
                className="w-full h-64 object-cover rounded-t-xl"
              />
              <button onClick={closeModal} className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full">
                <X className="w-5 h-5" />
              </button>
              <div className="absolute top-4 left-4">
                {getCategoryBadge(selectedNews.type)} {/* <-- Теперь вызов работает */}
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">{selectedNews.title}</h2>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                {/* --- ИЗМЕНЕНИЕ №2: Исправлено отображение даты --- */}
                <span>{formatDate(selectedNews.publish_date)}</span>
                <span>{selectedNews.author}</span>
              </div>
              {loadingDetail ? (
                <p>Загрузка...</p>
              ) : (
                // --- ИЗМЕНЕНИЕ №3: Исправлено отображение полного текста (HTML) ---
                <div 
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: selectedNews.content || selectedNews.body || '' }} 
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewsList;