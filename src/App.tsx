import { lazy, Suspense, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import MobilePortfolio from "./components/MobilePortfolio.tsx";

const Research    = lazy(() => import('./pages/sections/Research'));
const Performance = lazy(() => import('./pages/sections/Performance'));
const Experience  = lazy(() => import('./pages/sections/Experience'));
const About       = lazy(() => import('./pages/sections/About'));
const Privacy     = lazy(() => import('./pages/Privacy'));

const queryClient = new QueryClient();

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return mobile;
}

/* Fixed overlay — city stays mounted behind, WebGL context never destroyed */
function SectionOverlay({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: '#050512', overflowY: 'auto' }}>
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
}

function DesktopRoutes() {
  const location = useLocation();
  const isCity = location.pathname === '/';

  useEffect(() => {
    document.body.style.overflow = isCity ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isCity]);

  return (
    <>
      <Index />
      <Routes>
        <Route path="/"            element={null} />
        <Route path="/research"    element={<SectionOverlay><Research /></SectionOverlay>} />
        <Route path="/performance" element={<SectionOverlay><Performance /></SectionOverlay>} />
        <Route path="/experience"  element={<SectionOverlay><Experience /></SectionOverlay>} />
        <Route path="/about"       element={<SectionOverlay><About /></SectionOverlay>} />
        <Route path="/privacy"     element={<SectionOverlay><Privacy /></SectionOverlay>} />
        <Route path="*"            element={<SectionOverlay><NotFound /></SectionOverlay>} />
      </Routes>
    </>
  );
}

const App = () => {
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {isMobile ? (
          <MobilePortfolio />
        ) : (
          <BrowserRouter>
            <DesktopRoutes />
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
