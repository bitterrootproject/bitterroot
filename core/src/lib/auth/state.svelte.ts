// import { getAuth, getConfig } from '$lib/auth/allauth';

// import type { SessionData, ConfigData } from '$lib/auth/types';

import { getAuth, getConfig, type SessionData, type ConfigData } from '.';

export interface AuthState {
	auth?: SessionData | null;
	config?: ConfigData | null;
	isLoading: boolean;
	hasError: boolean;
}

const authState = $state<AuthState>({
	// auth: undefined,
	// config: undefined,
	isLoading: true,
	hasError: false
});

export function useAuth() {
	return {
		get auth() {
			return authState.auth;
		},
		get config() {
			return authState.config;
		},
		get isLoading(): boolean {
			return authState.isLoading;
		},
		get hasError(): boolean {
			return authState.hasError;
		},
		get isAuthenticated() {
			if (!authState.auth) {
				return false;
			} else {
				return authState.auth.meta.is_authenticated;
			}
		}
	};
}

// Initialize on module load
export function initAuth() {
	// Fetch initial auth state
	getAuth()
		.then((data: SessionData) => {
			authState.auth = data;
			console.log('Authentication status loaded');
		})
		.catch((e) => {
			console.error(e);
			authState.auth = undefined;
			authState.hasError = true;
		});

	// Fetch config
	getConfig()
		.then((config?: ConfigData) => {
			authState.config = config;
			authState.isLoading = config?.status !== 200;
		})
		.catch((e) => {
			console.error(e);
		});

	// Listen for auth changes
	function onAuthChanged(e: CustomEvent) {
		console.log('Authentication status updated');
		authState.auth = e.detail;
		// if (authState.isAuthenticated)
		// authState.isAuthenticated = e.detail.data.meta.is_authenticated
	}

	document.addEventListener('allauth.auth.change', onAuthChanged as EventListener);

	// Return cleanup function
	return () => {
		document.removeEventListener('allauth.auth.change', onAuthChanged as EventListener);
	};
}

export function hasProviders(): boolean {
	const auth = useAuth();
	if (!auth.config || !auth.config.data || !auth.config.data.socialaccount) {
		return false;
	}

	return auth.config.data?.socialaccount?.providers?.length > 0;
}
