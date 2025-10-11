import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import InfoBlocks from '@/components/InfoBlocks';
import NewsList from '@/components/NewsList';
import SidebarCards from '@/components/SidebarCards';
import Carousel from '@/components/Carousel';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header - fixed at top */}
      <Header />

      {/* Main layout container */}
      <div className="flex relative">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content - scrollable central area */}
        <main className="flex-1 min-h-screen central-content-area">
          <div className="container mx-auto px-6 py-8">
            {/* Info Blocks */}
            <InfoBlocks />

            {/* News Section */}
            <NewsList />
          </div>

          {/* Carousel at bottom */}
          <Carousel />
        </main>

        {/* Right Panel - FIXED: stays in place during scroll */}
        <aside className="fixed-right-panel">
          <div className="p-6">
            <SidebarCards />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Index;