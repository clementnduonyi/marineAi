
import React from 'react';

export const AdBanner: React.FC = () => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center mb-8">
      <p className="text-sm text-slate-400">
        <span className="font-bold text-slate-300">ADVERTISEMENT:</span> Support this tool by upgrading to Pro for an ad-free experience.
      </p>
    </div>
  );
};
