<script lang="ts">
	import { Radio } from 'flowbite-svelte';

	let {
		options,
		chosen = $bindable(),
		name,
		classes,
		id
	}: {
		options: string[];
		chosen: string;
		name?: string;
		classes?: string;
		id?: string;
	} = $props();
</script>

{#each options as opt (opt)}
	<!-- https://flowbite-svelte.com/docs/forms/radio -->
	<Radio {name} class={classes} {id} bind:group={chosen} value={opt}>{opt}</Radio>
{/each}
