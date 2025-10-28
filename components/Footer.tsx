
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} Marine AI Resume Pro. All rights reserved.</p>
        <p className="text-xs mt-1">Built for Marine Engineers, by a Marine Engineer.</p>
      </div>
    </footer>
  );
};
