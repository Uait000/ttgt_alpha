import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ExternalLink } from 'lucide-react';

const Schedule = () => {
  const scheduleData = [
    { course: '1 курс', groups: ['А-1-1', 'В-1-1', 'Д-1-1', 'Д-1-2', 'КС-1-1', 'КС-1-2', 'КС-1-3', 'Л-1-1', 'Л-1-2', 'Л-1-3', 'Л-1-4', 'Л-1-5', 'П-1-1', 'ПМ-1-1', 'Р-1-1', 'С-1-1', 'СП-1-1', 'ЭС-1-1'] },
    { course: '2 курс', groups: ['А-2-1', 'В-2-1', 'Д-2-1', 'Д-2-2', 'Д-2-3', 'КС-2-1', 'КС-2-2', 'КС-2-3', 'Л-2-1', 'Л-2-2', 'Л-2-3', 'Л-2-4', 'Л-2-5', 'П-2-1', 'ПМ-2-1', 'Р-2-1', 'С-2-1', 'СП-2-1', 'Э-2-1', 'ЭС-2-1'] },
    { course: '3 курс', groups: ['А-3-1', 'В-3-1', 'Д-3-1', 'Д-3-2', 'Д-3-3', 'КС-3-1', 'КС-3-2', 'Л-3-1', 'Л-3-2', 'Л-3-3', 'Л-3-4', 'Л-3-5', 'Л-3-6', 'П-3-1', 'ПМ-3-1', 'ПМ-3-2', 'Р-3-1', 'С-3-1', 'СП-3-1', 'ЭС-3-1'] },
    { course: '4 курс', groups: ['А-4-1', 'В-4-1', 'КС-4-1', 'КС-4-2', 'Л-4-1', 'Л-4-2', 'Л-4-3', 'Л-4-4', 'Л-4-5', 'ПМ-4-1', 'Р-4-1', 'С-4-1', 'СП-4-1', 'ЭС-4-1'] }
  ];

  const getSchedulePdfUrl = (groupName: string) => {
    return `/schedules/${groupName}.pdf`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 min-h-screen">
          <div className="container mx-auto px-6 py-8">
            <div className="bg-white rounded-lg shadow-sm border border-border p-8">
              <h1 className="text-3xl font-bold text-primary mb-8 text-center">Расписание занятий</h1>
              
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-8 space-y-8">
                {/* Очное отделение */}
                <div className="bg-white rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-primary mb-6 text-center">Очное отделение</h2>
                  
                  <div className="mb-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-3">
                        <p className="font-medium text-foreground">1 курс - 1-1</p>
                      </div>
                      <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg p-3">
                        <p className="font-medium text-foreground">2 курс - 2-1</p>
                      </div>
                      <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg p-3">
                        <p className="font-medium text-foreground">3 курс - 3-1</p>
                      </div>
                      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-3">
                        <p className="font-medium text-foreground">4 курс 4-1</p>
                      </div>
                    </div>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center font-bold">1 курс</TableHead>
                        <TableHead className="text-center font-bold">2 курс</TableHead>
                        <TableHead className="text-center font-bold">3 курс</TableHead>
                        <TableHead className="text-center font-bold">4 курс</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from({ length: Math.max(...scheduleData.map(course => course.groups.length)) }).map((_, rowIndex) => (
                        <TableRow key={rowIndex}>
                          {scheduleData.map((course, courseIndex) => (
                            <TableCell key={courseIndex} className="text-center">
                              {course.groups[rowIndex] && (
                                <a
                                  href={getSchedulePdfUrl(course.groups[rowIndex])}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-block bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 text-primary hover:text-primary-hover font-medium px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                                >
                                  {course.groups[rowIndex]}
                                </a>
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Заочное отделение */}
                <div className="bg-white rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-primary mb-6 text-center">Заочное отделение</h2>
                  
                  <div className="space-y-4">
                    <a
                      href="#"
                      className="block p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-border hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-foreground font-medium">Календарный учебный график заочного отделения на 2025 - 2026 учебный год</span>
                        <ExternalLink className="w-5 h-5 text-primary" />
                      </div>
                    </a>

                    <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg p-6">
                      <h3 className="font-semibold text-primary mb-4">Расписание сессий для студентов заочной формы обучения ТТЖТ:</h3>
                      <p className="text-foreground mb-3 font-medium">c 15 сентября 2025 г. по 27 сентября 2025 г.:</p>
                      <div className="flex flex-wrap gap-3">
                        <a href="#" className="bg-white border border-border rounded-lg px-4 py-2 text-primary hover:text-primary-hover hover:shadow-md transition-all duration-300">
                          Д-4-1(з)
                        </a>
                        <a href="#" className="bg-white border border-border rounded-lg px-4 py-2 text-primary hover:text-primary-hover hover:shadow-md transition-all duration-300">
                          Л-4-1(з)
                        </a>
                        <a href="#" className="bg-white border border-border rounded-lg px-4 py-2 text-primary hover:text-primary-hover hover:shadow-md transition-all duration-300">
                          П-4-1(з)
                        </a>
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

export default Schedule;