<script lang="ts">
	import { TableHandler, Datatable, ThSort, ThFilter, Th } from '@vincjo/datatables';
	import { type CallNumber, type SelectedItems } from '$lib/apis/call-numbers';
	import { Button } from 'flowbite-svelte';

	let {
		items,
		selected = $bindable()
	}: {
		items: CallNumber[];
		selected?: SelectedItems;
	} = $props();

	const table = new TableHandler((() => items)(), { rowsPerPage: 10 });
</script>

<Datatable basic {table}>
	<table>
		<thead>
			<tr>
				<ThSort {table} field="subject">Subject</ThSort>
				<ThSort {table} field="domain">Domain</ThSort>
				<ThSort {table} field="root">Root</ThSort>
				<ThSort {table} field="aspect">Aspect</ThSort>
				<ThSort {table} field="topic">Topic</ThSort>
				<ThSort {table} field="author_pub">Root</ThSort>
				<Th></Th>
			</tr>
			<tr>
				<ThFilter {table} field="subject" />
				<ThFilter {table} field="domain" />
				<ThFilter {table} field="root" />
				<ThFilter {table} field="aspect" />
				<ThFilter {table} field="topic" />
				<ThFilter {table} field="author_pub" />
				<Th></Th>
			</tr>
		</thead>
		<tbody class="cn-items">
			{#each table.rows as row (row.id)}
				<tr class="cn-component-row">
					<!-- <td class="cn-component">
						<div>{row.subject.name}</div>
						<div>{row.subject.number}</div>
					</td> -->
					<td>
						<span>{row.subject.name}</span>
						<span>{row.subject.number}</span>
					</td>
					<td>
						<span>{row.domain.name}</span>
						<span>{row.domain.number}</span>
					</td>
					<td>
						<span>{row.root.name}</span>
						<span>{row.root.number}</span>
					</td>
					<td>
						<span>{row.aspect.name}</span>
						<span>{row.aspect.number}</span>
					</td>
					<td>
						<span>{row.topic.name}</span>
						<span>{row.topic.number}</span>
					</td>
					<td>
						<span>{row.author_pub.name}</span>
						<span>{row.author_pub.number}</span>
					</td>

					<!--
						Select this call number and see articles that use it.
						This is gross, and I hate it as much as you do, but this is what I had to do to
						get it looking good. Overriding classes, inline style rules... ugh.
					-->
					<td style="padding-left: 4px; padding-right: 4px; min-width: fit-content;">
						<Button
							size="xs"
							class="relative -top-px ml-px justify-center rounded-sm px-1.5 py-[.2rem]"
							onclick={() => {
								selected = row;
							}}
						>
							Select
						</Button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</Datatable>

<style lang="scss">
	tr.cn-component-row td > span:last-child {
		float: right;
		// margin-right: 0;
		font-weight: 100;
		font-size: x-small;
		position: relative;
		right: -12px;
	}
</style>
