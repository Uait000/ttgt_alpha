import { useState } from 'react';
import { Eye, MessageCircle, Heart, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import news1 from '@/assets/news1.jpg';
import news2 from '@/assets/news2.jpg';
import news3 from '@/assets/news3.jpg';
import news4 from '@/assets/news4.jpg';
import news5 from '@/assets/news5.jpg';
import news6 from '@/assets/news6.jpg';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: 'education' | 'achievements' | 'news' | 'events';
  image: string | string[];
  views: number;
  comments: number;
  likes: number;
}

const NewsSection = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [visibleNews, setVisibleNews] = useState(6);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentNewsImageIndex, setCurrentNewsImageIndex] = useState<{[key: number]: number}>({});

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: 'Новая программа дистанционного обучения',
      excerpt: 'Запущена инновационная программа онлайн-образования с использованием современных технологий...',
      content: 'Запущена инновационная программа онлайн-образования с использованием современных технологий. Программа включает интерактивные занятия, виртуальные лаборатории и персонализированный подход к обучению.',
      date: '15 января 2025 г.',
      author: 'Администрация',
      category: 'education',
      image: [news1, news2, news3],
      views: 1245,
      comments: 18,
      likes: 89
    },
    {
      id: 2,
      title: 'Студенты завоевали первое место на региональной олимпиаде',
      excerpt: 'Команда наших студентов показала блестящие результаты на региональной олимпиаде...',
      content: 'Команда наших студентов показала блестящие результаты на региональной олимпиаде по информационным технологиям. Это важное достижение подтверждает высокий уровень подготовки в нашем образовательном центре.',
      date: '12 января 2025 г.',
      author: 'Пресс-служба',
      category: 'achievements',
      image: [news2, news4, news5],
      views: 892,
      comments: 25,
      likes: 156
    },
    {
      id: 3,
      title: 'Открытие нового современного корпуса',
      excerpt: 'Состоялось торжественное открытие нового учебного корпуса, оснащенного по последнему слову техники...',
      content: 'Состоялось торжественное открытие нового учебного корпуса, оснащенного по последнему слову техники. В здании размещены современные аудитории, лаборатории и центр цифровых технологий.',
      date: '10 января 2025 г.',
      author: 'Ректорат',
      category: 'news',
      image: [news3, news6, news1],
      views: 2156,
      comments: 42,
      likes: 234
    },
    {
      id: 4,
      title: 'Мастер-класс от ведущих специалистов',
      excerpt: 'В рамках профориентационной работы состоялся мастер-класс от ведущих специалистов отрасли...',
      content: 'В рамках профориентационной работы состоялся мастер-класс от ведущих специалистов отрасли. Студенты получили ценные знания и практические навыки от профессионалов.',
      date: '8 января 2025 г.',
      author: 'Учебная часть',
      category: 'education',
      image: [news4, news2, news3],
      views: 743,
      comments: 15,
      likes: 67
    },
    {
      id: 5,
      title: 'Научная конференция студентов',
      excerpt: 'Прошла ежегодная научная конференция студентов с участием молодых исследователей...',
      content: 'Прошла ежегодная научная конференция студентов с участием молодых исследователей. Были представлены интересные проекты и инновационные решения в различных областях знаний.',
      date: '5 января 2025 г.',
      author: 'Научная часть',
      category: 'events',
      image: [news5, news1, news4],
      views: 1089,
      comments: 33,
      likes: 145
    },
    {
      id: 6,
      title: 'Подписание договора о сотрудничестве',
      excerpt: 'Подписан важный договор о сотрудничестве с ведущими предприятиями региона...',
      content: 'Подписан важный договор о сотрудничестве с ведущими предприятиями региона. Это открывает новые возможности для практики и трудоустройства наших выпускников.',
      date: '3 января 2025 г.',
      author: 'Администрация',
      category: 'news',
      image: [news6, news3, news5],
      views: 1456,
      comments: 28,
      likes: 178
    },
    {
      id: 7,
      title: 'Международная студенческая конференция',
      excerpt: 'Состоялась международная конференция с участием студентов из разных стран...',
      content: 'Состоялась международная конференция с участием студентов из разных стран. Обсуждались актуальные вопросы развития транспортной отрасли.',
      date: '1 января 2025 г.',
      author: 'Международный отдел',
      category: 'events',
      image: [news1, news2, news3],
      views: 987,
      comments: 21,
      likes: 112
    },
    {
      id: 8,
      title: 'Модернизация лабораторий',
      excerpt: 'Завершена модернизация учебных лабораторий с установкой нового оборудования...',
      content: 'Завершена модернизация учебных лабораторий с установкой нового оборудования. Это позволит повысить качество практической подготовки студентов.',
      date: '28 декабря 2024 г.',
      author: 'Учебная часть',
      category: 'education',
      image: [news4, news5, news6],
      views: 654,
      comments: 12,
      likes: 78
    },
    {
      id: 9,
      title: 'Спортивные достижения студентов',
      excerpt: 'Команда техникума заняла первое место в региональных соревнованиях...',
      content: 'Команда техникума заняла первое место в региональных соревнованиях по легкой атлетике. Это результат систематической работы тренеров и упорства спортсменов.',
      date: '25 декабря 2024 г.',
      author: 'Спортивный отдел',
      category: 'achievements',
      image: [news2, news4, news1],
      views: 1123,
      comments: 35,
      likes: 189
    }
  ];

  const nextNewsImage = (newsId: number, imageCount: number) => {
    setCurrentNewsImageIndex(prev => ({
      ...prev,
      [newsId]: ((prev[newsId] || 0) + 1) % imageCount
    }));
  };

  const prevNewsImage = (newsId: number, imageCount: number) => {
    setCurrentNewsImageIndex(prev => ({
      ...prev,
      [newsId]: ((prev[newsId] || 0) - 1 + imageCount) % imageCount
    }));
  };

  const openImageModal = (news: NewsItem, imageIndex: number) => {
    setSelectedNews(news);
    setSelectedImageIndex(imageIndex);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImageIndex(0);
  };

  const nextModalImage = () => {
    if (selectedNews && Array.isArray(selectedNews.image)) {
      setSelectedImageIndex((prev) => (prev + 1) % selectedNews.image.length);
    }
  };

  const prevModalImage = () => {
    if (selectedNews && Array.isArray(selectedNews.image)) {
      setSelectedImageIndex((prev) => (prev - 1 + selectedNews.image.length) % selectedNews.image.length);
    }
  };

  const getCategoryBadge = (category: string) => {
    const badges = {
      education: 'badge-education',
      achievements: 'badge-achievements',
      news: 'badge-news',
      events: 'badge-events'
    };
    
    const labels = {
      education: 'Образование',
      achievements: 'Достижения',
      news: 'Новости',
      events: 'События'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badges[category as keyof typeof badges]}`}>
        {labels[category as keyof typeof labels]}
      </span>
    );
  };

  const openModal = (news: NewsItem) => {
    setSelectedNews(news);
  };

  const closeModal = () => {
    setSelectedNews(null);
  };

  const loadMore = () => {
    setVisibleNews(prev => prev + 3);
  };

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Новости и события</h2>
        <p className="text-muted-foreground text-lg">
          Следите за последними новостями нашего образовательного центра
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {newsItems.slice(0, visibleNews).map((news) => (
          <article key={news.id} className="news-card">
            <div className="relative group">
              {Array.isArray(news.image) ? (
                <div className="relative">
                  <img
                    src={news.image[currentNewsImageIndex[news.id] || 0]}
                    alt={news.title}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => openImageModal(news, currentNewsImageIndex[news.id] || 0)}
                  />
                  
                  {news.image.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevNewsImage(news.id, news.image.length);
                        }}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextNewsImage(news.id, news.image.length);
                        }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        {news.image.map((_, index) => (
                          <div
                            key={index}
                            className={`w-1.5 h-1.5 rounded-full ${
                              index === (currentNewsImageIndex[news.id] || 0)
                                ? 'bg-white'
                                : 'bg-white/60'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  
                  <div className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      openImageModal(news, currentNewsImageIndex[news.id] || 0);
                    }}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              ) : (
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => openImageModal(news, 0)}
              />
              )}
              <div className="absolute top-4 left-4">
                {getCategoryBadge(news.category)}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
                {news.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {news.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>{news.date}</span>
                <span>{news.author}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{news.views}</span>
                  </span>
                </div>
                
                <button
                  onClick={() => openModal(news)}
                  className="text-primary hover:text-primary-hover font-medium text-sm transition-colors"
                >
                  Читать →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {visibleNews < newsItems.length && (
        <div className="text-center">
          <button
            onClick={loadMore}
            className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl hover:scale-105 duration-300"
          >
            Загрузить ещё новости
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedNews && (
        <div className="modal-overlay" onClick={showImageModal ? closeImageModal : closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="relative group">
              {Array.isArray(selectedNews.image) ? (
                <div className="relative">
                  <img
                    src={selectedNews.image[showImageModal ? selectedImageIndex : (currentNewsImageIndex[selectedNews.id] || 0)]}
                    alt={selectedNews.title}
                    className="w-full h-64 object-cover rounded-t-xl cursor-pointer"
                    onClick={() => {
                      if (!showImageModal) {
                        openImageModal(selectedNews, currentNewsImageIndex[selectedNews.id] || 0);
                      }
                    }}
                  />
                  
                  {selectedNews.image.length > 1 && !showImageModal && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevNewsImage(selectedNews.id, selectedNews.image.length);
                        }}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextNewsImage(selectedNews.id, selectedNews.image.length);
                        }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        {selectedNews.image.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index === (currentNewsImageIndex[selectedNews.id] || 0)
                                ? 'bg-white'
                                : 'bg-white/60'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
              <img
                src={selectedNews.image}
                alt={selectedNews.title}
                className="w-full h-64 object-cover rounded-t-xl cursor-pointer"
                onClick={() => openImageModal(selectedNews, 0)}
              />
              )}
              <button
                onClick={showImageModal ? closeImageModal : closeModal}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute top-4 left-4">
                {getCategoryBadge(selectedNews.category)}
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {selectedNews.title}
              </h2>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                <span>{selectedNews.date}</span>
                <span>{selectedNews.author}</span>
              </div>
              
              <div className="text-foreground leading-relaxed">
                {selectedNews.content}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && selectedNews && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4" onClick={closeImageModal}>
          <div className="relative max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={Array.isArray(selectedNews.image) ? selectedNews.image[selectedImageIndex] : selectedNews.image}
              alt={selectedNews.title}
              className="w-full h-full object-contain rounded-lg"
            />
            
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            {Array.isArray(selectedNews.image) && selectedNews.image.length > 1 && (
              <>
                <button
                  onClick={prevModalImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <button
                  onClick={nextModalImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {selectedNews.image.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === selectedImageIndex
                          ? 'bg-white scale-125'
                          : 'bg-white/60 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default NewsSection;