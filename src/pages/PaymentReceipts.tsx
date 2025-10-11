import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';
import { ExternalLink } from 'lucide-react';

const PaymentReceipts = () => {
  const receipts = [
    'Квитанция на оплату за обучение',
    'Квитанция на оплату курсов',
    'Квитанция на оплату автошкола',
    'Квитанция за коммунальные услуги в общежитии',
    'Квитанция добровольные пожертвования',
    'Квитанция за услуги бассейна'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 min-h-screen">
          <div className="container mx-auto px-6 py-8">
            <div className="bg-white rounded-lg shadow-sm border border-border p-8">
              <h1 className="text-3xl font-bold text-primary mb-8 text-center">Квитанции об оплате</h1>
              
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-8 space-y-6">
                {/* Справка о реквизитах */}
                <div className="bg-white rounded-lg p-6 text-center">
                  <a
                    href="#"
                    className="inline-block bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📄</div>
                        <p className="text-muted-foreground">Справка о реквизитах банковского счета</p>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Квитанции */}
                <div className="bg-white rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-primary mb-6 text-center">Квитанции с реквизитами с 1 января 2021 года:</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {receipts.map((receipt, index) => (
                      <a
                        key={index}
                        href="#"
                        className="block p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-border hover:shadow-lg hover:scale-105 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">🧾</div>
                            <span className="text-foreground font-medium">{receipt}</span>
                          </div>
                          <ExternalLink className="w-5 h-5 text-primary" />
                        </div>
                      </a>
                    ))}
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

export default PaymentReceipts;