import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { useEffect, useRef, type RefObject } from 'react';
import { messengerAccountThunk } from '../model/thunks/messengerAccountThunk';
import { selectMessengerAccount } from '../model/selectors/messegerAccountSelector';

interface MessengerProps {
  containerRef: RefObject<HTMLDivElement | null>;
}

export const Messenger = ({ containerRef }: MessengerProps) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectMessengerAccount);

  const initedRef = useRef(false);

  useEffect(() => {
    if (!account) {
      dispatch(messengerAccountThunk());
    }
  }, [dispatch, account]);

  useEffect(() => {
    if (!account) return;
    if (initedRef.current) return;
    if (!containerRef.current) return;

    const initConverse = async () => {
      try {
        await converse.load();

        converse.plugins.add('converse-locale-ru', {
          initialize() {
            this._converse.api.settings.set({
              locales: ['ru'],
              i18n: 'ru',
            });
          },
        });

        // конфиг можно вынести
        converse.initialize({
          jid: `${account.login}@${account.host}`,
          password: account.password,
          authentication: 'login',
          auto_login: true,
          allow_logout: false,
          view_mode: 'embedded',
          websocket_url: 'wss://blabster.win:30858/ws',

          locales: ['ru'],
          i18n: 'ru',

          allow_adhoc_commands: false,
          allow_bookmarks: false,
          allow_contact_removal: false,
          allow_contact_requests: false,
          allow_registration: false,
          allow_url_history_change: false,
          allow_user_trust_override: 'off',
          auto_reconnect: true,
          auto_join_on_invite: true,
          discover_connection_methods: false,
          domain_placeholder: 'blabster.win',
          keepalive: true,
          locked_domain: 'blabster.win',
          modtools_disable_assign: false,
          show_chat_state_notifications: true,
          show_client_info: false,
          show_controlbox_by_default: false,
          show_self_in_roster: false,
        });
        initedRef.current = true;
      } catch (err) {
        console.error('[Messenger] initConverse failed', err);
        initedRef.current = false;
      }
    };
    initConverse();
  }, [account, containerRef]);


  return (
    <div
      ref={containerRef}
      className="
      messengerShell 
      min-h-0 min-w-0 
      h-full w-full
      border border-accent-primary 
      relative 
      overflow-auto"
    >
      <converse-root className="conversejs"></converse-root>
    </div>
  );
};
