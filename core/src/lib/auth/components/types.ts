/**
 * Form fields to pass to the `Form.svelte` component. Each field must have a unique name,
 * as that is set as the **id** field on each field's underlying `<input />` element. These
 * may need to be a specific name, depending on the API.
 *
 * **Example:** These are the fields used by a login form for Allauth's headless API. It's
 * expecting the fields `email` and `password`.
 * ```ts
 * const fields = {
 * 	email: {
 * 		label: "Email",
 * 		type: "email",
 * 		required: true,
 * 	},
 * 	password: {
 * 		label: "Password",
 * 		type: "password",
 * 		required: true,
 * 	}
 * }
 * ```
 */
// export type FormFields = { [fieldName: string]: FormField };

/** An individual form field. This object is then set as the value of a named **id**\/**name** attribute. See the JDoc for `FormFields` for details. */
export interface FormField {
	/** Field name (computer-readable, unique). This is what's passed to Allauth, so make sure it's set to something it expects. */
	name: string;

	/** Field label (human-readable) */
	label: string;

	/**
	 * Input field type. See this MDN article for all available types:
	 * https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types
	 */
	type?: string;

	/** Placeholder value */
	placeholder?: string;

	/** Is this field required? */
	required?: boolean;

	/** Should this field have the primary (first) focus? */
	primaryFocus?: boolean;

	/** Field validator. */
	validator?: FormFieldValidator;
}

export interface FormFieldValidator {
	/** Validator function. If you need to reference  */
	func(fieldData: FieldData): boolean;

	/** Other fields to use when validating this field. */
	// otherFieldRefs?: string[];

	/** Text to place next to the input field if valid. */
	// validText?: string;

	/** Outline the input field in green if valid? */
	// validOutline?: boolean;

	/** Classes to apply to the input field if valid. */
	// validClass?: string;

	/** Text to place next to the input field if invalid. */
	invalidText: string;

	/** Classes to apply to the input field if invalid. */
	invalidClass?: string;

	/** Outline the input field in red if invalid? */
	invalidOutline?: boolean;
}

export interface ProviderData {
	id: string;
	name: string;
}

export type FieldData = { [fieldName: string]: string };
