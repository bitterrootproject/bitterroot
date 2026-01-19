<script lang="ts">
	import { page } from '$app/state';
	import { invalidateAll } from '$app/navigation';
	import { resolve } from '$app/paths';

	import {
		Form,
		type FormField,
		type AuthResponse,
		login,
		// useAuth,
		hasProviders,
		ProviderList
	} from '@bitterroot/core/auth';

	const fields: FormField[] = [
		{
			name: 'email',
			label: 'Email',
			type: 'email',
			required: true,
			primaryFocus: true
		},
		{
			name: 'password',
			label: 'Password',
			type: 'password',
			required: true
		}
	];

	// const auth = useAuth();

	const nextUrl = $derived(page.url.searchParams.get('next') || '/');

	let data = $state({
		email: '',
		password: ''
	});

	let loading = $state(false);
	let response: AuthResponse = $state({});

	function submit() {
		loading = true;
		response.errors = [];

		login({
			email: data.email,
			password: data.password
		})
			.then((content: AuthResponse) => {
				// If login is successful, redirect to the next page or home page
				if (content.meta?.is_authenticated) {
					// Get next query parameter from URL. if the domain is same then redirect. otherwise redirect to home page.

					invalidateAll();

					window.location.href = nextUrl;
					// goto(nextUrl, { invalidateAll: true });
				} else if (content.status === 409) {
					console.log('Login conflict, user already logged in');
					// Handle case where user is already logged in
					// You might want to redirect them or show a message
					content.errors = [{ message: 'You are already logged in. Please log out first.' }];
				} else {
					// Handle case where login was not successful
					console.error('Login failed');
				}

				response = content;
			})
			.catch((e) => {
				// console.log(e);
				response = e.response
					? e.response.data
					: {
							errors: [{ message: 'An unexpected error occurred.' }]
						};
			})
			.then(() => {
				loading = false;
			});
	}
</script>

<Form
	{fields}
	header="Login to Bitterroot Web"
	bind:data
	actionButton={{
		text: 'Login'
	}}
	{loading}
	errors={response.errors ?? []}
	onsubmit={submit}
	title="Login"
>
	New here? <a href={resolve('/account/signup')} class="visited:text-black">Click here</a> to sign up.
</Form>

{#if hasProviders()}
	<div class="my-6 flex items-center gap-4">
		<hr class="flex-1 border-neutral-300" />
		<p class="text-sm text-neutral-500">Or sign in with:</p>
		<hr class="flex-1 border-neutral-300" />
	</div>
	<ProviderList />
{/if}
