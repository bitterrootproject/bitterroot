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
	// error_param: string,
}

export interface Provider {
	id: string;
	name: string;
}

export type FieldData = { [fieldName: string]: string };
