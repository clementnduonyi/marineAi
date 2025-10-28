
import React from 'react';
import { SERVICES } from '../constants';
import type { ServiceID } from '../types';
import { ServiceCard } from './ServiceCard';

interface ServiceSelectionProps {
  onSelectService: (serviceId: ServiceID) => void;
}

export const ServiceSelection: React.FC<ServiceSelectionProps> = ({ onSelectService }) => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">Your Maritime Career Co-Pilot</h2>
        <p className="mt-2 text-lg text-slate-400 max-w-2xl mx-auto">Select a tool below to enhance your resume, prepare for interviews, and navigate your career path.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map(service => (
          <ServiceCard key={service.id} service={service} onClick={() => onSelectService(service.id)} />
        ))}
      </div>
    </div>
  );
};
