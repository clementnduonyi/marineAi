import React, { useState, useContext } from 'react';
import type { Service } from '../types';
import { generateContent } from '../services/geminiService';
import { AppContext } from '../App';
import { OutputDisplay } from './OutputDisplay';

interface ServiceViewProps {
  service: Service;
  onGenerationDone: () => void;
}

export const ServiceView: React.FC<ServiceViewProps> = ({ service, onGenerationDone }) => {
  const [inputValues, setInputValues] = useState<Record<string, string>>(
    service.inputs.reduce((acc, input) => ({ ...acc, [input.id]: '' }), {})
  );
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const context = useContext(AppContext);

  const handleInputChange = (id: string, value: string) => {
    setInputValues(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    if (context && !context.currentUser?.isPro && context.generationsLeft <= 0) {
      // Modal will be shown by App component
      return;
    }

    setIsLoading(true);
    setOutput('');
    setError('');

    let prompt = service.promptTemplate;
    for (const key in inputValues) {
      prompt = prompt.replace(`{${key}}`, inputValues[key]);
    }

    try {
      const result = await generateContent(prompt);
      setOutput(result);
      onGenerationDone();
    } catch (err) {
      setError('Failed to generate content. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormIncomplete = service.inputs.some(input => !input.optional && !inputValues[input.id].trim());
  const Icon = service.icon;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 bg-slate-800 rounded-lg w-16 h-16 flex items-center justify-center border border-slate-700">
          <Icon className="w-8 h-8 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">{service.title}</h2>
          <p className="text-slate-400 mt-1">{service.description}</p>
        </div>
      </div>

      <div className="space-y-6 bg-slate-800/50 p-6 rounded-lg border border-slate-700">
        {service.inputs.map(input => (
          <div key={input.id}>
            <label htmlFor={input.id} className="block text-sm font-medium text-slate-300 mb-2">
              {input.label}
            </label>
            {input.type === 'textarea' ? (
              <textarea
                id={input.id}
                rows={input.rows || 6}
                value={inputValues[input.id]}
                onChange={e => handleInputChange(input.id, e.target.value)}
                placeholder={input.placeholder}
                className="w-full bg-slate-900 border border-slate-600 rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
              />
            ) : (
              <input
                type="text"
                id={input.id}
                value={inputValues[input.id]}
                onChange={e => handleInputChange(input.id, e.target.value)}
                placeholder={input.placeholder}
                className="w-full bg-slate-900 border border-slate-600 rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
              />
            )}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={isLoading || isFormIncomplete}
          className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Generating...' : 'Generate with AI'}
        </button>
      </div>

      {error && <div className="mt-6 text-center text-red-400">{error}</div>}

      <OutputDisplay isLoading={isLoading} output={output} serviceTitle={service.title} />
    </div>
  );
};