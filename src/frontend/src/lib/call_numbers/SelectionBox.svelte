<script lang="ts">
	import type { CallNumberFieldItem } from '$lib/call_numbers/models';
	import { Label, Input } from 'flowbite-svelte';

	let {
		items = [],
		noItemsPlaceholder = 'No items found.',
		height = 200,
		select = () => null,
		label,
		disabled = false
	}: {
		items?: CallNumberFieldItem[];
		noItemsPlaceholder?: string;
		height?: number;
		select?(item: CallNumberFieldItem): void;
		label: string;
		disabled?: boolean;
	} = $props();

	/** Used to hand the whole selected object over to the modal (parent). */
	const itemsDict = new Map(items.map((obj) => [obj.number, obj]));

	/** Search string. */
	let query = $state('');
	/** Which of the (filtered) items is highlighted, either via the mouse or search bar? This is just the index of the item within the filtered list. */
	let highlightedIndex = $state(-1);
	let listEl: HTMLElement | null = $state(null);
	let filtered: CallNumberFieldItem[] = $derived(
		query ? items.filter((i) => (i.name ?? '').toLowerCase().includes(query.toLowerCase())) : items
	);

	let highlightedId: string | null = $derived(
		highlightedIndex >= 0 && filtered[highlightedIndex] ? filtered[highlightedIndex].number : null
	);

	// keep highlighted in bounds
	if ((() => highlightedIndex)() >= (() => filtered).length) {
		highlightedIndex = (() => filtered).length - 1;
	}
	if ((() => highlightedIndex)() < -1) {
		highlightedIndex = -1;
	}

	// scroll the highlighted item into view (non-virtualized)
	if ((() => listEl)() && (() => highlightedIndex)() >= 0) {
		const el = document.getElementById(`option-${() => highlightedId}`);

		if (el && typeof el.scrollIntoView === 'function') {
			el.scrollIntoView({ block: 'nearest' });
		}
	}

	let selectedId: string = $state('');
	let selectedItem: CallNumberFieldItem | undefined = $derived(itemsDict.get(selectedId));
	function choose(item: CallNumberFieldItem) {
		// Allow deselecting an item, if it's already selected.
		if (selectedId == item.number) {
			selectedId = '';
			select(null!);
		} else {
			selectedId = item.number;
			// Pass the raw `undefined`, if it's there
			select(selectedItem!);
		}
	}

	let placeholder = $derived(
		!selectedItem ? `Search for ${label.toLowerCase()}...` : selectedItem!.name
	);
</script>

<div class="selection-box">
	<Label for="selectionBoxSearchBar" class="mb-0 block">{label}</Label>
	<Input id="selectionBoxSearchBar" size="lg" {placeholder} bind:value={query} {disabled} />

	<!-- <input {placeholder} bind:value={query} onkeydown={onKeydown} aria-label="Search" /> -->

	{#if filtered.length > 0}
		<ul class="list" role="listbox" bind:this={listEl} style="max-height: {height}px;">
			{#each filtered as item, idx (item.number)}
				<li
					role="option"
					aria-selected={item.number === highlightedId}
					id={`option-${item.number}`}
					class="item {item.number === highlightedId ? 'highlighted' : ''} {item.number ===
					selectedId
						? 'selected'
						: ''} "
					tabindex="0"
					onclick={() => choose(item)}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							choose(item);
						}
					}}
					onmouseenter={() => (highlightedIndex = idx)}
					onmouseleave={() => (highlightedIndex = -1)}
				>
					{item.number}: {item.name}
				</li>
			{/each}
		</ul>
	{:else if filtered.length == 0 && !disabled}
		<p>{noItemsPlaceholder}</p>
		<!-- <ul class="list" role="listbox" style="max-height: {height}px;">
		</ul> -->
	{/if}
</div>

<style>
	/*.selection-box input {
		width: 100%;
		box-sizing: border-box;
		padding: 0.5rem;
		margin-bottom: 0.25rem;
	}*/

	.list {
		overflow: auto;
		padding: 0;
		margin: 0;
		list-style: none;
		border: 1px solid #e5e7eb;
		border-radius: 4px;
	}

	.item {
		padding: 0.5rem;
		cursor: pointer;
	}

	/* .item:hover, */
	.item.highlighted {
		background: #f1f1f1;
	}

	.item.selected {
		background: #d4d4d4;
	}
</style>
