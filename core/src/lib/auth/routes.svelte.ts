import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { Flows, AuthenticatorType } from '$lib/auth/allauth';
import type { AuthData } from '$lib/auth/types';

export const URLs = Object.freeze({
	LOGIN_URL: '/account/login',
	LOGIN_REDIRECT_URL: '/calculator',
	LOGOUT_REDIRECT_URL: '/'
});

const flow2path: { [flowName: string]: string } = Object.freeze({
	[Flows.LOGIN]: '/account/login',
	[Flows.LOGIN_BY_CODE]: '/account/login/code/confirm',
	[Flows.SIGNUP]: '/account/signup',
	[Flows.VERIFY_EMAIL]: '/account/verify-email',
	[Flows.PASSWORD_RESET_BY_CODE]: '/account/password/reset/confirm',
	[Flows.PROVIDER_SIGNUP]: '/account/provider/signup',
	[Flows.REAUTHENTICATE]: '/account/reauthenticate',
	[Flows.MFA_TRUST]: '/account/2fa/trust',
	[`${Flows.MFA_AUTHENTICATE}:${AuthenticatorType.TOTP}`]: '/account/authenticate/totp',
	[`${Flows.MFA_AUTHENTICATE}:${AuthenticatorType.RECOVERY_CODES}`]:
		'/account/authenticate/recovery-codes',
	[`${Flows.MFA_AUTHENTICATE}:${AuthenticatorType.WEBAUTHN}`]: '/account/authenticate/webauthn',
	[`${Flows.MFA_REAUTHENTICATE}:${AuthenticatorType.TOTP}`]: '/account/reauthenticate/totp',
	[`${Flows.MFA_REAUTHENTICATE}:${AuthenticatorType.RECOVERY_CODES}`]:
		'/account/reauthenticate/recovery-codes',
	[`${Flows.MFA_REAUTHENTICATE}:${AuthenticatorType.WEBAUTHN}`]: '/account/reauthenticate/webauthn',
	[Flows.MFA_WEBAUTHN_SIGNUP]: '/account/signup/passkey/create'
});

interface Flow {
	id: string;
	types: string[];
	is_pending: boolean;
}

export function pathForFlow(flow: Flow, authenticatorType?: string) {
	let key = flow.id;
	if (flow.types) {
		authenticatorType = authenticatorType ?? flow.types[0];
		key = `${key}:${authenticatorType}`;
	}
	const path = flow2path[key] ?? flow2path[flow.id];
	if (!path) {
		throw new Error(`Unknown path for flow: ${flow.id}`);
	}
	return path;
}

export function pathForPendingFlow(auth: AuthData) {
	const flows: Flow[] = auth.data.flows;
	const flow = flows.find((flow) => flow.is_pending);
	if (flow) {
		return pathForFlow(flow);
	}
	return null;
}

export function navigateToPendingFlow(auth: AuthData) {
	const path = pathForPendingFlow(auth);
	if (path) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		goto(resolve(path as any), { replaceState: false });
	}
}
