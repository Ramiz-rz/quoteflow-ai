import { useState } from 'react';

interface WorkspaceSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWorkspace: string;
  onSelectWorkspace: (name: string) => void;
}

export function WorkspaceSwitcherModal({
  isOpen,
  onClose,
  currentWorkspace,
  onSelectWorkspace,
}: WorkspaceSwitcherModalProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');

  if (!isOpen) return null;

  const workspaces = [
    { name: 'Acme Agency Workspace • Pro AI Tier', type: 'Agency', seats: 8, quotes: 38 },
    { name: 'Alex Vance Consulting • Solo Pro', type: 'Freelance', seats: 1, quotes: 14 },
    { name: 'Horizon Collective Studio • Venture', type: 'Studio', seats: 4, quotes: 9 },
  ];

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newWorkspaceName.trim();
    if (trimmed) {
      onSelectWorkspace(`${trimmed} • Pro AI Tier`);
      setNewWorkspaceName('');
      setIsCreating(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-container border border-outline-variant/30 rounded-2xl w-full max-w-sm p-4 space-y-3 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
          <span className="font-headline-sm text-body-md font-semibold text-on-surface">
            Switch Workspace
          </span>
          <button
            onClick={() => {
              setIsCreating(false);
              onClose();
            }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-1.5">
          {workspaces.map((w) => {
            const isSelected = currentWorkspace === w.name;
            return (
              <button
                key={w.name}
                onClick={() => {
                  onSelectWorkspace(w.name);
                  onClose();
                }}
                className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-surface-container-high border-primary/50 text-primary'
                    : 'bg-surface-container-low border-outline-variant/20 text-on-surface hover:border-outline-variant/40'
                }`}
              >
                <div>
                  <div className="font-medium text-body-sm">{w.name.split('•')[0].trim()}</div>
                  <div className="text-[11px] font-mono text-outline mt-0.5">
                    {w.type} • {w.seats} seat{w.seats > 1 ? 's' : ''} • {w.quotes} quotes
                  </div>
                </div>
                {isSelected && (
                  <span className="material-symbols-outlined text-[16px] text-primary">check</span>
                )}
              </button>
            );
          })}
        </div>

        {isCreating ? (
          <form onSubmit={handleCreateNew} className="p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/30 space-y-2">
            <label className="block text-[11px] font-mono text-outline">
              New Workspace Entity
            </label>
            <input
              type="text"
              autoFocus
              required
              placeholder="e.g. Design Studio Lab"
              value={newWorkspaceName}
              onChange={(e) => setNewWorkspaceName(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-2.5 py-1.5 text-body-sm text-on-surface placeholder:text-outline font-mono focus:outline-none focus:border-primary"
            />
            <div className="flex items-center gap-2 pt-1 font-mono text-label-sm">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="flex-1 py-1 rounded-lg bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-1 rounded-lg bg-primary-container text-on-primary-container font-semibold hover:brightness-105"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsCreating(true)}
            className="w-full py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-mono text-label-md flex items-center justify-center gap-1.5 border border-outline-variant/30 cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Create New Workspace</span>
          </button>
        )}
      </div>
    </div>
  );
}
