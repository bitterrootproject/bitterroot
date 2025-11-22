import type { CallNumberFieldItem, CallNumber, SelectedItems } from './models';

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
	// let headers: Headers = new Headers();
	// headers.set('Access-Control-Allow-Origin', '*');
	// headers.set('Accept', 'application/json');

	// let request: RequestInfo = new Request('http://localhost:8000/api/v0/cn/subjects/', {
	// 	method: 'GET',
	// 	headers: headers
	// });

	// // Access-Control-Allow-Origin
	// return fetch(request)
	// 	.then((response) => response.json())
	// 	.then((response) => response as CallNumberFieldItems[]);
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

async function getFieldDetail(fieldName: string, id: number) {
	const headers: Headers = new Headers();
	headers.set('Access-Control-Allow-Origin', '*');
	headers.set('Accept', 'application/json');

	const request: RequestInfo = new Request(`http://localhost:8000/api/v0/cn/${fieldName}/${id}`, {
		method: 'GET',
		headers: headers
	});

	// Access-Control-Allow-Origin
	return fetch(request)
		.then((response) => response.json())
		.then((response) => response as CallNumberFieldItem);
}

/*
   {
        "id": 1,
        "subject": 1,
        "domain": 1,
        "root": 1,
        "aspect": 1,
        "topic": 1,
        "author_pub": 1,
        "formatted": "LT/TU 838.1.E2 A469"
    },
*/
interface RawCallNumber {
	id: number;
	subject: number;
	domain: number;
	root: number;
	aspect: number;
	topic: number;
	author_pub: number;
	formatted: string;
}

async function convertRawCallNumberToDetail(rawCallNumber: RawCallNumber): Promise<CallNumber> {
	return {
		id: rawCallNumber.id,
		subject: await getFieldDetail('subjects', rawCallNumber.subject),
		domain: await getFieldDetail('domains', rawCallNumber.domain),
		root: await getFieldDetail('roots', rawCallNumber.root),
		aspect: await getFieldDetail('aspects', rawCallNumber.aspect),
		topic: await getFieldDetail('topics', rawCallNumber.topic),
		authorPublisher: await getFieldDetail('ap', rawCallNumber.author_pub),
		formatted: rawCallNumber.formatted
	};
}

export async function getCallNumbers(fields: SelectedItems): Promise<Promise<CallNumber>[]> {
	const headers: Headers = new Headers();
	headers.set('Access-Control-Allow-Origin', '*');
	headers.set('Accept', 'application/json');

	const formattedConstraints: string[] = [];

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
	if (fields.authorPublisher) {
		formattedConstraints.push(`root=${fields.authorPublisher.number}`);
	}

	const request = new Request(
		`http://localhost:8000/api/v0/cn/cn/?${formattedConstraints.join('?')}`,
		{
			method: 'GET',
			headers: headers
		}
	);

	// Access-Control-Allow-Origin
	const rawCallNumbers = await fetch(request)
		.then((response) => response.json())
		.then((response) => response as RawCallNumber[]);

	// let formatted = rawCallNumbers.map((cn) => convertRawCallNumberToDetail(cn))
	return rawCallNumbers.map((cn) => convertRawCallNumberToDetail(cn));
}
