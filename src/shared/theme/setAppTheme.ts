import type { Theme } from "./types";


export const setAppTheme = (theme: Theme) => {
	const root = document.documentElement;

	root.setAttribute('data-theme', theme)
}