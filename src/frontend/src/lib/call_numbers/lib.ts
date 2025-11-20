import { type CallNumberFieldItems } from './models';

export async function getSubjects() {
	let headers: Headers = new Headers();
	headers.set('Access-Control-Allow-Origin', '*');
	headers.set('Accept', 'application/json');

	let request: RequestInfo = new Request('http://localhost:8000/api/v0/cn/subjects/', {
		method: 'GET',
		headers: headers
	});

	// Access-Control-Allow-Origin
	return fetch(request)
		.then((response) => response.json())
		.then((response) => response as CallNumberFieldItems[]);
}
