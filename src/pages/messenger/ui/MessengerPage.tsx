import { useRef } from 'react';
import { useMessengerLoadState } from '../lib/useMessengerLoadState';
import { Messenger } from '@/features/messenger';
import { ScreenLoader } from '@/shared/ui/screen-loader';

export const MessengerPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { loadState } = useMessengerLoadState({
    ref: containerRef,
    selector: 'converse-spinner',
  });

  return (
    <section
      className="
      w-full
      min-h-[calc(100dvh-var(--height-navbar))]
      overflow-hidden
      flex"
    >
      <div className="relative flex-1 min-w-0">
        <Messenger containerRef={containerRef} />
        {loadState !== 'ready' && (
          <div className="absolute inset-0 grid place-items-center bg-bg-default/70">
            <ScreenLoader isOpen={true} label="Загрузка чата..." />
          </div>
        )}
      </div>
    </section>
  );
};
