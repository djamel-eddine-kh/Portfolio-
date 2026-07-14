import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Briefcase,
  Microscope,
  FolderKanban,
  Wrench,
  GraduationCap,
  Trophy,
  Mail,
} from 'lucide-react';

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

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md shadow-sm shadow-black/10 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
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
              >
                <link.icon size={14} strokeWidth={2} aria-hidden="true" />
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
              />
            </motion.a>
          ))}
          <motion.a
            href="https://cvdesignr.com/p/688b37ce46bc7"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * NAV_LINKS.length }}
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 text-sm font-mono text-primary border border-primary rounded-md hover:bg-primary/10 transition-colors"
          >
            Resume
          </motion.a>
        </nav>
      </div>
    </motion.header>
  );
}
