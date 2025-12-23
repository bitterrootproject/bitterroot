export interface CallNumberFieldItem {
	name: string;
	number: string;
	id?: number; // db pk
}

export interface SelectedItems {
	subject: CallNumberFieldItem | null;
	domain: CallNumberFieldItem | null;
	root: CallNumberFieldItem | null;
	aspect: CallNumberFieldItem | null;
	topic: CallNumberFieldItem | null;
	author_pub: CallNumberFieldItem | null;
}

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

export function stringifyCallNumberFields(callNumber: CallNumber) {
	const stringified: { [x: string]: string } = {};

	for (const field in callNumber) {
		const value = callNumber[field];
		// Interfaces are erased at runtime, so use a shape check instead of instanceof or typeof
		if (typeof value === 'object' && 'number' in value) {
			stringified[field] =
				`${(value as CallNumberFieldItem).name} (${(value as CallNumberFieldItem).number})`;
		} else {
			stringified[field] = String(value);
		}
	}

	return stringified;
}

export function formatCallNumber(selectedFields: SelectedItems): string {
	// LT/TU 838.1.E2 A469
	let callNumber = '';
	if (selectedFields.subject) {
		callNumber += selectedFields.subject.number;

		if (selectedFields.domain) {
			callNumber += '/' + selectedFields.domain.number;

			if (selectedFields.root) {
				callNumber += ' ' + selectedFields.root.number;

				if (selectedFields.aspect) {
					callNumber += '.' + selectedFields.aspect.number;

					if (selectedFields.topic) {
						callNumber += '.' + selectedFields.topic.number;
					}
				}
			}
		}
	}

	if (selectedFields.author_pub) {
		callNumber += ' ' + selectedFields.author_pub.number;
	}

	return callNumber;
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

export async function getCallNumbers(fields?: SelectedItems): Promise<CallNumber[]> {
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
