/*
 * This code is a modified version of the JavaScript Allauth library located here:
 * https://codeberg.org/allauth/django-allauth/src/branch/main/examples/react-spa/frontend/src/lib/django.js
 *
 * It has been upgraded to TypeScript.
 */

function getCookie(name: string): string | null {
	let cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) === name + '=') {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}

export function getCSRFToken(): string {
	const csrf = getCookie('csrftoken');
	return csrf ? csrf : '';
}
