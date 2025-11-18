export interface CallNumberFieldItems {
	name: string;
	id: string;
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
		callNumber += selectedFields.subject.id;

		if (selectedFields.domain) {
			callNumber += '/' + selectedFields.domain.id;

			if (selectedFields.root) {
				callNumber += ' ' + selectedFields.root.id;

				if (selectedFields.aspect) {
					callNumber += '.' + selectedFields.aspect.id;

					if (selectedFields.topic) {
						callNumber += '.' + selectedFields.topic.id;
					}
				}
			}
		}
	}

	if (selectedFields.authorPublisher) {
		callNumber += ' ' + selectedFields.authorPublisher.id;
	}

	return callNumber;
}

// namespace CallNumber {
//     interface Subject {
//         subject_name: string,
//         subject_id: string,
//     }
// }
