<script lang="ts">
	import { Button, Modal, P } from 'flowbite-svelte';
	import {
		type SelectedItems,
		getCnClient,
		formatSelectedFields,
		type CallNumberFieldItem,
		SelectionBox
	} from '..';

	let {
		select
	}: {
		select(selectedItems: SelectedItems): void;
	} = $props();

	let isOpen = $state(false);

	// initialize with default state
	let selected: SelectedItems = $state({});

	let callNumber: string = $state('');

	function actionHandler({ action }: { action: string }) {
		switch (action) {
			case 'success':
				select(selected);
				break;

			case 'decline':
				break;

			default:
				console.error(`Unknown action ${action}`);
				break;
		}
	}

	const cnClient = getCnClient();
</script>

<div class="flex">
	<!-- placed somewhere in the DOM with a relative position -->
	<Button
		onclick={() => {
			isOpen = true;
			// clear out the previous selection
			selected = {};
		}}
		color="light">Filter</Button
	>

	<Button
		onclick={() => {
			select(null!);
			select(selected);
		}}
	>
		Search
	</Button>

	<P>Call Number: {callNumber}</P>
</div>

<!-- absolute positioning -->
<Modal title="Filter by call number" form bind:open={isOpen} onaction={actionHandler}>
	<!-- LT/TU 838.1.E2 A469 -->

	<!-- Subject -->
	{#await cnClient.getSubjects()}
		<SelectionBox label="Subject" />
	{:then available}
		<SelectionBox
			label="Subject"
			items={available}
			select={(e: CallNumberFieldItem) => {
				// Clear all dependent fields
				selected.subject = e;
				selected.domain = undefined;
				selected.root = undefined;
				selected.aspect = undefined;
				selected.topic = undefined;
			}}
		/>
	{/await}

	<!-- Domain -->
	{#if selected.subject}
		{#await cnClient.getDomains(selected.subject.number)}
			<SelectionBox label="Domain" />
		{:then available}
			<SelectionBox
				label="Domain"
				items={available}
				select={(e: CallNumberFieldItem) => {
					// Clear all dependent fields
					selected.domain = e;
					selected.root = undefined;
					selected.aspect = undefined;
					selected.topic = undefined;
				}}
			/>
		{/await}
	{:else}
		<SelectionBox
			label="Domain"
			noItemsPlaceholder="Select a subject to see available domains."
			disabled={true}
		/>
	{/if}

	<!-- Root -->
	{#if selected.domain}
		{#await cnClient.getRoots(selected.domain.number)}
			<SelectionBox label="Root" />
		{:then available}
			<SelectionBox
				label="Root"
				items={available}
				select={(e: CallNumberFieldItem) => {
					// Clear all dependent fields
					selected.root = e;
					selected.aspect = undefined;
					selected.topic = undefined;
				}}
			/>
		{/await}
	{:else}
		<SelectionBox
			label="Root"
			noItemsPlaceholder="Select a domain to see available roots."
			disabled={true}
		/>
	{/if}

	<!-- Aspects -->
	{#if selected.root}
		{#await cnClient.getAspects(selected.root.number)}
			<SelectionBox label="Aspect" />
		{:then available}
			<SelectionBox
				label="Aspect"
				items={available}
				select={(e: CallNumberFieldItem) => {
					// Clear all dependent fields
					selected.aspect = e;
					selected.topic = undefined;
				}}
			/>
		{/await}
	{:else}
		<SelectionBox
			label="Aspect"
			noItemsPlaceholder="Select a root to see available aspects."
			disabled={true}
		/>
	{/if}

	<!-- Topic -->
	{#if selected.aspect}
		{#await cnClient.getTopics(selected.aspect.number)}
			<SelectionBox label="Topic" />
		{:then available}
			<SelectionBox
				label="Topic"
				items={available}
				select={(e: CallNumberFieldItem) => (selected.topic = e)}
			/>
		{/await}
	{:else}
		<SelectionBox
			label="Topic"
			noItemsPlaceholder="Select an aspect to see available topics."
			disabled={true}
		/>
	{/if}

	<!-- Author or Publisher -->
	{#await cnClient.getAuthorsPublishers()}
		<SelectionBox label="Author or Publisher" />
	{:then available}
		<SelectionBox
			label="Author or Publisher"
			items={available}
			select={(e: CallNumberFieldItem) => (selected.author_pub = e)}
		/>
	{/await}

	{#snippet footer()}
		<Button type="submit" value="decline" color="alternative">Cancel</Button>
		<Button
			type="submit"
			value="success"
			onclick={() => (callNumber = formatSelectedFields(selected))}
		>
			Filter & Search
		</Button>
		<P align="right" class="ml-auto">{formatSelectedFields(selected)}</P>
	{/snippet}
</Modal>
