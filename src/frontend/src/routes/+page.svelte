<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> -->

<script lang="ts">
	// import  * as CnComponents from '$lib/components/callNumbers';
	import { CallNumberDataTable } from '$lib/components/call-numbers';
	import { getCallNumbers, type SelectedItems, formatCallNumber } from '$lib/apis/call-numbers';
	import { Spinner } from 'flowbite-svelte';

	let selectedCallNumber: SelectedItems | undefined = $state();
</script>

<div class="p-8">
	{#await getCallNumbers()}
		<CallNumberDataTable items={[]} />
		<div class="my-4 flex items-center justify-center">
			<span class="pr-3 font-bold">Loading items...</span>
			<Spinner />
		</div>
	{:then callNumbers}
		<CallNumberDataTable items={callNumbers} bind:selected={selectedCallNumber} />
	{/await}

	{#if selectedCallNumber != null}
		{formatCallNumber(selectedCallNumber)}
	{/if}
</div>
