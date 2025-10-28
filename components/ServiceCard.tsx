
import React from 'react';
import type { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  const Icon = service.icon;
  return (
    <button
      onClick={onClick}
      className="bg-slate-800 rounded-lg p-6 text-left hover:bg-slate-700/50 border border-slate-700 transition-all duration-300 transform hover:-translate-y-1 group"
    >
      <div className="flex items-center justify-center bg-slate-700 rounded-full w-12 h-12 mb-4 group-hover:bg-cyan-500/20 transition-colors">
        <Icon className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      </div>
      <h3 className="font-bold text-lg text-white mb-2">{service.title}</h3>
      <p className="text-slate-400 text-sm">{service.description}</p>
    </button>
  );
};
