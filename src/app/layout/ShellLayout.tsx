import { lazy, Suspense, useCallback, useState } from 'react';

import { Group, Panel, useDefaultLayout, usePanelRef } from 'react-resizable-panels';

import { ChatPanel } from '@/features/chat/components/ChatPanel';
import { OutputDrawer } from '@/features/output/components/OutputDrawer';
import { ActivityBar, type ActivityView } from '@/features/shell/components/ActivityBar';
import { ExplorerPanel } from '@/features/shell/components/ExplorerPanel';
import { MenuBar } from '@/features/shell/components/MenuBar';
import { StatusBar } from '@/features/shell/components/StatusBar';
import { useShellStore } from '@/features/shell/state/use-shell-store';
import { SettingsPanel } from '@/features/settings/components/SettingsPanel';
import { editorFiles } from '@/mocks/shell-data';
import { ResizeHandle } from '@/shared/ui/ResizeHandle';

const WorkspacePanel = lazy(() =>
  import('@/features/workspace/components/WorkspacePanel').then((module) => ({
    default: module.WorkspacePanel,
  })),
);

function WorkspacePanelFallback() {
  return (
    <div className="flex h-full min-h-0 flex-col items-center justify-center gap-3 bg-(--surface-1) text-center">
      <div className="editor-boot-pulse" />
      <p className="panel-eyebrow">WORKSPACE</p>
      <p className="font-display text-[8px] uppercase tracking-[0.14em] text-(--text-primary)">Loading editor bay</p>
    </div>
  );
}

const viewLabels: Record<Exclude<ActivityView, 'explorer' | 'settings'>, string> = {
  search: 'Search',
  git: 'Source Control',
  debug: 'Run & Debug',
  extensions: 'Extensions',
};

function SidebarPlaceholder({ view }: { view: Exclude<ActivityView, 'explorer' | 'settings'> }) {
  return (
    <div className="flex h-full flex-col bg-(--surface-1)">
      <div className="sidebar-section-header">{viewLabels[view]}</div>
      <div className="flex flex-1 items-center justify-center px-4 text-center">
        <p className="font-body text-xs text-(--text-muted)">
          {viewLabels[view]} will be available in a future module.
        </p>
      </div>
    </div>
  );
}

export function ShellLayout() {
  const outputPanelRef = usePanelRef();
  const sidebarPanelRef = usePanelRef();
  const chatPanelRef = usePanelRef();
  const verticalLayout = useDefaultLayout({ id: 'new-guy-vertical-layout' });
  const horizontalLayout = useDefaultLayout({ id: 'new-guy-horizontal-layout' });

  const setSettingsOpen = useShellStore((state) => state.setSettingsOpen);

  const [activityView, setActivityView] = useState<ActivityView>('explorer');
  const [files, setFiles] = useState(editorFiles);
  const [activeFilePath, setActiveFilePath] = useState(files[0]?.path ?? '');

  const activeFile = files.find((f) => f.path === activeFilePath) ?? files[0];

  const handleFileChange = useCallback((path: string, content: string) => {
    setFiles((current) =>
      current.map((f) => (f.path === path ? { ...f, content } : f)),
    );
  }, []);

  return (
    <div className="app-shell flex h-screen flex-col overflow-hidden">
      <MenuBar onOpenSettings={() => setSettingsOpen(true)} />

      <div className="flex min-h-0 flex-1">
        <ActivityBar
          activeView={activityView}
          onViewChange={(view) => {
            if (view === 'settings') {
              setSettingsOpen(true);
              return;
            }
            setActivityView(view);
          }}
        />

        <main className="flex min-h-0 min-w-0 flex-1">
          <Group
            className="h-full min-h-0"
            defaultLayout={horizontalLayout.defaultLayout}
            id="new-guy-horizontal-layout"
            onLayoutChanged={horizontalLayout.onLayoutChanged}
            orientation="horizontal"
          >
            {/* Sidebar */}
            <Panel collapsedSize={0} collapsible defaultSize={20} minSize={14} panelRef={sidebarPanelRef}>
              {activityView === 'explorer' || activityView === 'settings' ? (
                <ExplorerPanel
                  activeFilePath={activeFilePath}
                  files={files}
                  onFileSelect={setActiveFilePath}
                />
              ) : (
                <SidebarPlaceholder view={activityView} />
              )}
            </Panel>
            <ResizeHandle direction="horizontal" />

            {/* Center: editor + output */}
            <Panel defaultSize={55} minSize={30}>
              <Group
                className="h-full min-h-0"
                defaultLayout={verticalLayout.defaultLayout}
                id="new-guy-vertical-layout"
                onLayoutChanged={verticalLayout.onLayoutChanged}
                orientation="vertical"
              >
                <Panel defaultSize={70} minSize={30}>
                  <Suspense fallback={<WorkspacePanelFallback />}>
                    <WorkspacePanel
                      files={files}
                      activeFilePath={activeFilePath}
                      onFileSelect={setActiveFilePath}
                      onFileChange={handleFileChange}
                    />
                  </Suspense>
                </Panel>
                <ResizeHandle direction="vertical" />
                <Panel collapsedSize={0} collapsible defaultSize={30} minSize={14} panelRef={outputPanelRef}>
                  <OutputDrawer activeFile={activeFile} />
                </Panel>
              </Group>
            </Panel>
            <ResizeHandle direction="horizontal" />

            {/* Chat panel (right) */}
            <Panel collapsedSize={0} collapsible defaultSize={25} minSize={18} panelRef={chatPanelRef}>
              <ChatPanel />
            </Panel>
          </Group>
        </main>
      </div>

      <StatusBar />
      <SettingsPanel />
    </div>
  );
}