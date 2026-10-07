interface ImportMetaEnv {
	readonly VITE_STATE_API_URL: string;
	readonly VITE_TURNSTILE_SITE_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}