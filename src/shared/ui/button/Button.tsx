import type { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'rounded-md',
    'font-medium',
    'transition',
    'disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed',
    'active:scale-[0.97] active:translate-y-px',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-[var(--ring-focus)]',
    'focus-visible:ring-offset-2',
    'focus-visible:ring-offset-[var(--bg-default)]',
    'hover:opacity-80',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-accent-primary text-white',
        secondary: [
          'bg-surface-default',
          'text-fg-primary',
          'border border-accent-primary/30',
          'hover:border-accent-secondary/60 hover:bg-bg-muted',
        ],
        danger: [
          'bg-surface-default',
          'text-fg-primary',
          'border border-accent-primary/30',
          'hover:border-accent-danger/50 hover:bg-bg-muted',
        ],
        link: 'bg-inherit text-fg-primary hover:text-accent-secondary',
      },
      size: {
        s: 'h-8 min-w-28 px-3 text-sm',
        m: 'h-9 px-4 text-sm sm:min-w-40',
        l: 'h-10 min-w-52 px-5 text-base',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'm',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
};
