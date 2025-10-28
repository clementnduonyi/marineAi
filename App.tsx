// FIX: Corrected and consolidated React imports.
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ServiceSelection } from './components/ServiceSelection';
import { ServiceView } from './components/ServiceView';
import { UpgradeModal } from './components/UpgradeModal';
import { AdBanner } from './components/AdBanner';
import { Auth } from './components/Auth';
import { Footer } from './components/Footer';
import type { Service, User } from './types';
import { ServiceID } from './types';
import { SERVICES } from './constants';
import * as dbService from './services/dbService';
import { MarineIcon } from './components/Icons';

export const AppContext = React.createContext<{
  currentUser: User | null;
  generationsLeft: number;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  useGeneration: () => Promise<void>;
  upgradeCurrentUserToPro: () => Promise<void>;
  isLoadingUser: boolean;
} | null>(null);

const App: React.FC = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceID | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [generationsLeft, setGenerationsLeft] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  
  const isPro = currentUser?.isPro ?? false;

  useEffect(() => {
    const checkSession = async () => {
      const user = await dbService.getCurrentUser();
      if (user) {
        setCurrentUser({ email: user.email, isPro: user.isPro });
        setGenerationsLeft(user.generationsLeft);
      }
      setIsLoadingUser(false);
    };
    checkSession();
  }, []);

  const login = useCallback(async (email: string) => {
    const { user } = await dbService.findOrCreateUser(email);
    setCurrentUser({ email: user.email, isPro: user.isPro });
    setGenerationsLeft(user.generationsLeft);
    setSelectedServiceId(null); // Reset view on login
  }, []);

  const logout = useCallback(async () => {
    await dbService.clearCurrentUser();
    setCurrentUser(null);
    setGenerationsLeft(0);
    setSelectedServiceId(null);
  }, []);

  const useGeneration = useCallback(async () => {
    if (!isPro && currentUser) {
      const newCount = Math.max(0, generationsLeft - 1);
      const updatedUser = await dbService.updateUserGenerations(currentUser.email, newCount);
      setGenerationsLeft(updatedUser.generationsLeft);
    }
  }, [isPro, currentUser, generationsLeft]);
  
  const upgradeCurrentUserToPro = useCallback(async () => {
    if (currentUser) {
      const updatedDbUser = await dbService.upgradeUserToPro(currentUser.email);
      setCurrentUser({ email: updatedDbUser.email, isPro: updatedDbUser.isPro });
      setGenerationsLeft(updatedDbUser.generationsLeft);
      setShowUpgradeModal(false);
    }
  }, [currentUser]);

  const handleSelectService = (serviceId: ServiceID) => {
    if (!isPro && generationsLeft <= 0) {
      setShowUpgradeModal(true);
    } else {
      setSelectedServiceId(serviceId);
    }
  };
  
  const handleBack = () => {
    setSelectedServiceId(null);
  };

  const selectedService = useMemo(
    () => SERVICES.find(s => s.id === selectedServiceId),
    [selectedServiceId]
  );
  
  const appContextValue = {
    currentUser,
    generationsLeft,
    login,
    logout,
    useGeneration,
    upgradeCurrentUserToPro,
    isLoadingUser,
  };

  const renderContent = () => {
    if (!currentUser) {
      return <Auth />;
    }
    if (selectedService) {
      return <ServiceView service={selectedService} onGenerationDone={useGeneration} />;
    }
    return <ServiceSelection onSelectService={handleSelectService} />;
  }
  
  if (isLoadingUser) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900">
            <MarineIcon className="w-16 h-16 text-cyan-400 animate-pulse" />
        </div>
    );
  }

  return (
    <AppContext.Provider value={appContextValue}>
      <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col">
        <Header onBack={selectedService ? handleBack : undefined} />
        <main className="flex-grow container mx-auto px-4 py-8">
          {currentUser && !isPro && <AdBanner />}
          {renderContent()}
        </main>
        <Footer />
        <UpgradeModal 
          isOpen={showUpgradeModal || (!isPro && generationsLeft <= 0 && selectedServiceId !== null)} 
          onClose={() => setShowUpgradeModal(false)} 
          onUpgradeSuccess={upgradeCurrentUserToPro} 
        />
      </div>
    </AppContext.Provider>
  );
};

export default App;
