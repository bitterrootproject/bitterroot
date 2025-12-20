<script lang="ts">
	import type { CallNumber } from './models';

	let {
		items
	}: {
		items: CallNumber[];
	} = $props();

	// Holds table sort state.  Initialized to reflect table sorted by id column ascending.
	let sortBy = $state({ col: 'id', ascending: true });

	function sort(field: string) {
		if (sortBy.col == field) {
			sortBy.ascending = !sortBy.ascending;
		} else {
			sortBy.col = field;
			sortBy.ascending = true;
		}

		// Modifier to sorting function for ascending or descending
		let sortModifier = sortBy.ascending ? 1 : -1;

		const compare = (a: CallNumber, b: CallNumber) => {
			if (a[field] < b[field]) {
				return -1 * sortModifier;
			} else if (a[field] > b[field]) {
				return 1 * sortModifier;
			} else {
				return 0;
			}
		};

		items = items.sort(compare);
	}
</script>

<table>
	<thead>
		<tr>
			<td onclick={() => sort('formatted')}>BCS No.</td>
		</tr>
		<tr>
			<td onclick={() => sort('subject')}>Subject</td>
		</tr>
		<tr>
			<td onclick={() => sort('domain')}>Domain</td>
		</tr>
		<tr>
			<td onclick={() => sort('root')}>Root</td>
		</tr>
		<tr>
			<td onclick={() => sort('aspect')}>Aspect</td>
		</tr>
		<tr>
			<td onclick={() => sort('topic')}>Topic</td>
		</tr>
		<tr>
			<td onclick={() => sort('authorPublisher')}>Author or Publisher</td>
		</tr>
		<!-- <tr>
			<td>DB ID</td>
		</tr> -->
	</thead>

	<tbody>
		{#each items as row (row.id)}
			<tr>
				<td>{row.formatted}</td>
			</tr>
			<tr>
				<td>{row.subject.name}</td>
			</tr>
			<tr>
				<td>{row.domain.name}</td>
			</tr>
			<tr>
				<td>{row.root.name}</td>
			</tr>
			<tr>
				<td>{row.aspect.name}</td>
			</tr>
			<tr>
				<td>{row.topic.name}</td>
			</tr>
			<tr>
				<td>{row.authorPublisher.name}</td>
			</tr>
		{/each}
	</tbody>
</table>
