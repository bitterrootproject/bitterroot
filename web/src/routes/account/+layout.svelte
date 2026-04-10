<script lang="ts">
	import '../../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { initAuth } from '@bitterroot/core/auth';

	let { children } = $props();

	onMount(() => {
		const cleanup = initAuth();
		return cleanup;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- The extra `div` is required to make the `:has()` pseudo-class work. -->
<div>
	<div class="auth-form-container">
		{@render children()}
	</div>
</div>

<style>
	.auth-form-container {
		align-self: center;
		justify-self: center;
		/* min-width: 30em; */
		width: 32em;
		height: fit-content;
		margin: auto;
		padding: 2em;
		border: 1.5px solid black;
		border-radius: 8px;
		background-color: white;
	}

	:has(.auth-form-container) {
		width: 100vw;
		height: 100vh;
		margin: 0px;
		display: flex;
		background-color: grey;
	}
</style>
