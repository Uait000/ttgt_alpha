import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';

const BellSchedule = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 min-h-screen">
          <div className="container mx-auto px-6 py-8">
            <div className="bg-white rounded-lg shadow-sm border border-border p-8">
              <h1 className="text-3xl font-bold text-primary mb-8 text-center">Расписание звонков</h1>
              
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-8">
                <div className="flex flex-col gap-6">
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h2 className="text-xl font-semibold text-primary mb-4 text-center">Расписание звонков - Вариант 1</h2>
                    <div
                      className="aspect-[16/9] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border-2 border-border overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage('/schedule-1.jpg')}
                    >
                      <img
                        src="/schedule-1.jpg"
                        alt="Расписание звонков - Вариант 1"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h2 className="text-xl font-semibold text-primary mb-4 text-center">Расписание звонков - Вариант 2</h2>
                    <div
                      className="aspect-[16/9] bg-gradient-to-br from-secondary/10 to-accent/10 rounded-lg border-2 border-border overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage('/schedule-2.jpg')}
                    >
                      <img
                        src="/schedule-2.jpg"
                        alt="Расписание звонков - Вариант 2"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <aside className="w-80 bg-white border-l border-border p-6 sticky top-16 h-screen overflow-y-auto">
          <SidebarCards />
        </aside>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-7xl max-h-[90vh] p-0">
          <DialogTitle className="sr-only">Расписание звонков</DialogTitle>
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Расписание звонков"
                className="w-full h-auto max-h-[85vh] object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BellSchedule;