/** Clamp the string to the specified (or default) maximum length. `maxLength` defaults to 30. */
export function clampString(text: string | null, maxLength?: number): string | null {
	if (!text) {
		return null;
	}

	if (!maxLength) {
		maxLength = 30;
	}

	if (text.length > maxLength) {
		return text.slice(0, maxLength) + '...';
	} else {
		return text;
	}
}
