import type { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center',
    'font-medium',
    'transition',
    'disabled:opacity-50 disabled:pointer-events-none',
    'hover:opacity-90 hover:text-fg-secondary',
    'active:scale-[0.97] active:translate-y-px',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-[var(--ring-focus)]',
    'focus-visible:ring-offset-2',
    'focus-visible:ring-offset-[var(--bg-default)]',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-accent-primary text-white',
        secondary:
          'bg-surface-default text-accent-primary border-[1.5px] border-accent-primary hover:text-accent-secondary hover:border-accent-secondary',
        ghost:
          'bg-surface-default border-[1.5px] border-border-default text-accent-primary hover:border-accent-secondary',
        danger: 'bg-surface-default text-fg-error border border-fg-error',
      },
      shape: {
        pill: 'rounded-full',
        cube: 'rounded-sm',
      },
      size: {
        s: 'h-8 w-8 p-0 text-sm',
        m: 'h-9 w-9 p-0 text-sm',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      shape: 'cube',
      size: 'm',
    },
  }
);

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const IconButton = ({
  className,
  variant,
  size,
  shape,
  children,
  ...props
}: IconButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, shape }), className)}
      {...props}
    >
      {' '}
      {children}
    </button>
  );
};
