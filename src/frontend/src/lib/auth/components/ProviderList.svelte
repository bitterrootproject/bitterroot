<script lang="ts">
	import { useAuth } from '$lib/auth/state.svelte';
	import Provider from './Provider.svelte';
	import type { Provider as T_Provider } from '$lib/auth/components/types';
	import { page } from '$app/state';
	// import { getConfig } from "$lib/auth/allauth";

	let {
		useIcons = true,
		callbackUrl = '/accounts/provider/callback',
		urlParam
	}: {
		useIcons?: boolean;
		callbackUrl?: string;
		urlParam?: string;
	} = $props();

	const auth = useAuth();
	let providers: T_Provider[] = auth.config?.data.socialaccount.providers ?? [];

	let finalCallbackUrl = $derived.by(() => {
		if (urlParam) {
			const url = new URL(callbackUrl, page.url.origin);

			url.searchParams.set(urlParam, page.url.searchParams.get(urlParam) || '');

			// Return only the path and query.
			return url.pathname + url.search;
		} else {
			return callbackUrl;
		}
	});
</script>

{#each providers as provider (provider.id)}
	<Provider {provider} callbackUrl={finalCallbackUrl} />
{/each}
