export interface CallNumberFieldItems {
	name: string;
	number: string;
	id?: number; // db pk
}

export interface SelectedItems {
	subject: CallNumberFieldItems | null;
	domain: CallNumberFieldItems | null;
	root: CallNumberFieldItems | null;
	aspect: CallNumberFieldItems | null;
	topic: CallNumberFieldItems | null;
	authorPublisher: CallNumberFieldItems | null;
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

// namespace CallNumber {
//     interface Subject {
//         subject_name: string,
//         subject_id: string,
//     }
// }
