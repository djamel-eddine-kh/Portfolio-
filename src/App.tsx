import React, { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster.tsx';
import { TooltipProvider } from '@/components/ui/tooltip.tsx';
import { ThemeProvider } from './components/ThemeProvider.tsx';
import { Fallback } from './components/Background/Fallback.tsx';

import Navbar from './components/Navbar.tsx';
import Hero from './components/sections/Hero.tsx';
import About from './components/sections/About.tsx';
import Experience from './components/sections/Experience.tsx';
import Research from './components/sections/Research.tsx';
import Projects from './components/sections/Projects.tsx';
import Skills from './components/sections/Skills.tsx';
import Education from './components/sections/Education.tsx';
import Achievements from './components/sections/Achievements.tsx';
import Contact from './components/sections/Contact.tsx';
import Footer from './components/sections/Footer.tsx';

const BackgroundScene = lazy(() => import('./components/Background/BackgroundScene.tsx'));

const queryClient = new QueryClient();

function Portfolio() {
  return (
    <div className="min-h-screen w-full bg-background selection:bg-primary/30 selection:text-primary-foreground">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Suspense fallback={<Fallback />}>
        <BackgroundScene />
      </Suspense>
      <Navbar />
      <main id="main" className="relative z-10 flex flex-col items-center w-full px-6 md:px-12 lg:px-24">
        <Hero />
        <About />
        <Experience />
        <Research />
        <Projects />
        <Skills />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <Portfolio />
          <Toaster />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
