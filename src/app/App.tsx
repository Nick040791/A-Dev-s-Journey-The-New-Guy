import { AppProviders } from '@/app/providers/AppProviders';
import { ShellLayout } from '@/app/layout/ShellLayout';

export default function App() {
  return (
    <AppProviders>
      <ShellLayout />
    </AppProviders>
  );
}