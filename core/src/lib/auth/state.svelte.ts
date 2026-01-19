// import { getAuth, getConfig } from '$lib/auth/allauth';

// import type { AuthData, ConfigData } from '$lib/auth/types';

import { getAuth, getConfig, type AuthData, type ConfigData } from '.';

export interface AuthState {
	auth?: AuthData | null;
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
		get isLoading() {
			return authState.isLoading;
		},
		get hasError() {
			return authState.hasError;
		}
	};
}

// Initialize on module load
export function initAuth() {
	// Fetch initial auth state
	getAuth()
		.then((data: AuthData) => {
			authState.auth = data;
			console.log('Authentication status loaded');
		})
		.catch((e) => {
			console.error(e);
			authState.auth = null;
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
