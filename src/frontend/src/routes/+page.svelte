<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> -->

<script lang="ts">
	// import  * as CnComponents from '$lib/components/callNumbers';
	import { CallNumberDataTable, CallNumberFilterModal } from '$lib/components/call-numbers';
	import { type SelectedItems, getCallNumbers } from '$lib/apis/call-numbers';

	let querySelected: SelectedItems = $state({
		subject: null,
		domain: null,
		root: null,
		aspect: null,
		topic: null,
		author_pub: null
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
					{cn.author_pub.name}
				</li>
				<br />
			{/each}
		</ul> -->

		<!-- {callNumbers} -->

		<CallNumberDataTable items={callNumbers} />
	{/await}
</div>
