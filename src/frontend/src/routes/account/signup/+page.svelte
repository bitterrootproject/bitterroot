<script lang="ts">
	import Form from '$lib/auth/components/Form.svelte';
	import type { FormField, FieldData } from '$lib/auth/components/types';
	import type { AuthResponse } from '$lib/auth/types';

	import { signUp } from '$lib/auth/allauth';
	import { useAuth, hasProviders } from '$lib/auth/state.svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import ProviderList from '$lib/auth/components/ProviderList.svelte';

	const auth = useAuth();
	const nextUrl = $derived(page.url.searchParams.get('next') || '/');

	let data: FieldData = $state({
		username: '',
		email: '',
		password1: '',
		password2: ''
	});

	let loading = $state(false);
	let response: AuthResponse = $state({});

	const fields: FormField[] = [
		{
			name: 'username',
			label: 'Username',
			required: true
		},
		{
			name: 'email',
			label: 'Email',
			type: 'email',
			required: true
		},
		{
			name: 'password1',
			label: 'Password',
			type: 'password',
			required: true
		},
		{
			name: 'password2',
			label: 'Password (verify)',
			type: 'password',
			required: true,
			validator: {
				func(fieldData): boolean {
					const pw1 = fieldData['password1'];
					const pw2 = fieldData['password2'];
					return pw1 == pw2;
				},
				invalidText: 'Password does not match.'
			}
		}
	];

	function submit() {
		loading = true;
		response.errors = [];

		signUp({
			username: data.username,
			email: data.email,
			password: data.password1
		})
			.then((resp: AuthResponse) => {
				response = resp;
				if (resp.meta?.is_authenticated) {
					goto(nextUrl);
				}
			})
			.catch((e) => {
				response = e.response
					? e.response.data
					: { errors: [{ message: 'An unexpected error occurred.' }] };
			})
			.then(() => {
				loading = false;
			});
	}
</script>

<Form
	{fields}
	header="Sign up for Bitterroot Web"
	bind:data
	actionButton={{ text: 'Sign up' }}
	{loading}
	errors={response.errors ?? []}
	onsubmit={submit}
	title="Sign up"
>
	Already signed up? <a href="/account/login" class="visited:text-black">Click here</a> to log in.
</Form>

{#if hasProviders()}
	<div class="my-6 flex items-center gap-4">
		<hr class="flex-1 border-neutral-300" />
		<p class="text-sm text-neutral-500">Or sign in with:</p>
		<hr class="flex-1 border-neutral-300" />
	</div>
	<ProviderList />
{/if}
