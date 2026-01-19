import type {
	CallNumberFieldItem,
	CallNumber,
	CallNumberApiClient
} from '@bitterroot/core/call-numbers';
import { initCnClient } from '@bitterroot/core/call-numbers';

export class CnClient implements CallNumberApiClient {
	readonly baseUrl: string = 'http://localhost:8000';

	// constructor(baseUrl: string) {
	// 	this.baseUrl = baseUrl
	// }

	constructor() {
		initCnClient(this);
	}

	async getField(
		fieldName: string,
		constraint?: { key: string; value: string }
	): Promise<CallNumberFieldItem[]> {
		const headers: Headers = new Headers();
		headers.set('Access-Control-Allow-Origin', '*');
		headers.set('Accept', 'application/json');

		let request: RequestInfo;
		if (constraint) {
			request = new Request(
				`${this.baseUrl}/api/v0/cn/${fieldName}/?${constraint.key}=${constraint.value}`,
				{
					method: 'GET',
					headers: headers
				}
			);
		} else {
			request = new Request(`${this.baseUrl}/api/v0/cn/${fieldName}/`, {
				method: 'GET',
				headers: headers
			});
		}

		// Access-Control-Allow-Origin
		return fetch(request)
			.then((response) => response.json())
			.then((response) => response as CallNumberFieldItem[]);
	}

	async getSubjects() {
		return this.getField('subjects');
	}

	async getDomains(subject: string) {
		return this.getField('domains', { key: 'subject', value: subject });
	}

	async getRoots(domain: string) {
		return this.getField('roots', { key: 'domain', value: domain });
	}

	async getAspects(root: string) {
		return this.getField('aspects', { key: 'root', value: root });
	}

	async getTopics(aspect: string) {
		return this.getField('topics', { key: 'aspect', value: aspect });
	}

	async getAuthorsPublishers() {
		return this.getField('ap');
	}

	async getCallNumbers(fields?: CallNumber): Promise<CallNumber[]> {
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
				formattedConstraints.push(`topic=${fields.topic.number}`);
			}
			if (fields.author_pub) {
				formattedConstraints.push(`author_pub=${fields.author_pub.number}`);
			}
		}

		const request = new Request(`${this.baseUrl}/api/v0/cn/cn/?${formattedConstraints.join('&')}`, {
			method: 'GET',
			headers: headers
		});

		// Access-Control-Allow-Origin
		return fetch(request).then((response) => response.json() as Promise<CallNumber[]>);
	}
}

// const client = getCnClient()

// export default client;
