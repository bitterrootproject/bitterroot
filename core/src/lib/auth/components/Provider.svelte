<script lang="ts">
	import { redirectToProvider } from '../allauth';
	import type { ProviderData } from './types';
	import { Button } from 'flowbite-svelte';
	import type { FlowbiteColor } from '../../ui';

	let {
		provider,
		callbackUrl = '/account/provider/callback',
		useIcons = true,
		useBrandColors = true,
		color = 'alternative',
		icon
	}: {
		provider: ProviderData;
		callbackUrl: string;
		useIcons?: boolean;
		useBrandColors?: boolean;
		color?: FlowbiteColor;
		icon?: string;
	} = $props();
</script>

<!-- These are just placeholders to consume their values to make the linter shut up. -->
{useIcons ? 'using icons' : 'not using icons'}
{useBrandColors ? 'using brand colors' : 'not using brand colors'}
icon name: {icon}

<Button {color} onclick={() => redirectToProvider(provider.id, callbackUrl)}>
	{provider.name}
</Button>
