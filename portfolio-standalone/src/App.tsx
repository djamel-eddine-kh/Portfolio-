import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from './components/ThemeProvider';

import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Research from './components/sections/Research';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Education from './components/sections/Education';
import Achievements from './components/sections/Achievements';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

const queryClient = new QueryClient();

function Portfolio() {
  return (
    <div className="min-h-screen w-full bg-background selection:bg-primary/30 selection:text-primary-foreground">
      <Navbar />
      <main className="flex flex-col items-center w-full px-6 md:px-12 lg:px-24">
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
