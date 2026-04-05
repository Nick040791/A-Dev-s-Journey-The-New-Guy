export default function ArcadeBootcampUIMockups() {
  const team = [
    {
      id: 'mara',
      name: 'Mara Vale',
      role: 'Tech Lead',
      status: 'online',
      accent: 'cyan',
      avatarBg: 'from-cyan-300 to-sky-500',
      initials: 'MV',
      message: 'Keep the auth gate small. One responsibility. No panic refactors.',
      time: '09:14',
    },
    {
      id: 'dae',
      name: 'Dae Mercer',
      role: 'Project Manager',
      status: 'urgent',
      accent: 'pink',
      avatarBg: 'from-pink-300 to-rose-500',
      initials: 'DM',
      message: 'Stakeholder changed scope. Need protected routes and session persistence before lunch.',
      time: '09:16',
    },
    {
      id: 'jun',
      name: 'Jun Park',
      role: 'QA Analyst',
      status: 'watching',
      accent: 'lime',
      avatarBg: 'from-lime-300 to-emerald-500',
      initials: 'JP',
      message: 'Found a redirect loop on refresh. I left repro steps in the thread.',
      time: '09:17',
    },
    {
      id: 'sol',
      name: 'Sol Nadir',
      role: 'AI Mentor',
      status: 'ready',
      accent: 'violet',
      avatarBg: 'from-violet-300 to-indigo-500',
      initials: 'SN',
      message: 'I can ghost-write a 20 second demo if you want the clean pattern first.',
      time: '09:18',
    },
    {
      id: 'rex',
      name: 'Rex Hollow',
      role: 'Backend Dev',
      status: 'committing',
      accent: 'amber',
      avatarBg: 'from-amber-300 to-orange-500',
      initials: 'RH',
      message: 'Session endpoint is stable. Frontend contract is waiting on you, hero.',
      time: '09:19',
    },
  ];

  const files = [
    'src',
    'features',
    'auth',
    'AuthGate.tsx',
    'useSession.ts',
    'session.contract.ts',
    'routes.tsx',
    'styles',
    'arcade-theme.css',
  ];

  const tabs = ['AuthGate.tsx', 'useSession.ts', 'session.contract.ts'];

  const codeLines = [
    "import { Navigate } from 'react-router-dom';",
    "import { useSession } from './useSession';",
    '',
    'export function AuthGate() {',
    '  const { user, isLoading } = useSession();',
    '',
    '  if (isLoading) {',
    "    return <div className=\"pixel-loader\">Loading session...</div>;",
    '  }',
    '',
    '  if (!user) {',
    '    return <Navigate to="/login" replace />;',
    '  }',
    '',
    '  return <section className="auth-gate">Authorized</section>;',
    '}',
  ];

  const terminalLines = [
    '[chat] PM flagged scope escalation on ticket AUTH-204',
    '[test] authgate.refresh.spec.ts failed: redirect loop detected',
    '[mentor] Sol demo available: route guards + loading states',
    '[score] code quality +12 | team trust +3 | deadline heat HIGH',
  ];

  const titleFont = { fontFamily: "'Press Start 2P', 'Courier New', monospace" };
  const bodyFont = { fontFamily: "'VT323', 'Courier New', monospace" };
  const chatFont = { fontFamily: "'Silkscreen', 'VT323', 'Courier New', monospace" };
  const scale = {
    heroLabel: 'text-[9px]',
    heroTitle: 'text-[1.45rem] md:text-[1.75rem]',
    menu: 'text-[0.78rem] md:text-[0.9rem]',
    panelLabel: 'text-[0.72rem]',
    panelTitle: 'text-[0.8rem]',
    body: 'text-[1rem] md:text-[1.08rem]',
    bodySm: 'text-[0.92rem] md:text-[1rem]',
    code: 'text-[1rem] md:text-[1.08rem]',
    codeNums: 'text-[0.85rem]',
    status: 'text-[8px]',
    chatName: 'text-[0.82rem] md:text-[0.9rem]',
    chatMeta: 'text-[0.56rem] md:text-[0.62rem]',
    chatBody: 'text-[0.8rem] md:text-[0.88rem]',
  };

  const accentMap = {
    cyan: {
      text: 'text-cyan-300',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-400/25',
      dot: 'bg-cyan-300',
    },
    pink: {
      text: 'text-pink-300',
      bg: 'bg-pink-500/10',
      border: 'border-pink-400/25',
      dot: 'bg-pink-300',
    },
    lime: {
      text: 'text-lime-300',
      bg: 'bg-lime-500/10',
      border: 'border-lime-400/25',
      dot: 'bg-lime-300',
    },
    violet: {
      text: 'text-violet-300',
      bg: 'bg-violet-500/10',
      border: 'border-violet-400/25',
      dot: 'bg-violet-300',
    },
    amber: {
      text: 'text-amber-300',
      bg: 'bg-amber-500/10',
      border: 'border-amber-400/25',
      dot: 'bg-amber-300',
    },
  };

  const PixelAvatar = ({ member, small = false }) => (
    <div className={`relative ${small ? 'h-10 w-10' : 'h-16 w-16'} shrink-0 rounded-md border-2 border-white/10 bg-slate-900 p-[2px] shadow-[0_0_18px_rgba(0,0,0,0.35)]`}>
      <div className={`flex h-full w-full items-center justify-center rounded-[4px] bg-gradient-to-br ${member.avatarBg} text-slate-950 ${small ? 'text-[8px]' : 'text-[10px]'} font-black`} style={titleFont}>
        {member.initials}
      </div>
      <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-sm border border-slate-950 ${accentMap[member.accent].dot}`} />
    </div>
  );

  const StatusPill = ({ children, tone = 'cyan', pulse = false }) => (
    <span
      className={`rounded-md border px-2 py-1 ${scale.status} uppercase tracking-[0.18em] ${accentMap[tone].border} ${accentMap[tone].bg} ${accentMap[tone].text} ${pulse ? 'animate-pulse' : ''}`}
      style={titleFont}
    >
      {children}
    </span>
  );

  const ExplorerRow = ({ name, active = false, indent = 0 }) => (
    <div
      className={`flex items-center gap-2 rounded px-2 py-1 ${active ? 'bg-cyan-500/12 text-cyan-200' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
      style={{ paddingLeft: `${8 + indent * 16}px` }}
    >
      <span className="text-[0.82rem] leading-none">{indent < 2 ? '▸' : '•'}</span>
      <span className="truncate text-[0.98rem] leading-none">{name}</span>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-[#06070c] text-white"
      style={{
        ...bodyFont,
        backgroundImage:
          'radial-gradient(circle at 20% 0%, rgba(34,211,238,0.08), transparent 24%), radial-gradient(circle at 80% 0%, rgba(236,72,153,0.08), transparent 22%), linear-gradient(180deg, #090b12 0%, #04050a 100%)',
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.08]"
        style={{ backgroundImage: 'repeating-linear-gradient(180deg, rgba(255,255,255,0.16) 0px, rgba(255,255,255,0.16) 1px, transparent 2px, transparent 5px)' }}
      />

      <div className="mx-auto max-w-[1600px] p-4 md:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cyan-400/20 bg-[#0b0f18]/90 px-4 py-3 shadow-[0_0_30px_rgba(34,211,238,0.08)]">
          <div>
            <div className={`${scale.heroLabel} uppercase tracking-[0.22em] text-cyan-300`} style={titleFont}>Arcade IDE Emulator</div>
            <div className={`mt-2 ${scale.heroTitle} leading-none text-white`}>A Dev's Journey // The New Guy</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusPill tone="cyan">VS Code Shell</StatusPill>
            <StatusPill tone="lime">Chat-Driven Team Drama</StatusPill>
            <StatusPill tone="pink">8-Bit Stakes</StatusPill>
            <StatusPill tone="amber">Real Coding Loop</StatusPill>
          </div>
        </div>

        <div className="overflow-hidden rounded-[22px] border border-lime-500/30 bg-[#05070d] shadow-[0_0_0_2px_rgba(13,255,0,0.12),0_0_45px_rgba(13,255,0,0.08)]">
          <div className="border-b border-lime-500/20 bg-black px-4 py-2 text-[#18ff00]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className={`flex items-center gap-4 ${scale.menu}`}>
                <span className="text-[#00a2ff]">⌘</span>
                {['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="flex items-center gap-3 text-[0.76rem] md:text-[0.86rem]">
                <span className="text-[#0aff7f]">16</span>
                <span>●</span>
                <span>▢</span>
                <span>✕</span>
              </div>
            </div>
          </div>

          <div className="grid min-h-[860px] grid-cols-[56px_260px_minmax(0,1fr)_360px] bg-[#05070d] text-[#18ff00]">
            <aside className="border-r border-lime-500/20 bg-black/70 p-2">
              <div className="flex flex-col items-center gap-4 pt-2 text-[1.2rem]">
                {['🗂', '🔍', '⑂', '⚙', '▶', '☰'].map((icon, index) => (
                  <div
                    key={index}
                    className={`flex h-9 w-9 items-center justify-center rounded ${index === 0 ? 'bg-lime-500/12 text-[#7dff72]' : 'text-[#1de000] opacity-80'}`}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </aside>

            <aside className="border-r border-lime-500/20 bg-[#090c12]">
              <div className="border-b border-lime-500/20 px-4 py-3">
                <div className={`${scale.panelLabel} uppercase tracking-[0.2em] text-[#7dff72]`} style={titleFont}>Explorer</div>
                <div className={`mt-2 ${scale.panelTitle} leading-none text-lime-100`}>A-DEVS-JOURNEY-THE-NEW-GUY</div>
              </div>

              <div className="px-2 py-3">
                {files.map((file, index) => (
                  <ExplorerRow key={file} name={file} indent={index < 1 ? 0 : index < 3 ? 1 : 2} active={file === 'AuthGate.tsx'} />
                ))}
              </div>

              <div className="border-t border-lime-500/20 px-4 py-3">
                <div className={`${scale.panelLabel} uppercase tracking-[0.18em] text-[#7dff72]`} style={titleFont}>Mission Readout</div>
                <div className={`mt-3 rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-3 ${scale.body} leading-tight text-cyan-100`}>
                  Fix the protected route flow before the stakeholder demo starts.
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <StatusPill tone="lime">XP +240</StatusPill>
                  <StatusPill tone="amber">Heat High</StatusPill>
                </div>
              </div>
            </aside>

            <main className="flex min-w-0 flex-col bg-[#06080f]">
              <div className="border-b border-lime-500/20 bg-[#080b11] px-3 py-2">
                <div className="flex flex-wrap gap-2">
                  {tabs.map((tab) => (
                    <div
                      key={tab}
                      className={`rounded-t-md border px-3 py-2 text-[0.95rem] ${tab === 'AuthGate.tsx' ? 'border-lime-400/30 bg-[#0d1220] text-lime-100' : 'border-white/5 bg-black/30 text-[#57c857]'}`}
                    >
                      {tab}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative flex-1 bg-[#05070d]">
                <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
                  <StatusPill tone="pink" pulse>!</StatusPill>
                  <div className="rounded-md border border-pink-400/30 bg-pink-500/15 px-3 py-2 text-[1rem] leading-none text-pink-100 shadow-[0_0_24px_rgba(236,72,153,0.18)]">
                    EMERGENCY PULSE: scope changed
                  </div>
                </div>

                <div className="grid h-full grid-cols-[68px_minmax(0,1fr)]">
                  <div className={`border-r border-lime-500/20 bg-[#070b12] px-3 py-5 text-right ${scale.codeNums} text-[#2d6c2c]`}>
                    {codeLines.map((_, idx) => (
                      <div key={idx} className="h-7 leading-7">{idx + 1}</div>
                    ))}
                  </div>
                  <div className={`overflow-hidden px-5 py-5 ${scale.code} leading-7 text-[#c7ffbd]`} style={bodyFont}>
                    {codeLines.map((line, idx) => (
                      <div key={idx} className="h-7 whitespace-pre">
                        {line.includes('import') ? (
                          <><span className="text-pink-300">import</span>{line.slice(6)}</>
                        ) : line.includes('export') ? (
                          <><span className="text-pink-300">export</span>{line.slice(6)}</>
                        ) : line.includes('if') ? (
                          line.replace('if', '§if§').split('§').map((part, i) => part === 'if' ? <span key={i} className="text-pink-300">if</span> : <span key={i}>{part}</span>)
                        ) : line.includes('return') ? (
                          line.replace('return', '§return§').split('§').map((part, i) => part === 'return' ? <span key={i} className="text-pink-300">return</span> : <span key={i}>{part}</span>)
                        ) : (
                          line || ' '
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-lime-500/20 bg-black/80 px-4 py-2">
                <div className="mb-2 flex items-center gap-4 text-[0.95rem] text-[#7dff72]">
                  <span>PROBLEMS 2</span>
                  <span>OUTPUT</span>
                  <span className="text-lime-100">TERMINAL</span>
                  <span>TEAM FEED</span>
                </div>
                <div className={`rounded-lg border border-lime-500/20 bg-[#040608] px-3 py-3 ${scale.bodySm} leading-6 text-[#8cff8c]`}>
                  {terminalLines.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </div>

              <div className="border-t border-lime-500/20 bg-black px-4 py-2 text-[0.95rem] text-[#16f000]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-4">
                    <span>Ui-Concept*</span>
                    <span>main</span>
                    <span>TypeScript</span>
                    <span>Spaces: 2</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <span>Arcade Theme</span>
                    <span>Build Live</span>
                    <span>XP 1240</span>
                  </div>
                </div>
              </div>
            </main>

            <aside className="border-l border-lime-500/20 bg-[#080b10]">
              <div className="border-b border-lime-500/20 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[0.95rem] uppercase tracking-[0.2em] text-[#7dff72]" style={titleFont}>Chat</div>
                    <div className="mt-2 text-[1.15rem] leading-none text-lime-100">squad-feed.ts</div>
                  </div>
                  <div className="flex gap-2">
                    <StatusPill tone="cyan">Live</StatusPill>
                    <StatusPill tone="pink" pulse>Alert</StatusPill>
                  </div>
                </div>
              </div>

              <div className="h-[calc(100%-72px)] overflow-auto px-3 py-3">
                <div className="mb-3 rounded-xl border border-pink-400/30 bg-pink-500/12 p-3 shadow-[0_0_26px_rgba(236,72,153,0.12)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-pink-300/30 bg-pink-500/20 text-pink-100 animate-pulse" style={titleFont}>!</div>
                    <div>
                      <div className={`${scale.panelLabel} uppercase tracking-[0.18em] text-pink-200`} style={titleFont}>Critical Ping</div>
                      <div className={`${scale.chatBody} leading-tight text-pink-50`}>Stakeholder demo moved up. Ship a stable auth flow now.</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3" style={chatFont}>
                  {team.map((member) => (
                    <div key={member.id} className={`rounded-xl border ${accentMap[member.accent].border} ${accentMap[member.accent].bg} p-3`}>
                      <div className="flex items-start gap-4">
                        <PixelAvatar member={member} />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`${scale.chatName} leading-none text-white`}>{member.name}</span>
                            <span className={`${scale.chatMeta} uppercase tracking-[0.16em] text-slate-500`} style={titleFont}>{member.role}</span>
                            <span className={`${scale.chatMeta} ml-auto text-slate-500`}>{member.time}</span>
                          </div>
                          <div className={`mt-2 ${scale.chatBody} leading-tight text-slate-100`}>{member.message}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-3" style={chatFont}>
                  <div className={`${scale.panelLabel} uppercase tracking-[0.18em] text-cyan-200`} style={titleFont}>Reply Composer</div>
                  <div className={`mt-2 rounded-lg border border-white/10 bg-black/30 px-3 py-3 ${scale.chatBody} text-slate-200`}>
                    @team I am fixing the loading state first, then the redirect guard, then session refresh.
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
            <div className={`${scale.heroLabel} uppercase tracking-[0.18em] text-cyan-200`} style={titleFont}>Direction</div>
            <div className="mt-3 text-[1.18rem] md:text-[1.28rem] leading-tight text-white">Make the whole experience feel like a modded VS Code shell first, arcade game second.</div>
          </div>
          <div className="rounded-2xl border border-pink-400/20 bg-pink-500/10 p-4">
            <div className={`${scale.heroLabel} uppercase tracking-[0.18em] text-pink-200`} style={titleFont}>Drama Layer</div>
            <div className="mt-3 text-[1.55rem] leading-tight text-white">Use rare high-impact alerts, red emergency pulses, and stingers instead of decorating every panel like a casino.</div>
          </div>
          <div className="rounded-2xl border border-lime-400/20 bg-lime-500/10 p-4">
            <div className={`${scale.heroLabel} uppercase tracking-[0.18em] text-lime-200`} style={titleFont}>Character Use</div>
            <div className="mt-3 text-[1.55rem] leading-tight text-white">Keep avatars and personality concentrated in chat, reviews, interrupts, and milestone events. Let the editor stay sacred.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
