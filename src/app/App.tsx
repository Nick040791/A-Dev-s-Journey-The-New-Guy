import { useState } from 'react';

import { AppProviders } from '@/app/providers/AppProviders';
import { ShellLayout } from '@/app/layout/ShellLayout';
import { IntroVideo } from '@/features/intro/components/IntroVideo';
import { MainMenu } from '@/features/intro/components/MainMenu';

type AppScreen = 'intro' | 'menu' | 'shell';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('intro');

  if (screen === 'intro') {
    return <IntroVideo onComplete={() => setScreen('menu')} />;
  }

  if (screen === 'menu') {
    return <MainMenu onStartDev={() => setScreen('shell')} onReset={() => setScreen('intro')} />;
  }

  return (
    <AppProviders>
      <ShellLayout />
    </AppProviders>
  );
}