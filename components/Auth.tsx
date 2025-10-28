import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { MarineIcon } from './Icons';

export const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(AppContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && context) {
      setIsLoading(true);
      try {
        await context.login(email.trim());
      } catch (error) {
        console.error("Login failed", error);
        // In a real app, show an error message to the user
        setIsLoading(false);
      }
      // On success, the component will unmount, so no need to reset isLoading
    }
  };

  return (
    <div className="flex items-center justify-center h-full animate-fade-in">
      <div className="w-full max-w-sm">
        <div className="bg-slate-800/50 p-8 rounded-lg border border-slate-700 shadow-lg">
          <div className="text-center mb-8">
            <MarineIcon className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-white">Welcome Aboard</h2>
            <p className="text-slate-400 mt-1">Sign in to start optimizing your career.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="e.g., chief.engineer@sea.com"
                required
                className="w-full bg-slate-900 border border-slate-600 rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
              disabled={!email.trim() || isLoading}
            >
              {isLoading ? 'Signing In...' : 'Login / Sign Up'}
            </button>
          </form>
          <p className="text-xs text-slate-500 text-center mt-6">
            Enter any email to sign in or create an account. No password required for this demo.
          </p>
        </div>
      </div>
    </div>
  );
};
