import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-8 text-center mt-12 border-t border-border/50">
      <a 
        href="https://github.com/djamel" 
        target="_blank" 
        rel="noopener noreferrer"
        className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors inline-block"
      >
        <p>Designed & Built by Djamel Eddine Khelifaoui</p>
      </a>
    </footer>
  );
}
