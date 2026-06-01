import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { VaultProvider, useVault } from './context/VaultContext';
import Background from './components/Background';
import BottomNav, { type TabId } from './components/BottomNav';
import UnlockScreen from './screens/UnlockScreen';
import VaultScreen from './screens/VaultScreen';
import GeneratorScreen from './screens/GeneratorScreen';
import SearchScreen from './screens/SearchScreen';
import BackupScreen from './screens/BackupScreen';
import SettingsScreen from './screens/SettingsScreen';

function AppContent() {
  const { isSetup, isUnlocked } = useVault();
  const [activeTab, setActiveTab] = useState<TabId>('vault');

  const renderScreen = () => {
    switch (activeTab) {
      case 'vault': return <VaultScreen />;
      case 'generator': return <GeneratorScreen />;
      case 'search': return <SearchScreen />;
      case 'backup': return <BackupScreen />;
      case 'settings': return <SettingsScreen />;
    }
  };

  if (!isSetup) {
    return <UnlockScreen mode="setup" />;
  }

  if (!isUnlocked) {
    return <UnlockScreen mode="unlock" />;
  }

  return (
    <>
      {/* Tab screens */}
      <div className="relative z-10 h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="h-full overflow-hidden"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </>
  );
}

export default function App() {
  return (
    <VaultProvider>
      <div className="relative h-screen overflow-hidden">
        <Background />
        <AppContent />
      </div>
    </VaultProvider>
  );
}
