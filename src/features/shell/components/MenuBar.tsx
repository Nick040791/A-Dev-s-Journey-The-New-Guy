import { Settings2 } from 'lucide-react';

interface MenuBarProps {
  onOpenSettings: () => void;
}

const menuItems: { label: string; active: boolean }[] = [
  { label: 'File', active: true },
  { label: 'Edit', active: false },
  { label: 'Selection', active: false },
  { label: 'View', active: true },
  { label: 'Go', active: false },
  { label: 'Run', active: false },
  { label: 'Terminal', active: false },
  { label: 'Help', active: false },
];

export function MenuBar({ onOpenSettings }: MenuBarProps) {
  return (
    <header className="menu-bar">
      <div className="menu-bar-brand">
        <span>SE://TNG</span>
      </div>

      <nav className="flex items-center">
        {menuItems.map(({ label, active }) => (
          <button
            key={label}
            className="menu-bar-item"
            style={active ? undefined : { opacity: 0.4, cursor: 'default' }}
            type="button"
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="menu-bar-spacer" />

      <div className="menu-bar-right">
        <button
          aria-label="Open settings"
          className="menu-bar-item"
          onClick={onOpenSettings}
          type="button"
        >
          <Settings2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </header>
  );
}
