<script lang="ts">
	import { Button, Modal, P } from 'flowbite-svelte';
	import SelectionBox from './SelectionBox.svelte';
	import { type SelectedItems, formatCallNumber } from '$lib/call_numbers/models';

	let {
		select,
		buttonText: button_text
	}: {
		select(selectedItems: SelectedItems): void;
		buttonText: string;
	} = $props();

	let isOpen = $state(false);

	let selected: SelectedItems = $state({
		subject: null,
		domain: null,
		root: null,
		aspect: null,
		topic: null,
		authorPublisher: null
	});

	//{ action, data }: { action: string; data: FormData; }
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
</script>

<!-- placed somewhere in the DOM with a relative position -->
<Button
	onclick={() => {
		isOpen = true;
		selected = {
			// clear out the previous selection
			subject: null,
			domain: null,
			root: null,
			aspect: null,
			topic: null,
			authorPublisher: null
		};
	}}>{button_text}</Button
>

<!-- absolute positioning -->
<Modal title="Filter by call number" form bind:open={isOpen} onaction={actionHandler}>
	<!-- LT/TU 838.1.E2 A469 -->

	<!-- Subject -->
	<SelectionBox
		items={[
			{ name: 'Literature', id: 'LT' },
			{ name: 'Mathematics', id: 'MA' }
		]}
		select={(e) => (selected.subject = e)}
	/>

	<!-- Domain -->
	<SelectionBox
		items={[
			{ name: 'Turkic', id: 'TU' },
			{ name: 'Germanic', id: 'DE' }
		]}
		select={(e) => (selected.domain = e)}
	/>

	<!-- Root -->
	<SelectionBox
		items={[
			{ name: 'Tuvan', id: '838' },
			{ name: 'Turkish', id: '839' }
		]}
		select={(e) => (selected.root = e)}
	/>

	<!-- Aspect -->
	<SelectionBox
		items={[
			{ name: 'General Information', id: '1' }
			// {name: "Mathematics", id: "MA"},
		]}
		select={(e) => (selected.aspect = e)}
	/>

	<!-- Topic -->
	<SelectionBox
		items={[
			{ name: 'Educational Books', id: 'E2' }
			// {name: "Mathematics", id: "MA"},
		]}
		select={(e) => (selected.topic = e)}
	/>

	<!-- Author/Publisher -->
	<SelectionBox
		items={[
			{ name: 'Unknown', id: 'A469' }
			// {name: "Mathematics", id: "MA"},
		]}
		select={(e) => (selected.authorPublisher = e)}
	/>

	{#snippet footer()}
		<Button type="submit" value="decline" color="alternative">Cancel</Button>
		<Button type="submit" value="success">Filter</Button>
		<P align="right" class="ml-auto">{formatCallNumber(selected)}</P>
	{/snippet}
</Modal>
