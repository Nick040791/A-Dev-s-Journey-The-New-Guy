import { X } from 'lucide-react';

import { useShellStore } from '@/features/shell/state/use-shell-store';
import { accentStyleLabels, themePresets } from '@/shared/theme/theme-presets';
import type { AccentStyle, DensityMode } from '@/shared/types/shell';

const densityOptions: DensityMode[] = ['compact', 'comfortable', 'expanded'];
const accentOptions: AccentStyle[] = ['soft', 'beam', 'edge'];

export function SettingsPanel() {
  const {
    accentStyle,
    density,
    glow,
    isSettingsOpen,
    setAccentStyle,
    setDensity,
    setGlow,
    setSettingsOpen,
    setThemePresetId,
    themePresetId,
  } = useShellStore();

  return (
    <div className={isSettingsOpen ? 'settings-layer settings-layer-open' : 'settings-layer'}>
      <button aria-label="Close settings" className="settings-backdrop" onClick={() => setSettingsOpen(false)} type="button" />
      <aside className="settings-shell">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="panel-eyebrow">STYLE LAB</p>
            <h2 className="mt-2 font-display text-[10px] uppercase tracking-[0.08em] text-(--text-primary)">
              Shell tuning
            </h2>
            <p className="mt-2 font-body text-[15px] leading-5 text-(--text-muted)">
              Theme, density, glow, and accent style persist locally across restarts.
            </p>
          </div>
          <button aria-label="Close settings" className="chrome-button" onClick={() => setSettingsOpen(false)} type="button">
            <X className="h-4 w-4" />
          </button>
        </header>

        <section className="settings-section">
          <p className="settings-label">Visual presets</p>
          <div className="grid gap-3">
            {themePresets.map((preset) => (
              <button
                className={preset.id === themePresetId ? 'preset-card preset-card-active' : 'preset-card'}
                key={preset.id}
                onClick={() => setThemePresetId(preset.id)}
                type="button"
              >
                <div>
                  <p className="font-body text-[15px] font-semibold text-(--text-primary)">{preset.label}</p>
                  <p className="mt-1 text-[12px] font-body uppercase tracking-[0.14em] text-(--text-dim)">{preset.tag}</p>
                </div>
                <p className="font-body text-[14px] leading-5 text-(--text-muted)">{preset.description}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="settings-section">
          <p className="settings-label">Panel density</p>
          <div className="segmented-control">
            {densityOptions.map((option) => (
              <button
                className={option === density ? 'segment-button segment-button-active' : 'segment-button'}
                key={option}
                onClick={() => setDensity(option)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        <section className="settings-section">
          <div className="flex items-center justify-between gap-3">
            <p className="settings-label">Glow intensity</p>
            <span className="shell-chip">{glow}%</span>
          </div>
          <input
            className="range-input"
            max={100}
            min={25}
            onChange={(event) => setGlow(Number(event.target.value))}
            type="range"
            value={glow}
          />
        </section>

        <section className="settings-section">
          <p className="settings-label">Accent style</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {accentOptions.map((option) => (
              <button
                className={option === accentStyle ? 'preset-card preset-card-active' : 'preset-card'}
                key={option}
                onClick={() => setAccentStyle(option)}
                type="button"
              >
                <p className="text-sm font-semibold text-(--text-primary)">{accentStyleLabels[option]}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="settings-section">
          <p className="settings-label">Persisted shell state</p>
          <div className="stacked-card space-y-2 text-sm text-(--text-muted)">
            <p>Theme preset, density, glow, accent style, active view, and panel open states persist locally.</p>
            <p>Panel sizes persist independently through resizable panel autosave keys.</p>
          </div>
        </section>
      </aside>
    </div>
  );
}