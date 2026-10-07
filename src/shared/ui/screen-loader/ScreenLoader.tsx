import { cn } from '@/shared/lib';
import { Spinner } from '@/shared/ui/spinner/Spinner';

type LoaderMode = 'fullscreen' | 'overlay';

type ScreenLoaderProps = {
  isOpen: boolean;
  label?: string;
  className?: string;
  mode?: LoaderMode;
};

export const ScreenLoader = ({
  isOpen,
  label = 'Загрузка…',
  className,
  mode = 'overlay',
}: ScreenLoaderProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'grid place-items-center',
        'bg-color-bg-default/80 backdrop-blur-sm',
        mode === 'fullscreen'
          ? 'fixed inset-0 z-9999'
          : 'absolute inset-0 z-10',
        className,
      )}
    >
      <Spinner label={label} />
    </div>
  );
};
