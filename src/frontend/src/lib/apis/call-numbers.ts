export interface CallNumberFieldItem {
	name: string;
	number: string;
	id?: number; // db pk
}

/**
 * The type all server-returned call numbers use.
 */
export interface CallNumber extends Record<string, CallNumberFieldItem | number | string> {
	id: number;
	subject: CallNumberFieldItem;
	domain: CallNumberFieldItem;
	root: CallNumberFieldItem;
	aspect: CallNumberFieldItem;
	topic: CallNumberFieldItem;
	author_pub: CallNumberFieldItem;
	formatted: string;
}

async function getField(fieldName: string, constraint?: { key: string; value: string }) {
	const headers: Headers = new Headers();
	headers.set('Access-Control-Allow-Origin', '*');
	headers.set('Accept', 'application/json');

	let request: RequestInfo;
	if (constraint) {
		request = new Request(
			`http://localhost:8000/api/v0/cn/${fieldName}/?${constraint.key}=${constraint.value}`,
			{
				method: 'GET',
				headers: headers
			}
		);
	} else {
		request = new Request(`http://localhost:8000/api/v0/cn/${fieldName}/`, {
			method: 'GET',
			headers: headers
		});
	}

	// Access-Control-Allow-Origin
	return fetch(request)
		.then((response) => response.json())
		.then((response) => response as CallNumberFieldItem[]);
}

export async function getSubjects() {
	return getField('subjects');
}

export async function getDomains(subject: string) {
	return getField('domains', { key: 'subject', value: subject });
}

export async function getRoots(domain: string) {
	return getField('roots', { key: 'domain', value: domain });
}

export async function getAspects(root: string) {
	return getField('aspects', { key: 'root', value: root });
}

export async function getTopics(aspect: string) {
	return getField('topics', { key: 'aspect', value: aspect });
}

export async function getAuthorsPublishers() {
	return getField('ap');
}

export async function getCallNumbers(fields?: CallNumber): Promise<CallNumber[]> {
	const headers: Headers = new Headers();
	headers.set('Access-Control-Allow-Origin', '*');
	headers.set('Accept', 'application/json');

	const formattedConstraints: string[] = [];

	if (fields != undefined) {
		if (fields.subject) {
			formattedConstraints.push(`subject=${fields.subject.number}`);
		}
		if (fields.domain) {
			formattedConstraints.push(`domain=${fields.domain.number}`);
		}
		if (fields.root) {
			formattedConstraints.push(`root=${fields.root.number}`);
		}
		if (fields.aspect) {
			formattedConstraints.push(`aspect=${fields.aspect.number}`);
		}
		if (fields.topic) {
			formattedConstraints.push(`root=${fields.topic.number}`);
		}
		if (fields.author_pub) {
			formattedConstraints.push(`root=${fields.author_pub.number}`);
		}
	}

	const request = new Request(
		`http://localhost:8000/api/v0/cn/cn/?${formattedConstraints.join('&')}`,
		{
			method: 'GET',
			headers: headers
		}
	);

	// Access-Control-Allow-Origin
	return fetch(request).then((response) => response.json() as Promise<CallNumber[]>);
}

/**
 * Used by the call number filter modal to select certain fields. Anything dealing
 * with server-returned call numbers should instead use the `CallNumber` type.
 */
export interface SelectedItems {
	subject?: CallNumberFieldItem;
	domain?: CallNumberFieldItem;
	root?: CallNumberFieldItem;
	aspect?: CallNumberFieldItem;
	topic?: CallNumberFieldItem;
	author_pub?: CallNumberFieldItem;
}

/** Attempt to format the call number based on the given fields. */
export function formatSelectedFields(selectedFields: SelectedItems): string {
	// LT/TU 838.1.E2 A469
	let formatted = '';
	if (selectedFields.subject) {
		formatted += selectedFields.subject.number;

		if (selectedFields.domain) {
			formatted += '/' + selectedFields.domain.number;

			if (selectedFields.root) {
				formatted += ' ' + selectedFields.root.number;

				if (selectedFields.aspect) {
					formatted += '.' + selectedFields.aspect.number;

					if (selectedFields.topic) {
						formatted += '.' + selectedFields.topic.number;
					}
				}
			}
		}
	}

	if (selectedFields.author_pub) {
		formatted += ' ' + selectedFields.author_pub.number;
	}

	return formatted;
}
