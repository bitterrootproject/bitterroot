<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> -->

<script lang="ts">
	import { CallNumberDataTable, type CallNumber } from '@bitterroot/core/call-numbers';
	import { CnClient } from '$lib/apis/cn';
	// import { getCallNumbers, type CallNumber } from '$lib/apis/call-numbers';
	import { Spinner } from 'flowbite-svelte';

	let selectedCallNumber: CallNumber | undefined = $state();

	const cnClient = new CnClient();
</script>

<div class="p-8">
	{#await cnClient.getCallNumbers()}
		<CallNumberDataTable items={[]} />
		<div class="my-4 flex items-center justify-center">
			<span class="pr-3 font-bold">Loading items...</span>
			<Spinner />
		</div>
	{:then callNumbers}
		<CallNumberDataTable items={callNumbers} bind:selected={selectedCallNumber} />
	{/await}

	<!-- Display the nicely formatted call number -->
	{#if selectedCallNumber != null}
		{selectedCallNumber.formatted}
	{/if}
</div>
