import { useState } from 'react';
import { Eye, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { NewsPost, POST_TAGS } from '@/api/config';

interface NewsCardProps {
  post: NewsPost;
  onReadMore: (post: NewsPost) => void;
}

const NewsCard = ({ post, onReadMore }: NewsCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    // ↓↓↓ ИСПРАВЛЕНИЕ 1: Добавляем проверку, чтобы не рендерить карточку без обязательных данных ↓↓↓
    // Особенно важно проверить title и slug. Если slug нет, переход невозможен.
    if (!post || !post.title || !post.slug) {
        return null; 
    }
    // ↑↑↑ КОНЕЦ ИСПРАВЛЕНИЯ 1 ↑↑↑

  // Универсальная обработка: создаем массив картинок, даже если пришла только одна.
  const images = Array.isArray(post.image_urls) && post.image_urls.length > 0
    ? post.image_urls
    : post.image_url ? [post.image_url] : [];
  const hasMultipleImages = images.length > 1;

  // Создаем краткое описание из полного текста, убирая HTML-теги.
  const snippet = (post.body || '').replace(/<[^>]*>?/gm, '').substring(0, 100) + '...';

  // Функция для форматирования даты из Unix timestamp (секунд).
  const formatDate = (dateInSeconds: number) => {
    if (!dateInSeconds) return '';
    const date = new Date(dateInSeconds * 1000);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  };

  const openImageModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length > 0) {
      setIsImageModalOpen(true);
    }
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

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

    // ↓↓↓ ИСПРАВЛЕНИЕ 2: Проверка slug перед вызовом onReadMore ↓↓↓
    const handleReadMore = (e: React.MouseEvent) => {
        e.preventDefault();
        // Защита от вызова onReadMore, если slug по какой-то причине отсутствует
        if (post.slug) {
            onReadMore(post);
        } else {
            console.error('Ошибка: Попытка перехода по новости без slug.', post);
        }
    };
    // ↑↑↑ КОНЕЦ ИСПРАВЛЕНИЯ 2 ↑↑↑

  return (
    <>
      <article className="news-card">
        <div className="relative group" onClick={openImageModal}>
          <img
            src={images[currentImageIndex] || '/placeholder.png'}
            alt={post.title}
            className="w-full h-48 object-cover cursor-pointer"
          />

          {/* --- ИЗМЕНЕНИЕ: Восстановлен код карусели --- */}
          {hasMultipleImages && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          {/* --- КОНЕЦ ИЗМЕНЕНИЯ --- */}

          {images.length > 0 && (
            <div className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10">
              <ZoomIn className="w-4 h-4" />
            </div>
          )}
          <div className="absolute top-4 left-4 z-10">
            {getCategoryBadge(post.type)}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {snippet}
          </p>
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <span>{formatDate(post.publish_date)}</span>
            <span>{post.author}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{post.views}</span>
              </span>
            </div>
            <button
              onClick={handleReadMore} // ИСПОЛЬЗУЕМ НОВУЮ ФУНКЦИЮ
              className="text-primary hover:text-primary-hover font-medium text-sm transition-colors"
            >
              Читать →
            </button>
          </div>
        </div>
      </article>

      {isImageModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4" 
          onClick={closeImageModal}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[currentImageIndex]}
              alt={post.title}
              className="w-full h-full object-contain rounded-lg"
            />
            <button
              onClick={closeImageModal}
              className="absolute -top-2 -right-2 md:top-4 md:right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* --- ИЗМЕНЕНИЕ: Восстановлен код карусели для модального окна --- */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NewsCard;