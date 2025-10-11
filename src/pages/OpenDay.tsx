import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';

const OpenDay = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 min-h-screen">
          <div className="container mx-auto px-6 py-8">
            <div className="bg-white rounded-lg shadow-sm border border-border p-8">
              <h1 className="text-3xl font-bold text-primary mb-8 text-center">День открытых дверей</h1>
              
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-8">
                <div className="bg-white rounded-lg p-8 shadow-sm">
                  <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
                    Графики проведения "Дней открытых дверей" 2024/2025 учебный год
                  </h2>
                  
                  <div className="space-y-8">
                    {/* Дистанционный формат */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">В дистанционном формате для удалённых территорий</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border border-primary/20 rounded-lg">
                          <thead className="bg-primary/10">
                            <tr>
                              <th className="border border-primary/20 p-4 text-left font-semibold text-primary">№ п/п</th>
                              <th className="border border-primary/20 p-4 text-left font-semibold text-primary">Дата проведения</th>
                              <th className="border border-primary/20 p-4 text-left font-semibold text-primary">Время</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="hover:bg-primary/5">
                              <td className="border border-primary/20 p-4">1</td>
                              <td className="border border-primary/20 p-4">31 октября 2024 года</td>
                              <td className="border border-primary/20 p-4">13.00</td>
                            </tr>
                            <tr className="hover:bg-primary/5">
                              <td className="border border-primary/20 p-4">2</td>
                              <td className="border border-primary/20 p-4">12 декабря 2024 года</td>
                              <td className="border border-primary/20 p-4">13.00</td>
                            </tr>
                            <tr className="hover:bg-primary/5">
                              <td className="border border-primary/20 p-4">3</td>
                              <td className="border border-primary/20 p-4">20 февраля 2025 года</td>
                              <td className="border border-primary/20 p-4">13.00</td>
                            </tr>
                            <tr className="hover:bg-primary/5">
                              <td className="border border-primary/20 p-4">4</td>
                              <td className="border border-primary/20 p-4">03 апреля 2025 года</td>
                              <td className="border border-primary/20 p-4">13.00</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Очный формат */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">В очном формате при стабильной санитарно-эпидемиологической обстановки в условиях распространения инфекционных заболеваний</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border border-primary/20 rounded-lg">
                          <thead className="bg-primary/10">
                            <tr>
                              <th className="border border-primary/20 p-4 text-left font-semibold text-primary">№ п/п</th>
                              <th className="border border-primary/20 p-4 text-left font-semibold text-primary">Дата проведения</th>
                              <th className="border border-primary/20 p-4 text-left font-semibold text-primary">Время</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="hover:bg-primary/5">
                              <td className="border border-primary/20 p-4">1</td>
                              <td className="border border-primary/20 p-4">30 ноября 2024 года</td>
                              <td className="border border-primary/20 p-4">10.00</td>
                            </tr>
                            <tr className="hover:bg-primary/5">
                              <td className="border border-primary/20 p-4">2</td>
                              <td className="border border-primary/20 p-4">01 марта 2025 года</td>
                              <td className="border border-primary/20 p-4">10.00</td>
                            </tr>
                            <tr className="hover:bg-primary/5">
                              <td className="border border-primary/20 p-4">3</td>
                              <td className="border border-primary/20 p-4">26 апреля 2025 года</td>
                              <td className="border border-primary/20 p-4">10.00</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Программа мероприятий */}
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
                      <p className="text-foreground mb-4">
                        <strong>Приглашаем</strong> – всех тех, кто решает задачу выбора будущей профессии, а также их родителей.
                      </p>
                      <div className="space-y-2 text-foreground">
                        <p><strong>В программе:</strong></p>
                        <p>• Встреча с руководством техникума, заведующими отделениями и преподавателями;</p>
                        <p>• Знакомство с работой отделений и учебных лабораторий;</p>
                        <p>• Знакомство с техникумом.</p>
                        <p className="mt-4 font-semibold">Приходите и мы поможем Вам сделать правильный выбор!!!</p>
                      </div>
                      
                      <div className="mt-6 space-y-2 text-foreground">
                        <p><strong>Адрес техникума:</strong> Тихорецк, ул.Красноармейская 57.</p>
                        <p><strong>За справками обращаться в приемную комиссию:</strong></p>
                        <p>кабинет 101А, телефон для справок 8(86196) 6-20-03 доб.110</p>
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

export default OpenDay;