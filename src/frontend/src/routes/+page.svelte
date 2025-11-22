<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> -->

<script lang="ts">
	import CallNumberFilterModal from '$lib/call_numbers/CallNumberFilterModal.svelte';
	import { type SelectedItems } from '$lib/call_numbers/models';
	import { getCallNumbers } from '$lib/call_numbers/lib';

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

	function noQuery() {
		return (
			querySelected.subject == null &&
			querySelected.domain == null &&
			querySelected.root == null &&
			querySelected.aspect == null &&
			querySelected.topic == null &&
			querySelected.authorPublisher == null
		);
	}

	// $inspect(selected);
	// $inspect(callNumber);
	// $inspect(querySelected);
</script>

<div class="p-8">
	<CallNumberFilterModal {select} />

	{#if !noQuery()}
		{#await getCallNumbers(querySelected)}
			loading items...
		{:then callNumbers}
			<ul>
				<!-- Svelte demands the use of a "key" in `each` blocks: https://sveltejs.github.io/eslint-plugin-svelte/rules/require-each-key/ -->
				{#each callNumbers as cn (cn)}
					{#await cn then cn}
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
					{/await}
				{/each}
			</ul>
		{/await}
	{/if}
</div>
