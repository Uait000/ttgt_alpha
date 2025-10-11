import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';

const ExamSchedule = () => {
  const getExamScheduleUrl = (groupName: string) => {
    return `/exam-schedules/${groupName}.pdf`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 min-h-screen">
          <div className="container mx-auto px-6 py-8">
            <div className="bg-white rounded-lg shadow-sm border border-border p-8">
              <h1 className="text-3xl font-bold text-primary mb-8 text-center">Расписание экзаменов</h1>
              
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-8 space-y-6">
                <div className="bg-white rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-primary mb-6 text-center">Расписание экзаменов</h2>
                  
                  <div className="space-y-6">
                    {/* 1 курс */}
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
                      <h3 className="font-semibold text-primary mb-3">c 15 июня по 28 июня 2025 года</h3>
                      <p className="text-foreground font-medium mb-2">1 курс</p>
                    </div>

                    {/* 2 курс - первая группа */}
                    <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg p-6">
                      <h3 className="font-semibold text-primary mb-3">с 15 июня по 28 июня 2025 года</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Д-2-1', 'Д-2-2', 'Д-2-3', 'КС-2-1', 'КС-2-2', 'П-2-1'].map((group) => (
                          <a
                            key={group}
                            href={getExamScheduleUrl(group)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white border border-border rounded-lg px-3 py-1 text-primary hover:text-primary-hover hover:shadow-md transition-all duration-300 text-sm font-medium cursor-pointer"
                          >
                            {group}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* 2 курс - вторая группа */}
                    <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg p-6">
                      <h3 className="font-semibold text-primary mb-3">с 22 июня по 28 июня 2025 года</h3>
                      <div className="flex flex-wrap gap-2">
                        {['А-2-1', 'ПМ-2-1, ПМ-2-2', 'Р-2-1', 'С-2-1', 'СП-2-1', 'ЭС-2-1'].map((group) => (
                          <a
                            key={group}
                            href={getExamScheduleUrl(group)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white border border-border rounded-lg px-3 py-1 text-primary hover:text-primary-hover hover:shadow-md transition-all duration-300 text-sm font-medium cursor-pointer"
                          >
                            {group}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* 3 курс */}
                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
                      <h3 className="font-semibold text-primary mb-3">с 29 июня по 05 июля 2025 года</h3>
                      <div className="flex flex-wrap gap-2">
                        {['В-2-1, Л-2-1, Л-2-2, Л-2-3, Л-2-4, Л-2-5, Л-2-6', 'А-3-1', 'Д-3-1', 'Д-3-2', 'КС-3-1, КС-3-2', 'П-3-1', 'ПМ-3-1', 'Р-3-1', 'СП-3-1', 'ЭС-3-1'].map((group) => (
                          <a
                            key={group}
                            href={getExamScheduleUrl(group)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white border border-border rounded-lg px-3 py-1 text-primary hover:text-primary-hover hover:shadow-md transition-all duration-300 text-sm font-medium cursor-pointer"
                          >
                            {group}
                          </a>
                        ))}
                      </div>
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
    </div>
  );
};

export default ExamSchedule;