<script lang="ts">
	import type { CallNumberFieldItems } from '$lib/call_numbers/models';

	let {
		items,
		placeholder = 'Search...',
		height = 200,
		select
	}: {
		items: CallNumberFieldItems[];
		placeholder?: string;
		height?: number;
		select(item: CallNumberFieldItems): void;
	} = $props();

	/** Used to hand the whole selected object over to the modal (parent). */
	const itemsDict = new Map(items.map((obj) => [obj.number, obj]));

	/** Search string. */
	let query = $state('');
	/** Which of the (filtered) items is highlighted, either via the mouse or search bar? This is just the index of the item within the filtered list. */
	let highlightedIndex = $state(-1);
	let listEl: HTMLElement | null = null;
	let filtered: CallNumberFieldItems[] = $derived(
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
	if (listEl && (() => highlightedIndex)() >= 0) {
		const el = document.getElementById(`option-${() => highlightedId}`);

		if (el && typeof el.scrollIntoView === 'function') {
			el.scrollIntoView({ block: 'nearest' });
		}
	}

	let selectedId: string = $state('');
	function choose(item: CallNumberFieldItems) {
		// Allow deselecting an item, if it's already selected.
		if (selectedId == item.number) {
			selectedId = '';
			select(null!);
		} else {
			selectedId = item.number;
			let selectedItem: CallNumberFieldItems | undefined = itemsDict.get(selectedId);
			select(selectedItem!); // Pass the raw undefined, if it's there
		}
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			highlightedIndex = Math.min(highlightedIndex + 1, filtered.length - 1);
			e.preventDefault();
		} else if (e.key === 'ArrowUp') {
			highlightedIndex = Math.max(highlightedIndex - 1, 0);
			e.preventDefault();
		} else if (e.key === 'Enter' && highlightedIndex >= 0) {
			choose(filtered[highlightedIndex]);
		}
	}
</script>

<div class="selection-box">
	<input {placeholder} bind:value={query} onkeydown={onKeydown} aria-label="Search" />

	<ul class="list" role="listbox" bind:this={listEl} style="max-height: {height}px;">
		{#if filtered.length === 0}
			<li class="item">No results</li>
		{:else}
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
		{/if}
	</ul>
</div>

<style>
	.selection-box input {
		width: 100%;
		box-sizing: border-box;
		padding: 0.5rem;
		margin-bottom: 0.25rem;
	}

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
