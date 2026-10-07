import { cn } from '@/shared/lib';

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
  return (
    <div className={cn('flex justify-center align-middle', className)}>
      Page not found
    </div>
  );
};
