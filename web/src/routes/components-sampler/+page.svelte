<script lang="ts">
	import { Button, Checkbox, Input, Range, Label, Helper, Heading } from 'flowbite-svelte';

	// import RadioGroup from '$lib/components/ui/RadioGroup.svelte';
	import { RadioGroup } from '@bitterroot/core/ui';

	let states: {
		button: boolean;
		checkbox: boolean;
		color: string;
		date: string;
		radio: string;
		range: number;
		text: string;
	} = $state({
		button: false,
		checkbox: false,
		color: '',
		date: '',
		radio: '',
		range: 2,
		text: ''
	});
</script>

<!--

We use Flowbite Svelte for our components.
https://flowbite-svelte.com/docs/components/accordion

-->

<div class="m-4 w-lg">
	<Heading tag="h2" class="mb-8">UI Components Demo</Heading>

	<div class="demo">
		<!-- https://flowbite-svelte.com/docs/components/buttons -->
		<Label>Button</Label>
		<Button onclick={() => (states.button = !states.button)}>Click me!</Button>
		<Helper>Button state: {states.button ? 'clicked!' : 'not clicked yet'}</Helper>
	</div>

	<div class="demo">
		<!-- https://flowbite-svelte.com/docs/components/forms#checkbox -->
		<Label>Checkbox</Label>
		<Checkbox bind:checked={states.checkbox}>Rarg</Checkbox>
		<Helper>Checkbox state: {states.checkbox ? 'checked' : 'not checked'}</Helper>
	</div>

	<div class="demo">
		<Label>Color</Label>
		<Input type="color" bind:value={states.color} />
		<Helper>Chosen color (in hex): {states.color}</Helper>
	</div>

	<div class="demo">
		<Label>Date</Label>
		<Input type="date" bind:value={states.date} />
		<Helper>Cholsen date (ISO format): {states.date}</Helper>
	</div>

	<div class="demo">
		<!-- See $lib/components/ui/RadioGroup.svelte for Flowbite docs -->
		<Label>Radio</Label>
		<RadioGroup options={['Option 1', 'Option 2', 'Option 3']} bind:chosen={states.radio} />
		<Helper>Chosen radio: {states.radio}</Helper>
	</div>

	<div class="demo">
		<!-- https://flowbite-svelte.com/docs/forms/range -->
		<!-- Handle is currently broken. Issue: https://github.com/themesberg/flowbite-svelte/issues/1888 -->
		<Label>Range (from 0 to 10)</Label>
		<Range id="demo-range" bind:value={states.range} />
		<Helper>Chosen range value: {states.range}</Helper>
	</div>

	<div class="demo">
		<!-- https://flowbite-svelte.com/docs/forms/input-field -->
		<Label>Text</Label>
		<Input type="text" bind:value={states.text} />
		<Helper>Input text: {states.text}</Helper>
	</div>
</div>

<style>
	.demo {
		margin-bottom: 1em;
	}
</style>
