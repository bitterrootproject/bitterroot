<script lang="ts">
	import '../../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { initAuth, useAuth, logout } from '@bitterroot/core/auth';
	import { Navbar, NavBrand, NavUl, NavLi } from 'flowbite-svelte';

	let { children } = $props();

	onMount(() => {
		const cleanup = initAuth();
		return cleanup;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar>
	<NavBrand href="/">Bitterroot Web Library</NavBrand>
	<NavUl>
		{#if useAuth().isAuthenticated}
			<NavLi onclick={logout}>Logout</NavLi>
		{:else}
			<NavLi href="/account/login">Login</NavLi>
		{/if}
	</NavUl>
</Navbar>

{@render children()}
