<script lang="ts">
	import { redirectToProvider } from '../allauth';
	import type { Provider } from './types';
	import { Button } from 'flowbite-svelte';
	import type { FlowbiteColor } from '$lib/types';

	let {
		provider,
		callbackUrl = '/account/provider/callback',
		useIcons = true,
		useBrandColors = true,
		color = 'alternative',
		icon
	}: {
		provider: Provider;
		callbackUrl: string;
		useIcons?: boolean;
		useBrandColors?: boolean;
		color?: FlowbiteColor;
		icon?: string;
	} = $props();
</script>

<Button {color} onclick={() => redirectToProvider(provider.id, callbackUrl)}>
	{provider.name}
</Button>
