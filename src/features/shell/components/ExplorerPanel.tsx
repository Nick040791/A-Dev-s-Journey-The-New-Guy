import { ChevronDown, FileCode2, FileText } from 'lucide-react';

import { useModuleRegistry } from '@/app/providers/module-registry-context';
import type { EditorFileModel } from '@/shared/types/shell';
import { cx } from '@/shared/lib/cx';

interface ExplorerPanelProps {
  files: EditorFileModel[];
  activeFilePath: string;
  onFileSelect: (path: string) => void;
}

function FileIcon({ language }: { language: string }) {
  if (language === 'markdown') return <FileText className="h-3.5 w-3.5 text-(--text-dim)" />;
  return <FileCode2 className="h-3.5 w-3.5 text-(--accent)" />;
}

export function ExplorerPanel({ files, activeFilePath, onFileSelect }: ExplorerPanelProps) {
  const { missionEngine } = useModuleRegistry();
  const mission = missionEngine.getActiveMission('briefing');

  return (
    <div className="sidebar-panel h-full">
      <div className="sidebar-header">
        <span>Explorer</span>
      </div>

      {/* File tree section */}
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <ChevronDown className="h-3 w-3" />
          <span>Open Editors</span>
        </div>
        <div className="py-1">
          {files.map((file) => (
            <button
              key={file.path}
              className={cx(
                'sidebar-file-item w-full text-left',
                activeFilePath === file.path && 'sidebar-file-item-active',
              )}
              onClick={() => onFileSelect(file.path)}
              type="button"
            >
              <FileIcon language={file.language} />
              <span className="truncate">{file.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Source tree section */}
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <ChevronDown className="h-3 w-3" />
          <span>src / features / auth</span>
        </div>
        <div className="py-1">
          {files.map((file) => (
            <button
              key={`tree-${file.path}`}
              className={cx(
                'sidebar-file-item w-full text-left',
                activeFilePath === file.path && 'sidebar-file-item-active',
              )}
              onClick={() => onFileSelect(file.path)}
              type="button"
            >
              <FileIcon language={file.language} />
              <span className="truncate">{file.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mission readout section */}
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <ChevronDown className="h-3 w-3" />
          <span>Mission Readout</span>
        </div>
        <div className="mission-readout">
          <span className="mission-readout-ticket">{mission.ticketId}</span>
          <span className="mission-readout-title">{mission.title}</span>
          <span className="mission-readout-summary">{mission.summary}</span>
          <div className="mt-1 flex flex-col gap-1">
            {mission.objectives.map((obj) => (
              <div key={obj.id} className="flex items-center gap-2">
                <span className={obj.completed ? 'objective-check objective-check-done' : 'objective-check'} />
                <span className="font-body text-[14px] text-(--text-muted)">{obj.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
