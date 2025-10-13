import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useFetchNews } from '@/hooks/useFetchNews';
import NewsCard from './NewsCard';
import { NewsPost, POST_TAGS, BASE_URL } from '@/api/config';

interface NewsDetailPost extends NewsPost {
  content?: string;
}

const NewsList = () => {
  const { posts, loading, hasMore, loadMore, error, offset } = useFetchNews(); 
  const [selectedNews, setSelectedNews] = useState<NewsDetailPost | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    if (posts.length > 0) {
      console.log('ДАННЫЕ СПИСКА НОВОСТЕЙ С СЕРВЕРА:', posts);
    }
  }, [posts]);

  const getCategoryBadge = (type: number) => {
    // Используем классы из NewsCard для визуальной идентичности
    const badges = [
      'bg-purple-600/90 text-white', 
      'bg-green-600/90 text-white',  
      'bg-blue-600/90 text-white',   
      'bg-yellow-600/90 text-white'  
    ];
    const categoryLabel = POST_TAGS[type] || 'Новости';
    const badgeClass = badges[type] || badges[0];
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badgeClass}`}>
        {categoryLabel}
      </span>
    );
  };
  
  const formatDate = (dateInSeconds: number) => {
    if (!dateInSeconds) return ''; 
    const date = new Date(dateInSeconds * 1000);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleReadMore = async (post: NewsPost) => {
    setLoadingDetail(true);
    setSelectedNews(post);
    
    // Определяем, что использовать для запроса деталей (ID, если нет SLUG)
    const identifier = post.slug || post.id;
    
    if (!identifier) {
        console.error('Ошибка: Пост не содержит ни slug, ни id для детального запроса.');
        setLoadingDetail(false);
        return;
    }
    
    try {
        // ↓↓↓ ИСПРАВЛЕНИЕ 1: Используем ID или SLUG для запроса деталей ↓↓↓
      const url = `${BASE_URL}/content/posts/${identifier}`;
        // ↑↑↑ КОНЕЦ ИСПРАВЛЕНИЯ 1 ↑↑↑

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch news detail');
      
      const detailData: NewsDetailPost = await response.json();
      
      // ↓↓↓ ИСПРАВЛЕНИЕ 2: Приводим фактическое поле "text" к полю "content" для модального окна ↓↓↓
      const finalDetail: NewsDetailPost = {
          ...detailData,
          content: (detailData as any).text || detailData.content || detailData.body,
      };
      // ↑↑↑ КОНЕЦ ИСПРАВЛЕНИЯ 2 ↑↑↑
      
      setSelectedNews(finalDetail);
      
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
          <button 
            onClick={() => loadMore(9, offset)} 
            className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Показать еще
          </button>
        </div>
      )}

      {/* ↓↓↓ ИСПРАВЛЕНИЕ 3: Рендеринг детального модального окна ↓↓↓ */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl max-h-[90vh] overflow-y-auto w-full relative" onClick={(e) => e.stopPropagation()}>
            
            {/* Блок изображения (может быть каруселью, если это нужно) */}
            <div className="relative">
              <img
                src={(selectedNews as any).images?.[0] || selectedNews.image_url || '/placeholder.png'}
                alt={selectedNews.title}
                className="w-full h-64 object-cover rounded-t-xl"
              />
                {/* Бейдж категории */}
              <div className="absolute top-4 left-4">
                {getCategoryBadge(selectedNews.type)}
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedNews.title}</h2>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <span>{formatDate(selectedNews.publish_date)}</span>
                <span>{selectedNews.author}</span>
              </div>
              {loadingDetail ? (
                <p>Загрузка...</p>
              ) : (
                <div 
                  className="prose max-w-none"
                  // Используем поле content (которое мы заполнили из 'text' или 'body')
                  dangerouslySetInnerHTML={{ __html: selectedNews.content || '' }} 
                />
              )}
            </div>

            <button onClick={closeModal} className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
      {/* ↑↑↑ КОНЕЦ ИСПРАВЛЕНИЯ 3 ↑↑↑ */}
    </section>
  );
};

export default NewsList;