<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> -->

<script lang="ts">
	// import { Alert } from "flowbite-svelte";
	import CallNumberFilterModal from '$lib/call_numbers/CallNumberFilterModal.svelte';
	import {
		type SelectedItems,
		type CallNumberFieldItems,
		formatCallNumber
	} from '$lib/call_numbers/models';
	import { getSubjects } from '$lib/call_numbers/lib';

	let selected: SelectedItems = $state({
		subject: null,
		domain: null,
		root: null,
		aspect: null,
		topic: null,
		authorPublisher: null
	});

	let callNumber: string = $derived(formatCallNumber(selected));

	function select(selectedItems: SelectedItems) {
		selected = selectedItems;
	}

	// $inspect(selected);
	// $inspect(callNumber);
</script>

<div class="p-8">
	<input placeholder="Call number..." bind:value={callNumber} aria-label="Call number" />

	<CallNumberFilterModal {select} buttonText="Filter" />
</div>

{#await getSubjects() then subjects}
	{#each subjects as s}
		{s.name}, {s.number} <br />
	{/each}
{/await}
