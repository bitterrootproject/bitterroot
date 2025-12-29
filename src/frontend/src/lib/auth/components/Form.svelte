<script lang="ts">
	// import FormErrors from "./FormErrors.svelte";
	// import Input from "./Input.svelte";
	import type { FormField, FieldData } from './types';
	import { Input, Label, Button, Spinner, Alert, Helper } from 'flowbite-svelte';
	import { Info } from '@lucide/svelte';
	import { validate as isValidEmail } from 'email-validator';
	import parsePhoneNumber from 'libphonenumber-js';
	import { type Snippet } from 'svelte';
	import { clampString } from '$lib/utils';

	/** Contains whether each field is valid, and the error text and class(es) to apply to said field. */
	let fieldStatus: {
		[fieldName: string]: {
			isValid?: boolean;
			class?: string;
			text?: string;
		};
	} = $state({});

	let {
		header,
		fields,
		data = $bindable({}),
		actionButton = {
			text: 'Submit',
			class: ''
		},
		errors,
		loading = false,
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
		loading?: boolean;
		onsubmit(): void;
		title: string;
		children?: Snippet;
	} = $props();

	async function artificialDelay() {
		loading = true;
		await new Promise((resolve) => setTimeout(resolve, 1000));
		loading = false;
	}

	/** Get the specified form field, printing an error to the console if it's not found. */
	function getFormField(fieldName: string): FormField | undefined {
		const f = fields.find((field) => field.name == fieldName);
		if (!f) {
			console.error(`Field with name "${fieldName}" not found.`);
		}
		return f;
	}

	/** Does this field have error text? */
	function fieldHasErrorText(fieldName: string): boolean {
		return (
			fieldStatus[fieldName] &&
			!fieldStatus[fieldName].isValid &&
			fieldStatus[fieldName].text != undefined
		);
	}

	/** Validate the specified field. */
	function validateField(fieldName: string): boolean {
		// It's safe to use `!` here, as we can safely assume that field exists.
		const f = getFormField(fieldName)!;
		const d = data[fieldName] || '';

		fieldStatus[fieldName] = {
			isValid: undefined,
			class: undefined,
			text: undefined
		};

		if (f.required && d.trim() === '') {
			fieldStatus[fieldName].isValid = false;
			fieldStatus[fieldName].text = 'This field is required.';
			return false;
		}

		// Do some basic checking based on input type
		// email
		if (
			f.type == 'email' &&
			d.split('@')[1] != 'localhost' && // Emails ending in localhost (like "admin@localhost") are allowed.
			!isValidEmail(d)
		) {
			fieldStatus[fieldName].isValid = false;
			fieldStatus[fieldName].text = `"${clampString(d)}" is not a valid email address.`;
			return false;
		}
		// phone
		else if (f.type == 'phone' && !parsePhoneNumber(d)?.isValid()) {
			fieldStatus[fieldName].isValid = false;
			fieldStatus[fieldName].text = `"${clampString(d)}" is not a valid phone number.`;
			return false;
		}

		// If the field has its own validator, run it.
		if (f.validator) {
			const fv = f.validator!;

			if (!fv.func(data)) {
				fieldStatus[fieldName] = {
					isValid: false,
					class: fv.invalidClass,
					text: fv.invalidText
				};

				return false;
			}
		}

		// Clear error if valid
		// delete fieldStatus[fieldName];
		fieldStatus[fieldName].isValid = true;
		return true;
	}

	/** Validate the whole form. */
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
		// console.log(`Set loading to ${loading}`)
		// artificialDelay();
		// console.log(`Set loading to ${loading}`)
		if (validateForm()) {
			onsubmit();
		}
	}
</script>

<!-- Page's title in the <head> element. -->
<svelte:head>
	<title>{title} | Bitterroot Web Library</title>
</svelte:head>

<h1 class="mb-10 text-2xl">{header}</h1>

<!-- If the parent element put anything (like arbitrary text fields) in the slot, render it. -->
{#if children}
	{@render children()}
{/if}

<!-- The actual form -->
<form class="mt-5" autocomplete="off" method="POST" onsubmit={handleSubmit}>
	<div class="mb-3 flex flex-col space-y-2">
		{#each fields as field (field.name)}
			<div>
				<!-- Label for input field -->
				<div class="mb-1 flex">
					<Label for={field.name} class="">
						{field.label}
					</Label>
					<!-- Display a pretty red asterisk if the field is required. -->
					{#if field.required}
						<span class="text-sm text-red-700">&nbsp;*</span>
					{/if}

					<!-- Validation message for this field (if present) -->
					{#if fieldHasErrorText(field.name)}
						<Helper class="mr-0 ml-auto self-end" color="red">
							{fieldStatus[field.name].text}
						</Helper>
					{/if}
				</div>

				<!--
					The input field itself
					Set the field's color to red if invalid and the validator says so (or doesn't have that setting set).
					Also, prevent Prettier from formatting this. Its attempts to do so just make it unreadable.
				-->
				<!-- prettier-ignore -->
				<Input
					id={field.name}
					type={field.type ?? 'text'}
					placeholder={field.placeholder ?? ' '}
					required={field.required}
					bind:value={data[field.name]}
					oninput={() => validateField(field.name)}
					color={
						(field.validator?.invalidOutline ?? true)
							&& fieldStatus[field.name]
							&& !fieldStatus[field.name].isValid
						? 'red'
						: undefined
					}
					class="mb-2"
				/>
			</div>
		{/each}
	</div>

	<!-- Display any errors returned by the server. -->
	<div class="my-4">
		{#if errors.length == 1}
			<!-- If there's only one error, just display it without any additional formatting. -->
			<Alert class="flex pb-4">
				<Info />
				{errors[0].message}
			</Alert>
		{:else if errors.length > 1}
			<!-- If there's more than one error, display them in an unordered list. -->
			<Alert class="flex pb-4">
				<Info />
				<ul>
					{#each errors as err (err)}
						<li>{err.message}</li>
					{/each}
				</ul>
			</Alert>
		{/if}
	</div>

	<Button
		class={actionButton.class}
		disabled={loading}
		{loading}
		type="submit"
		onclick={handleSubmit}
	>
		<!-- {#if loading}
			<Spinner size="4" />
		{/if} -->
		{actionButton.text}
	</Button>
</form>
