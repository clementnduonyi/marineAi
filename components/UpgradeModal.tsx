import React, { useContext, useState } from 'react';
import { StarIcon } from './Icons';
import { AppContext } from '../App';
import { PRO_PLAN_PRICE_KOBO, PRO_PLAN_CURRENCY } from '../constants';

// Add Paystack types to the global window object for TypeScript
declare global {
  interface Window {
    PaystackPop: any;
  }
}

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgradeSuccess: () => Promise<void>;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, onUpgradeSuccess }) => {
  const context = useContext(AppContext);
  const [isUpgrading, setIsUpgrading] = useState(false);

  const handleUpgrade = () => {
    const paystackPublicKey = process.env.PAYSTACK_PUBLIC_KEY;
    if (!paystackPublicKey) {
      alert("Paystack public key is not configured. Payment cannot proceed.");
      console.error("PAYSTACK_PUBLIC_KEY is not set in environment variables.");
      return;
    }

    if (!context?.currentUser) {
      alert("You must be logged in to upgrade.");
      return;
    }
    
    const handler = window.PaystackPop.setup({
      key: paystackPublicKey,
      email: context.currentUser.email,
      amount: PRO_PLAN_PRICE_KOBO, 
      currency: PRO_PLAN_CURRENCY,
      ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference.
      onClose: function(){
        // Fired when the user closes the payment modal
      },
      callback: async function(response: any){
        // Fired when the transaction is successful
        console.log('Payment successful!', response);
        setIsUpgrading(true);
        try {
            await onUpgradeSuccess();
        } catch (error) {
            console.error("Failed to apply upgrade post-payment", error);
            alert("Payment was successful, but we had an issue upgrading your account. Please contact support.");
        } finally {
            setIsUpgrading(false); // Modal will close on success anyway
        }
      }
    });
    handler.openIframe();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
      <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-md border border-slate-700 m-4" onClick={e => e.stopPropagation()}>
        <div className="p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-500/20 mb-4">
            <StarIcon className="h-8 w-8 text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">Upgrade to Pro</h3>
          <p className="mt-2 text-slate-400">You've used all your free generations. Unlock your full potential with a Pro plan.</p>
          
          <ul className="mt-6 text-left space-y-3 text-slate-300">
            <li className="flex items-center gap-3">
              <CheckIcon className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <span>Unlimited resume & career generations</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckIcon className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <span>Access to all premium tools</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckIcon className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <span>Ad-free experience</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckIcon className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <span>Priority access to new features</span>
            </li>
          </ul>

          <div className="mt-8">
            <button
              onClick={handleUpgrade}
              disabled={isUpgrading}
              className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-500 transition-colors disabled:bg-cyan-800 disabled:cursor-wait"
            >
              {isUpgrading ? 'Finalizing Upgrade...' : 'Upgrade to Pro Now'}
            </button>
            <button
              onClick={onClose}
              className="mt-3 w-full text-slate-400 font-medium py-2 px-4 rounded-md hover:bg-slate-700 transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Re-using CheckIcon from another component as it's common
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);
