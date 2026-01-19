/**
 * This module defines the HTTP API interface for the call number API, which differs between platforms, as well as some other common types.
 */

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

/**
 * Call number API interface. Clients must fully implement this.
 */
export interface CallNumberApiClient {
	readonly baseUrl: string;

	/** Get the specified call number field, as well as an optional constraint, which is used to filter by parent fields. */
	getField(
		fieldName: string,
		constraint?: { key: string; value: string }
	): Promise<CallNumberFieldItem[]>;

	getSubjects(): Promise<CallNumberFieldItem[]>;
	getDomains(subject: string): Promise<CallNumberFieldItem[]>;
	getRoots(domain: string): Promise<CallNumberFieldItem[]>;
	getAspects(root: string): Promise<CallNumberFieldItem[]>;
	getTopics(aspect: string): Promise<CallNumberFieldItem[]>;
	getAuthorsPublishers(): Promise<CallNumberFieldItem[]>;

	/** Get the call number(s) matching the specified fields. */
	getCallNumbers(fields?: CallNumber): Promise<CallNumber[]>;
}

let CLIENT: CallNumberApiClient;

// /**
//  * Initialize the call number API client.
//  *
//  * @param implementation The platform-specific implementation of the call number API.
//  */
export function initCnClient(implementation: CallNumberApiClient) {
	CLIENT = implementation;
}

// export function initCnClient(clientObject: CallNumberApiClient) {
// 	CLIENT = clientObject;
// }

/** Get the initialized call number API. */
export function getCnClient(): CallNumberApiClient {
	if (!CLIENT) {
		throw new Error('Call number API client not initialized.');
	}
	return CLIENT;
}
