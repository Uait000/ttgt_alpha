import { useState } from 'react';
import { Eye, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { NewsPost, POST_TAGS } from '@/api/config';

interface NewsCardProps {
  post: NewsPost;
  onReadMore: (post: NewsPost) => void;
}

const NewsCard = ({ post, onReadMore }: NewsCardProps) => {
  // Состояние для отслеживания текущего индекса изображения в карусели
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Состояние для открытия модального окна с увеличенным изображением
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    // Убедимся, что пост имеет хотя бы ID и Title для рендеринга.
    if (!post || !post.title || !post.id) {
        return null; 
    }
    
  // Универсальная обработка: создаем массив картинок. 
  // Используем 'images' из тела поста, если оно есть, или пустой массив.
  const images = Array.isArray((post as any).images) && (post as any).images.length > 0
    ? (post as any).images.filter((url: string) => url) // Фильтруем пустые строки, если они есть
    : post.image_url ? [post.image_url] : [];
    
  const hasMultipleImages = images.length > 1;

  // Создаем сниппет, используя post.text (фактическое поле с сервера)
  const postText = (post as any).text || post.body || '';
  const snippet = postText.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...';

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

  // --- Функции для управления каруселью ---
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем открытие модального окна по клику на кнопку
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

  // --- Функции для управления модальным окном (масштабирование) ---
  const openImageModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length > 0) { // Открываем только если есть картинки
      setIsImageModalOpen(true);
    }
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const getCategoryBadge = (type: number) => {
    const badges = [
      'bg-purple-600/90 text-white', // badge-news
      'bg-green-600/90 text-white', // badge-achievements
      'bg-blue-600/90 text-white', // badge-education
      'bg-yellow-600/90 text-white' // badge-events
    ];
    const categoryLabel = POST_TAGS[type] || 'Новости';
    // Используем классы Tailwind CSS, которые, вероятно, соответствовали старым CSS-классам
    const badgeClass = badges[type] || badges[0]; 
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badgeClass}`}>
        {categoryLabel}
      </span>
    );
  };

  return (
    <>
      <article className="news-card border rounded-xl overflow-hidden shadow-lg h-full flex flex-col transition-shadow hover:shadow-xl">
        <div className="relative group flex-shrink-0" onClick={openImageModal}>
          {/* Основное изображение карточки */}
          <img
            src={images[currentImageIndex] || '/placeholder.png'} // Заглушка, если нет изображений
            alt={post.title}
            className="w-full h-48 object-cover cursor-pointer"
          />

          {/* Кнопки навигации карусели (появляются при наведении, если картинок > 1) */}
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
              {/* Индикаторы (точки) для карусели */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Иконка зума, появляется при наведении */}
          {images.length > 0 && (
            <div className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10">
              <ZoomIn className="w-4 h-4" />
            </div>
          )}

          {/* Бейдж категории */}
          <div className="absolute top-4 left-4 z-10">
            {getCategoryBadge(post.type)}
          </div>
        </div>

        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-muted-foreground mb-4 line-clamp-3">
              {snippet}
            </p>
          </div>
          
          {/* Мета-данные и кнопка "Читать" */}
          <div>
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <span>{formatDate(post.publish_date)}</span>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{post.views || 0}</span>
                </span>
              </div>
              <button
                onClick={() => onReadMore(post)}
                className="text-primary hover:text-primary-hover font-medium text-sm transition-colors"
              >
                Читать →
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Модальное окно для масштабирования изображения */}
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
            {/* Кнопка закрытия модального окна */}
            <button
              onClick={closeImageModal}
              className="absolute -top-2 -right-2 md:top-4 md:right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            {/* Навигация внутри модального окна */}
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