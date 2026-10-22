import { Match } from './match.js';
import { xRegExp } from '../../syntaxhighlight-regex/syntaxhighlight-regex.js';

/**
 * Executes given regular expression on provided code and returns all matches that are found.
 *
 * @param {String} code    Code to execute regular expression on.
 * @param {Object} regex   Regular expression item info from `regexList` collection.
 * @returns {Array}         Returns a list of Match objects.
 */
export function find(code, regexInfo) {
	function defaultAdd(match) {
		return match[0];
	}

	let match,
	matches = [],
	pos = 0
	;
	const process = regexInfo.func ? regexInfo.func : defaultAdd;

	while ((match = xRegExp.exec(code, regexInfo.regex, pos))) {
		let resultMatch = process(match, regexInfo);

		if (typeof resultMatch === 'string') {
			resultMatch = [new Match(resultMatch, match.index, regexInfo.css)];
		}

		matches = matches.concat(resultMatch);
		pos = match.index + match[0].length;
	}

	return matches;
}

/**
 * Sorts matches by index position and then by length.
 */
export function sort(matches) {
	function sortMatchesCallback(m1, m2) {
		// sort matches by index first
		if (m1.index < m2.index) {
			return -1;
		} else if (m1.index > m2.index) {
			return 1;
		}
		// if index is the same, sort by length
		if (m1.length < m2.length) {
			return -1;
		} else if (m1.length > m2.length) {
			return 1;
		}


		return 0;
	}

	return matches.sort(sortMatchesCallback);
}

export function compact(matches) {
	const result = [];

	for (let i = 0, l = matches.length; i < l; i++) {
		if (matches[i]) {
			result.push(matches[i]);
		}
	}

	return result;
}

/**
 * Checks to see if any of the matches are inside of other matches.
 * This process would get rid of highligted strings inside comments,
 * keywords inside strings and so on.
 */
export function removeNested(matches) {
	// Optimized by Jose Prado (http://joseprado.com)
	for (let i = 0, l = matches.length; i < l; i++) {
		if (matches[i] !== null) {
			const itemI = matches[i],
			itemIEndPos = itemI.index + itemI.length
			;

			// `matches.length` never changes here (elements are nulled, never removed),
			// so it is read inline rather than cached in a shadowing `l`.
			for (let j = i + 1; j < matches.length && matches[i] !== null; j++) {
				const itemJ = matches[j];

				if (itemJ !== null) {
					if (itemJ.index > itemIEndPos) {
						break;
					} else if (itemJ.index === itemI.index && itemJ.length > itemI.length) {
						matches[i] = null;
					} else if (itemJ.index >= itemI.index && itemJ.index < itemIEndPos) {
						matches[j] = null;
					}
				}
			}
		}
	}

	return matches;
}
