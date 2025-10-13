import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  useEffect(() => {
    if (posts.length > 0) {
      console.log('ДАННЫЕ СПИСКА НОВОСТЕЙ С СЕРВЕРА:', posts);
    }
  }, [posts]);

  const getCategoryBadge = (type: number) => {
    const badges = [
      'bg-blue-600/90 text-white',
      'bg-green-600/90 text-white',
      'bg-orange-600/90 text-white',
      'bg-red-600/90 text-white'
    ];
    const categoryLabel = POST_TAGS[type] || 'Новости';
    const badgeClass = badges[type] || badges[0];
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeClass}`}>
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
    setCurrentImageIndex(0);

    const identifier = post.slug || post.id;

    if (!identifier) {
      console.error('Ошибка: Пост не содержит ни slug, ни id для детального запроса.');
      setLoadingDetail(false);
      return;
    }

    try {
      const url = `${BASE_URL}/content/posts/${identifier}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch news detail');

      const detailData: NewsDetailPost = await response.json();

      const finalDetail: NewsDetailPost = {
        ...detailData,
        content: (detailData as any).text || detailData.content || detailData.body,
      };

      setSelectedNews(finalDetail);
    } catch (err) {
      console.error('Error loading news detail:', err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const closeModal = () => {
    setSelectedNews(null);
    setCurrentImageIndex(0);
    setIsImageZoomed(false);
  };

  const getModalImages = (): string[] => {
    if (!selectedNews) return [];
    const images: string[] = [];

    if (Array.isArray((selectedNews as any).images) && (selectedNews as any).images.length > 0) {
      (selectedNews as any).images.forEach((url: string) => {
        if (url) {
          const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
          images.push(fullUrl);
        }
      });
    } else if (selectedNews.image_url) {
      const fullUrl = selectedNews.image_url.startsWith('http')
        ? selectedNews.image_url
        : `${BASE_URL}${selectedNews.image_url}`;
      images.push(fullUrl);
    } else if (selectedNews.image_urls && selectedNews.image_urls.length > 0) {
      selectedNews.image_urls.forEach((url: string) => {
        if (url) {
          const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
          images.push(fullUrl);
        }
      });
    }

    return images;
  };

  const nextImage = () => {
    const images = getModalImages();
    if (images.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const prevImage = () => {
    const images = getModalImages();
    if (images.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  };

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

      {selectedNews && (
        <div
          className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-4xl max-h-[90vh] overflow-y-auto w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {getModalImages().length > 0 && (
              <div className="relative group">
                <img
                  src={getModalImages()[currentImageIndex]}
                  alt={selectedNews.title}
                  className={`w-full object-cover rounded-t-xl cursor-pointer transition-all ${
                    isImageZoomed ? 'h-auto max-h-[80vh]' : 'h-80'
                  }`}
                  onClick={() => setIsImageZoomed(!isImageZoomed)}
                />

                {getModalImages().length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all z-30"
                      aria-label="Предыдущее изображение"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all z-30"
                      aria-label="Следующее изображение"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                      {getModalImages().map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            index === currentImageIndex ? 'bg-white w-8' : 'bg-white/60 w-2'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(index);
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}

                <div className="absolute top-4 left-4 z-30">{getCategoryBadge(selectedNews.type)}</div>

                <button
                  onClick={() => setIsImageZoomed(!isImageZoomed)}
                  className="absolute top-4 right-16 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-30"
                  aria-label={isImageZoomed ? 'Уменьшить' : 'Увеличить'}
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
              </div>
            )}

            <div className="p-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedNews.title}</h2>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <span>{formatDate(selectedNews.publish_date)}</span>
                <span className="font-medium">{selectedNews.author}</span>
              </div>
              {loadingDetail ? (
                <p>Загрузка...</p>
              ) : (
                <div
                  className="prose max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: selectedNews.content || '' }}
                />
              )}
            </div>

            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-white hover:bg-gray-100 text-gray-700 p-2 rounded-full shadow-lg z-40"
              aria-label="Закрыть"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewsList;
