import { useState } from 'react';
// Добавлен Image as ImageIcon для заглушки
import { Eye, ChevronLeft, ChevronRight, X, ZoomIn, Image as ImageIcon } from 'lucide-react'; 
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
  const images = Array.isArray((post as any).images) && (post as any).images.length > 0
    ? (post as any).images.filter((url: string) => url)
    : post.image_url ? [post.image_url] : [];
    
  const hasMultipleImages = images.length > 1;
  const hasImage = images.length > 0 && images[currentImageIndex]; 

  // ИСПРАВЛЕНИЕ 1: Используем post.text для сниппета
  const postText = (post as any).text || post.body || '';
  const snippet = postText.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...';

  // Функция для форматирования даты из Unix timestamp (секунд).
  const formatDate = (dateInSeconds: number) => {
    if (!dateInSeconds) return 'Дата'; 
    const date = new Date(dateInSeconds * 1000);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // --- Функции для управления каруселью (для модального окна) ---
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

  // --- Функции для управления модальным окном (масштабирование) ---
  const handleReadMoreClick = () => {
    onReadMore(post); // Клик на изображении/кнопке открывает детальный просмотр
  };

  // Клик на изображении ведет к детальному просмотру
  const openImageModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleReadMoreClick(); 
  };
  
  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  // Бейдж категории (как на макете)
  const getCategoryBadge = (type: number) => {
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

  return (
    <>
      {/* Стиль карточки для макета (белый фон, закругленные углы) */}
      <article className="news-card bg-white rounded-xl shadow-lg h-full flex flex-col transition-shadow hover:shadow-xl w-full max-w-sm">
        <div className="relative group flex-shrink-0 cursor-pointer" onClick={openImageModal}>
          
          {hasImage ? (
              <img
                src={images[currentImageIndex]}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
          ) : (
                // Розовая заглушка, как на макете
              <div className="w-full h-48 bg-pink-400 flex items-center justify-center rounded-t-xl">
                  <ImageIcon className="w-12 h-12 text-white/50" />
              </div>
          )}

          {/* Бейдж категории - всегда сверху слева */}
          <div className="absolute top-4 left-4 z-10">
            {getCategoryBadge(post.type)}
          </div>

            {/* Иконки карусели - оставлены, но не отображаются, если нет картинок */}
          {hasMultipleImages && (
            <div className="absolute inset-0 flex items-center justify-between">
                <button onClick={prevImage} className="ml-2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full z-20">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextImage} className="mr-2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full z-20">
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
          )}
            
        </div>

        {/* Блок контента */}
        <div className="p-4 flex flex-col justify-between flex-grow">
          <div>
            {/* Заголовок, жирный */}
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 uppercase">
              {post.title || "ЗАГОЛОВОК"}
            </h3>
            
            {/* Сниппет, серый, как на макете */}
            <p className="text-gray-700 text-sm mb-4 line-clamp-4">
              {snippet || "Бла бла бла..."}
            </p>
          </div>
          
          {/* Нижний блок с метаданными и кнопкой */}
          <div>
            {/* Мета-данные: Дата и Автор */}
            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
              <span>{formatDate(post.publish_date) || "Дата"}</span>
              <span>{post.author || "Автор"}</span>
            </div>
            
            {/* Просмотры и кнопка "Читать" */}
            <div className="flex items-center justify-between border-t border-gray-200 pt-2">
              <div className="flex items-center space-x-1 text-sm text-blue-600">
                <Eye className="w-4 h-4" />
                <span>{post.views || 'кол-во просмотров'}</span>
              </div>
              
              <button
                onClick={handleReadMoreClick}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
              >
                Читать
              </button>
            </div>
          </div>
        </div>
      </article>
      {/* Модальное окно (остается в NewsList.tsx) */}
    </>
  );
};

export default NewsCard;