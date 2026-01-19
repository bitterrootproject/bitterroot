<script lang="ts">
	import { useAuth } from '..';
	import Provider from './Provider.svelte';
	import type { ProviderData } from '..';
	import { page } from '$app/state';
	// import { getConfig } from "$lib/auth/allauth";

	let {
		useIcons = true,
		callbackUrl = '/account/provider/callback',
		urlParam
	}: {
		useIcons?: boolean;
		callbackUrl?: string;
		urlParam?: string;
	} = $props();

	const auth = useAuth();
	let providers: ProviderData[] = auth.config?.data.socialaccount.providers ?? [];

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

{useIcons ? 'using icons' : 'not using icons'}

{#each providers as provider (provider.id)}
	<Provider {provider} callbackUrl={finalCallbackUrl} />
{/each}
