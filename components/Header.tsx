
import React, { useContext } from 'react';
import { AppContext } from '../App';
import { MarineIcon, BackIcon, LogoutIcon, StarIcon } from './Icons';

interface HeaderProps {
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBack }) => {
  const context = useContext(AppContext);

  return (
    <header className="bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-700">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {context?.currentUser && onBack && (
            <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-700 transition-colors">
              <BackIcon className="w-6 h-6" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <MarineIcon className="w-8 h-8 text-cyan-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">Marine AI Resume Pro</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {context?.currentUser && (
            <>
              <div className="text-sm px-3 py-1.5 rounded-full bg-slate-700 font-medium">
                {context.currentUser.isPro ? (
                  <div className="flex items-center gap-1.5 text-yellow-400">
                    <StarIcon className="w-4 h-4" />
                    <span>PRO PLAN</span>
                  </div>
                ) : (
                  <span>{context.generationsLeft} Generations Left</span>
                )}
              </div>
              <div className="hidden sm:block text-sm text-slate-400">{context.currentUser.email}</div>
              <button onClick={context.logout} className="p-2 rounded-full hover:bg-slate-700 transition-colors" title="Logout">
                <LogoutIcon className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
