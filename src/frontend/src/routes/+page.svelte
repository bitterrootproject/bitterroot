<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> -->

<script lang="ts">
	import CallNumberFilterModal from '$lib/call_numbers/CallNumberFilterModal.svelte';
	import {
		// type CallNumber,
		type SelectedItems
		// stringifyCallNumberFields
	} from '$lib/call_numbers/models';
	import { getCallNumbers } from '$lib/call_numbers/lib';
	import CallNumberDataTable from '$lib/call_numbers/CallNumberDataTable.svelte';
	// import { Table, type DataTableOptions } from "@flowbite-svelte-plugins/datatable";
	// import { P, Heading, Input } from "flowbite-svelte";

	let querySelected: SelectedItems = $state({
		subject: null,
		domain: null,
		root: null,
		aspect: null,
		topic: null,
		authorPublisher: null
	});

	function select(selectedItems: SelectedItems) {
		querySelected = selectedItems;
	}
</script>

<div class="p-8">
	<CallNumberFilterModal {select} />
	{#await getCallNumbers(querySelected)}
		loading items...
	{:then callNumbers}
		<!-- <ul> -->
		<!-- Svelte demands the use of a "key" in `each` blocks: https://sveltejs.github.io/eslint-plugin-svelte/rules/require-each-key/ -->
		<!-- {#each callNumbers as cn (cn.id)}
				<li>
					{cn.id}
					{cn.subject.name}
					{cn.domain.name}
					{cn.root.name}
					{cn.aspect.name}
					{cn.topic.name}
					{cn.authorPublisher.name}
				</li>
				<br />
			{/each}
		</ul> -->

		<!-- {callNumbers} -->

		<CallNumberDataTable items={callNumbers} />
	{/await}
</div>
