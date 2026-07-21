import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Briefcase,
  Microscope,
  FolderKanban,
  Wrench,
  GraduationCap,
  Trophy,
  Mail,
  Menu,
  X,
} from 'lucide-react';
import ThemeToggle from './ThemeToggle.tsx';

const NAV_LINKS = [
  { name: 'About', href: '#about', icon: User },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Research', href: '#research', icon: Microscope },
  { name: 'Projects', href: '#projects', icon: FolderKanban },
  { name: 'Skills', href: '#skills', icon: Wrench },
  { name: 'Education', href: '#education', icon: GraduationCap },
  { name: 'Achievements', href: '#achievements', icon: Trophy },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Add background and shadow when scrolled down
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open; close on Escape
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    if (isMobileMenuOpen) {
      document.addEventListener('keydown', onKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md shadow-sm shadow-foreground/5 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand/Logo */}
        <motion.a
          href="#hero"
          aria-label="Go to top of page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg md:text-xl font-bold font-mono text-primary group flex items-center gap-1 select-none"
        >
          DK
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              aria-current={activeSection === link.href.substring(1) ? 'page' : undefined}
              className={`group relative pb-1 text-sm font-mono transition-colors hover:text-primary ${
                activeSection === link.href.substring(1)
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              <motion.span
                className="text-primary mr-2 opacity-80 inline-flex align-middle"
                whileHover={{ rotate: -8, scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 380, damping: 16 }}
                aria-hidden="true"
              >
                <link.icon size={14} strokeWidth={2} />
              </motion.span>
              {link.name}
              <motion.span
                className="pointer-events-none absolute left-0 -bottom-1 h-[2px] rounded-full"
                animate={
                  activeSection === link.href.substring(1)
                    ? { width: '100%', opacity: 1, backgroundColor: 'hsl(var(--primary))' }
                    : { width: '0%', opacity: 0.65, backgroundColor: 'hsl(var(--primary) / 0.6)' }
                }
                whileHover={{ width: '100%', opacity: 0.9 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                aria-hidden="true"
              />
            </motion.a>
          ))}
          <motion.a
            href="https://cvdesignr.com/p/688b37ce46bc7"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * NAV_LINKS.length }}
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 text-sm font-mono text-primary border border-primary rounded-md hover:bg-primary/10 transition-colors"
          >
            Resume
          </motion.a>
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation controls */}
        <div className="flex lg:hidden items-center gap-4">
          <ThemeToggle />
          <motion.button
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center bg-secondary text-foreground hover:bg-primary/10 hover:border-primary/50 transition-colors cursor-pointer"
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm lg:hidden"
            />

            {/* Sliding Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[320px] bg-background/95 backdrop-blur-md border-l border-border/50 shadow-2xl p-8 flex flex-col justify-between lg:hidden"
            >
              <div className="flex flex-col gap-8 mt-12">
                <div className="flex justify-between items-center mb-4">
                  <motion.button
                    onClick={toggleMobileMenu}
                    aria-label="Close menu"
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                    whileTap={{ scale: 0.9 }}
                  >
                    <X aria-hidden="true" size={16} />
                  </motion.button>
                </div>

                <nav aria-label="Mobile navigation" className="flex flex-col gap-5">
                  {NAV_LINKS.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                      onClick={toggleMobileMenu}
                      className={`flex items-center gap-3 text-lg font-mono py-2 border-b border-border/30 hover:text-primary transition-colors ${
                        activeSection === link.href.substring(1)
                          ? 'text-primary'
                          : 'text-foreground'
                      }`}
                    >
                      <link.icon size={18} className="text-primary" />
                      <span>{link.name}</span>
                    </motion.a>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-4 mt-auto">
                <motion.a
                  href="https://cvdesignr.com/p/688b37ce46bc7"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full text-center py-3 font-mono text-primary border border-primary rounded-md hover:bg-primary/10 transition-colors"
                >
                  Resume
                </motion.a>
                <div className="text-center font-mono text-xs text-muted-foreground mt-4">
                  © {new Date().getFullYear()} Djamel.K
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
