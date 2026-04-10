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

export interface SessionData {
	status: number;
	data: {
		user: {
			id: number;
			display: string;
			email: string;
			has_usable_password: boolean;
			username: string;
		};
		methods: {
			method: string;
			at: number;
			email: string;
		};
	};
	meta: {
		session_token?: string;
		access_token?: string;
		is_authenticated: boolean;
	};
}

export interface ConfigData {
	status: number;
	data: {
		account: {
			login_methods: string[];
			is_open_for_signup: boolean;
			email_verification_by_code_enabled: boolean;
			login_by_code_enabled: boolean;
			password_reset_by_code_enabled: boolean;
			authentication_method: string;
		};
		socialaccount: {
			providers: {
				id: string;
				name: string;
				flows: string[];
			}[];
		};
		usersessions: {
			track_activity: boolean;
		};
	};
}
