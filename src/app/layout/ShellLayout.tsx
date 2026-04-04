import { lazy, Suspense, useEffect } from 'react';

import { Group, Panel, useDefaultLayout, usePanelRef } from 'react-resizable-panels';

import { ChatPanel } from '@/features/chat/components/ChatPanel';
import { MissionPanel } from '@/features/mission/components/MissionPanel';
import { OutputDrawer } from '@/features/output/components/OutputDrawer';
import { TopBar } from '@/features/shell/components/TopBar';
import { useShellStore } from '@/features/shell/state/use-shell-store';
import { SettingsPanel } from '@/features/settings/components/SettingsPanel';
import { shellNavigation } from '@/shared/config/shell-navigation';
import { ResizeHandle } from '@/shared/ui/ResizeHandle';
import { getThemePreset } from '@/shared/theme/theme-presets';

const WorkspacePanel = lazy(() =>
  import('@/features/workspace/components/WorkspacePanel').then((module) => ({
    default: module.WorkspacePanel,
  })),
);

function WorkspacePanelFallback() {
  return (
    <div className="shell-panel flex h-full min-h-0 flex-col justify-center gap-3 p-(--panel-padding) text-center">
      <p className="panel-eyebrow">WORKSPACE</p>
      <p className="font-display text-sm uppercase tracking-[0.18em] text-(--text-primary)">Loading editor bay</p>
      <p className="text-sm leading-6 text-(--text-muted)">Preparing Monaco workers and language services for the shell preview.</p>
    </div>
  );
}

export function ShellLayout() {
  const leftPanelRef = usePanelRef();
  const rightPanelRef = usePanelRef();
  const outputPanelRef = usePanelRef();
  const horizontalLayout = useDefaultLayout({ id: 'new-guy-horizontal-layout' });
  const verticalLayout = useDefaultLayout({ id: 'new-guy-vertical-layout' });

  const currentView = useShellStore((state) => state.currentView);
  const leftPanelCollapsed = useShellStore((state) => state.leftPanelCollapsed);
  const outputOpen = useShellStore((state) => state.outputOpen);
  const rightPanelCollapsed = useShellStore((state) => state.rightPanelCollapsed);
  const setCurrentView = useShellStore((state) => state.setCurrentView);
  const setSettingsOpen = useShellStore((state) => state.setSettingsOpen);
  const syncPanelState = useShellStore((state) => state.syncPanelState);
  const themePresetId = useShellStore((state) => state.themePresetId);

  useEffect(() => {
    if (leftPanelCollapsed) {
      leftPanelRef.current?.collapse();
      return;
    }

    leftPanelRef.current?.expand();
  }, [leftPanelCollapsed, leftPanelRef]);

  useEffect(() => {
    if (rightPanelCollapsed) {
      rightPanelRef.current?.collapse();
      return;
    }

    rightPanelRef.current?.expand();
  }, [rightPanelCollapsed, rightPanelRef]);

  useEffect(() => {
    if (outputOpen) {
      outputPanelRef.current?.expand();
      return;
    }

    outputPanelRef.current?.collapse();
  }, [outputOpen, outputPanelRef]);

  const preset = getThemePreset(themePresetId);

  return (
    <div className="app-shell flex h-screen flex-col overflow-hidden">
      <TopBar
        currentView={currentView}
        items={shellNavigation}
        leftCollapsed={leftPanelCollapsed}
        onOpenSettings={() => setSettingsOpen(true)}
        onToggleLeft={() => syncPanelState({ leftPanelCollapsed: !leftPanelCollapsed })}
        onToggleOutput={() => syncPanelState({ outputOpen: !outputOpen })}
        onToggleRight={() => syncPanelState({ rightPanelCollapsed: !rightPanelCollapsed })}
        onViewChange={setCurrentView}
        outputOpen={outputOpen}
        preset={preset}
        rightCollapsed={rightPanelCollapsed}
      />

      <main className="min-h-0 flex-1 px-(--density-gap) pb-(--density-gap)">
        <Group
          className="h-full min-h-0"
          defaultLayout={verticalLayout.defaultLayout}
          id="new-guy-vertical-layout"
          onLayoutChanged={verticalLayout.onLayoutChanged}
          orientation="vertical"
        >
          <Panel defaultSize={74} minSize={56}>
            <Group
              className="h-full min-h-0"
              defaultLayout={horizontalLayout.defaultLayout}
              id="new-guy-horizontal-layout"
              onLayoutChanged={horizontalLayout.onLayoutChanged}
              orientation="horizontal"
            >
              <Panel collapsedSize={0} collapsible defaultSize={23} minSize={18} panelRef={leftPanelRef}>
                <ChatPanel />
              </Panel>
              <ResizeHandle direction="horizontal" />
              <Panel defaultSize={52} minSize={34}>
                <Suspense fallback={<WorkspacePanelFallback />}>
                  <WorkspacePanel />
                </Suspense>
              </Panel>
              <ResizeHandle direction="horizontal" />
              <Panel collapsedSize={0} collapsible defaultSize={25} minSize={20} panelRef={rightPanelRef}>
                <MissionPanel />
              </Panel>
            </Group>
          </Panel>
          <ResizeHandle direction="vertical" />
          <Panel collapsedSize={0} collapsible defaultSize={26} minSize={18} panelRef={outputPanelRef}>
            <OutputDrawer />
          </Panel>
        </Group>
      </main>

      <SettingsPanel />
    </div>
  );
}