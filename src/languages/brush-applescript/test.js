import { applyRegexList } from '../../utilities/syntaxhighlight-match/syntaxhighlight-match.js';
import Brush from './brush.js';

describe('brush-applescript', () => {
	let instance = null;
	let sample;

	beforeAll(async() => {
		instance = new Brush();
		sample = await (await fetch('/base/src/languages/brush-applescript/sample.txt')).text();
	});

	it('has populated code sample', () => {
		expect(sample).not.toMatch(/^Populate/);
	});

	describe('instance', () => {
		it('has `regexList`', () => {
			expect(instance.regexList).toBeDefined();
		});
	});

	describe('parsing', () => {
		let matches = null;

		beforeAll(() => {
			matches = applyRegexList(sample, instance.regexList);
		});

		it('can parse', () => {
			expect(matches.length).toBeGreaterThan(0);
		});
	});
});
