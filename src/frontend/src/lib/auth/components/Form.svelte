<script lang="ts">
	// import FormErrors from "./FormErrors.svelte";
	// import Input from "./Input.svelte";
	import type { FormField, FieldData } from './types';
	import { Input, Label, Button, Spinner, Alert } from 'flowbite-svelte';
	import { Info } from '@lucide/svelte';
	import { validate as isValidEmail } from 'email-validator';
	import parsePhoneNumber from 'libphonenumber-js';
	import type { Snippet } from 'svelte';

	let loading = $state(false);

	async function artificialDelay() {
		loading = true;
		await new Promise((resolve) => setTimeout(resolve, 2000));
		loading = false;
	}

	let {
		header,
		fields,
		data = $bindable({}),
		actionButton = {
			text: 'Submit',
			class: ''
		},
		errors,
		fieldErrors = $bindable({}),
		// action_button_text,
		// action_button_class = 'btn-primary px-8 mt-4 btn-block',
		fetching = false,
		onsubmit,
		title,
		children
	}: {
		header: string;
		fields: FormField[];
		data: FieldData;
		actionButton?: {
			text: string;
			class?: string;
		};
		errors: { message: string }[];
		fieldErrors?: FieldData;
		fetching?: boolean;
		onsubmit(): void;
		title: string;
		children?: Snippet;
	} = $props();

	// if (!fieldErrors) {
	// 	fieldErrors = $state<{ [fieldName: string]: string }>({});
	// }

	function validateField(name: string): boolean {
		// It's safe to use `!` here, as we can safely assume that field exists.
		const f = fields.find((field) => field.name == name)!;
		const d = data[f.name] || '';

		if (f.required && d.trim() === '') {
			fieldErrors[name] = 'This field is required';
			return false;
		}

		if (
			f.type == 'email' &&
			d.split('@')[1] != 'localhost' && // Emails ending in localhost (like "admin@localhost") are allowed.
			!isValidEmail(d)
		) {
			fieldErrors[name] = `"${d}" is not a valid email address.`;
			return false;
		} else if (f.type == 'phone' && !parsePhoneNumber(d)?.isValid()) {
			fieldErrors[name] = `"${d}" is not a valid phone number.`;
			return false;
		}

		// Clear error if valid
		delete fieldErrors[name];
		return true;
	}

	function validateForm(): boolean {
		let isValid = true;
		fields.forEach((field) => {
			if (!validateField(field.name)) {
				isValid = false;
			}
		});
		return isValid;
	}

	function handleSubmit() {
		if (validateForm()) {
			artificialDelay();
			onsubmit();
		}
	}
</script>

<svelte:head>
	<title>{title} | Bitterroot Web Library</title>
</svelte:head>

<h1 class="mb-10 text-2xl">{header}</h1>

{#if children}
	{@render children()}
{/if}

<form class="mt-5">
	<div class="fancy-form mb-3 flex flex-col space-y-2">
		{#each fields as field (field.name)}
			<div class="fancy-form-field">
				<!-- Label for input field -->
				<div class="inline-flex">
					<Label for={field.name} class="mb-2">
						{field.label}
					</Label>
					{#if field.required}
						<span class="text-sm text-red-700">&nbsp;*</span>
					{/if}
				</div>
				<!-- The input field itself -->
				<Input
					id={field.name}
					type={field.type ?? 'text'}
					placeholder={field.placeholder ?? ' '}
					required={field.required}
					bind:value={data[field.name]}
					onblur={() => validateField(field.name)}
				/>
				<!-- Error for this field (if present) -->
				{#if fieldErrors[field.name]}
					<p class="mt-1 text-sm text-red-600">{fieldErrors[field.name]}</p>
				{/if}
			</div>
		{/each}
	</div>

	<!-- Display any errors returned by the server. -->
	<div class="my-4">
		{#each errors as err (err)}
			<Alert class="flex pb-4">
				<!-- <InfoCircleOutline class="shrink-0 h-6 w-6" /> -->
				<Info />
				{err.message}
			</Alert>
		{/each}
	</div>

	<Button class={actionButton.class} disabled={fetching} onclick={handleSubmit} {loading}>
		<!-- {#if fetching}
			<Spinner size=4 />
		{/if} -->
		{actionButton.text}
	</Button>
</form>

<style>
	:global(input) {
		&:invalid:not(:placeholder-shown) {
			outline: 2px solid transparent;
			outline-color: var(--color-red-700);
			outline-offset: -1px;
		}
	}
</style>
