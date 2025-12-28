import type { Provider } from './components/types';

// TODO: Actually figure out what these are
export type AuthData = { [x: string]: any } & { __brand: 'AuthData' };
export type ConfigData = { [x: string]: any } & { __brand: 'ConfigData' };

export interface RealConfigData {
	socialaccount: {
		providers: Provider[];
	};
}

// Any snake_case values likely come directly from Allauth.
export interface AuthResponse {
	meta?: {
		is_authenticated: boolean;
	};
	status?: number;
	errors?: {
		message: string;
	}[];
}
