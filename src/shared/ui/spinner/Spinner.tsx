import { Loader2 } from 'lucide-react';

export const Spinner = ({ label }: { label?: string }) => (
  <div className="flex flex-col items-center gap-3">
    <Loader2
      className="h-10 w-10 animate-spin"
      style={{ color: 'var(--color-accent-secondary)' }}
    />
    {label && (
      <span className="text-sm" style={{ color: 'var(--color-fg-secondary)' }}>
        {label}
      </span>
    )}
  </div>
);
