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
	authorPublisher: CallNumberFieldItem | null;
}

export interface CallNumber {
	id: number;
	subject: CallNumberFieldItem;
	domain: CallNumberFieldItem;
	root: CallNumberFieldItem;
	aspect: CallNumberFieldItem;
	topic: CallNumberFieldItem;
	authorPublisher: CallNumberFieldItem;
	formatted: string;
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

	if (selectedFields.authorPublisher) {
		callNumber += ' ' + selectedFields.authorPublisher.number;
	}

	return callNumber;
}
