import { cn } from '@/shared/lib';
import type { ReactNode } from 'react';

type FormCardSize = 'sm' | 'md' | 'lg';

interface FormCardProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  className?: string;
  size?: FormCardSize;
  children: ReactNode;
}

const sizeClasses: Record<FormCardSize, string> = {
  sm: 'max-w-[380px]',
  md: 'max-w-[420px]',
  lg: 'max-w-[560px]',
};

export const FormCard = ({
  title,
  subtitle,
  className,
  size = 'md',
  children,
}: FormCardProps) => {
  return (
    <div
      className={cn(
        'w-full mx-auto',
        sizeClasses[size],
        'min-w-[360px]',
        'p-5 sm:p-6',
        'bg-surface-elevated border border-border-default',
        'rounded-md sm:rounded-lg',
        'flex flex-col gap-4',
        className
      )}
    >
      <div>
        <h1 className="text-xl font-semibold text-fg-primary">{title}</h1>
        <p className="mt-1 text-xs text-fg-secondary">{subtitle}</p>
      </div>
      {children}
    </div>
  );
};
