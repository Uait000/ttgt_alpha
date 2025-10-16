import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { BASE_URL, NewsPost, POST_TAGS } from '@/api/config';

const NewsModal = ({ post, onClose, isLoading }: { post: NewsPost; onClose: () => void; isLoading: boolean }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  const getModalImages = (): string[] => {
    const images: string[] = [];
    const baseUrl = BASE_URL || '';

    if (Array.isArray(post.images) && post.images.length > 0) {
      post.images.forEach((imageId: string) => {
        if (imageId) {
          images.push(`${baseUrl}/files/${imageId}`);
        }
      });
    } else if (post.image_urls && post.image_urls.length > 0) {
      post.image_urls.forEach((url: string) => {
        if (url) {
          images.push(url.startsWith('http') ? url : `${baseUrl}${url}`);
        }
      });
    }
    return images;
  };

  const modalImages = getModalImages();

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % modalImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length);
  };
  
  const formatDate = (dateInSeconds: number) => {
    if (!dateInSeconds) return '';
    const date = new Date(dateInSeconds * 1000);
    return date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  const getCategoryBadge = (type: number) => {
    const badges = ['bg-blue-600/90 text-white', 'bg-green-600/90 text-white', 'bg-orange-600/90 text-white', 'bg-red-600/90 text-white'];
    const categoryLabel = POST_TAGS[type] || 'Новости';
    const badgeClass = badges[type] || badges[0];
    return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeClass}`}>{categoryLabel}</span>;
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl max-h-[90vh] overflow-y-auto w-full relative" onClick={(e) => e.stopPropagation()}>
          <div className="p-6 pb-4">
            <div className="flex items-start justify-between gap-4 mb-6 pr-12">
              <h2 className="text-3xl font-bold text-gray-900 flex-1">{post.title}</h2>
              {getCategoryBadge(post.type)}
            </div>
            
            {isLoading ? <p className="text-center py-8">Загрузка...</p> : (
              <>
                {modalImages.length > 0 && (
                  <div className="relative mb-6 w-full h-80 rounded-lg overflow-hidden group bg-gray-100 flex items-center justify-center"> {/* Добавлен flex и justify-center для центрирования при object-contain */}
                    {/* ✅ ИЗМЕНЕНИЕ: object-cover заменён на object-contain */}
                    <img
                      src={modalImages[currentImageIndex]}
                      alt={`${post.title} - ${currentImageIndex + 1}`}
                      className="max-w-full max-h-full object-contain transition-transform duration-300"
                    />
                    
                    {/* Оверлей для зума */}
                    <div 
                      className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-colors cursor-pointer"
                      onClick={() => setIsImageZoomed(true)}
                    >
                      <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Кнопки навигации для карусели */}
                    {modalImages.length > 1 && (
                      <>
                        <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white transition-opacity opacity-0 group-hover:opacity-100">
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white transition-opacity opacity-0 group-hover:opacity-100">
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}
                  </div>
                )}
                
                <div className="max-w-none text-gray-700 whitespace-pre-wrap">
                  {post.text || post.body || ''}
                </div>

                <div className="border-t border-gray-200 pt-4 mt-6 flex items-center justify-between text-sm text-gray-600">
                  <span className="font-semibold">Опубликовано: {formatDate(post.publish_date)}</span>
                  {post.author && <span className="font-semibold">Автор: {post.author}</span>}
                </div>
              </>
            )}
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/80 hover:bg-gray-100 p-2 rounded-full shadow-lg z-10"><X className="w-6 h-6" /></button>
        </div>
      </div>

      {isImageZoomed && (
        <div className="fixed inset-0 bg-black/90 z-[70] flex items-center justify-center p-4" onClick={() => setIsImageZoomed(false)}>
          <img src={modalImages[currentImageIndex]} alt={post.title} className="max-w-full max-h-full object-contain" onClick={(e) => e.stopPropagation()} />
          {modalImages.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-4 rounded-full"><ChevronLeft className="w-8 h-8 text-white" /></button>
              <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-4 rounded-full"><ChevronRight className="w-8 h-8 text-white" /></button>
            </>
          )}
          <button onClick={() => setIsImageZoomed(false)} className="absolute top-4 right-4 bg-white/20 p-3 rounded-full"><X className="w-7 h-7 text-white" /></button>
        </div>
      )}
    </>
  );
};

export default NewsModal;