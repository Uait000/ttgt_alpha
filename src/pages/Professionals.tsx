import { useState, useEffect } from 'react';
import { professionalsApi } from '@/api/professionals-api';
import type { Professional } from '@/api/config';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';
import InfoBlocks from '@/components/InfoBlocks';
import { Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORY_LABELS: Record<string, string> = {
  achievement: 'Достижение',
  award: 'Награда',
  recognition: 'Признание',
  success: 'Успех',
};

const CATEGORY_BADGES: Record<string, string> = {
  achievement: 'bg-blue-100 text-blue-800',
  award: 'bg-yellow-100 text-yellow-800',
  recognition: 'bg-green-100 text-green-800',
  success: 'bg-purple-100 text-purple-800',
};

const Professionals = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Professional | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    loadProfessionals();
  }, []);

  const loadProfessionals = async () => {
    try {
      setLoading(true);
      const data = await professionalsApi.getAll();
      setProfessionals(data);
    } catch (error) {
      console.error('Failed to load professionals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReadMore = (post: Professional) => {
    setSelectedPost(post);
    setCurrentImageIndex(0);
  };

  const handleClose = () => {
    setSelectedPost(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedPost && selectedPost.image_urls) {
      setCurrentImageIndex((prev) =>
        (prev + 1) % selectedPost.image_urls!.length
      );
    }
  };

  const prevImage = () => {
    if (selectedPost && selectedPost.image_urls) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedPost.image_urls!.length - 1 : prev - 1
      );
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }) + ' г.';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex relative">
        <Sidebar />

        <main className="flex-1 min-h-screen central-content-area">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold text-foreground mb-8">Наши профессионалы</h1>

            <InfoBlocks />

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Загрузка...</p>
              </div>
            ) : professionals.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Нет записей о профессионалах</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {professionals.map((post) => (
                  <article
                    key={post.id}
                    className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleReadMore(post)}
                  >
                    {post.image_urls && post.image_urls.length > 0 && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image_urls[0]}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${CATEGORY_BADGES[post.category] || CATEGORY_BADGES.achievement}`}>
                            {CATEGORY_LABELS[post.category] || post.category}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.body.replace(/<[^>]*>/g, '').substring(0, 150)}...
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
                        <button className="text-primary hover:text-primary-hover font-medium text-sm transition-colors">
                          Читать →
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </main>

        <aside className="fixed-right-panel">
          <div className="p-6">
            <SidebarCards />
          </div>
        </aside>
      </div>

      {selectedPost && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-background rounded-lg max-w-4xl w-full my-8 relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-accent rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {selectedPost.image_urls && selectedPost.image_urls.length > 0 && (
              <div className="relative h-96 rounded-t-lg overflow-hidden group">
                <img
                  src={selectedPost.image_urls[currentImageIndex]}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />

                {selectedPost.image_urls.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                      {selectedPost.image_urls.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="p-8">
              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${CATEGORY_BADGES[selectedPost.category] || CATEGORY_BADGES.achievement}`}>
                  {CATEGORY_LABELS[selectedPost.category] || selectedPost.category}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-foreground mb-4">
                {selectedPost.title}
              </h2>

              <div className="flex items-center justify-between text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
                <div className="flex items-center space-x-4">
                  <span>{formatDate(selectedPost.publish_date)}</span>
                  <span>•</span>
                  <span>{selectedPost.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{selectedPost.views}</span>
                </div>
              </div>

              <div
                className="prose prose-lg max-w-none text-foreground"
                dangerouslySetInnerHTML={{ __html: selectedPost.body }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Professionals;
