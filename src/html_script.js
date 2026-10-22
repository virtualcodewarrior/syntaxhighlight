import { applyRegexList } from './utilities/syntaxhighlight-match/syntaxhighlight-match.js';

function HtmlScript(BrushXML, BrushClass) {
	const xmlBrush = new BrushXML();

	if (BrushClass === null || BrushClass === undefined) {
		return;
	}

	const scriptBrush = new BrushClass();

	if (scriptBrush.htmlScript === null || scriptBrush.htmlScript === undefined) {
		throw new Error(`Brush wasn't configured for html-script option: ${BrushClass.brushName}`);
	}

	function offsetMatches(matches, offset) {
		for (let j = 0, l = matches.length; j < l; j++) {
			matches[j].index += offset;
		}
	}

	function process(match) {
		const code = match.code;
		let results = [];
		const regexList = scriptBrush.regexList;
		const offset = match.index + match.left.length;
		const htmlScript = scriptBrush.htmlScript;
		let matches;

		function add(added) {
			results = results.concat(added);
		}

		matches = applyRegexList(code, regexList);
		offsetMatches(matches, offset);
		add(matches);

		// add left script bracket
		if (htmlScript.left !== null && match.left !== null) {
			matches = applyRegexList(match.left, [htmlScript.left]);
			offsetMatches(matches, match.index);
			add(matches);
		}

		// add right script bracket
		if (htmlScript.right !== null && match.right !== null) {
			matches = applyRegexList(match.right, [htmlScript.right]);
			offsetMatches(matches, match.index + match[0].lastIndexOf(match.right));
			add(matches);
		}

		for (let j = 0, l = results.length; j < l; j++) { results[j].brushName = BrushClass.brushName; }

		return results;
	}

	xmlBrush.regexList.push(
		{ regex: scriptBrush.htmlScript.code, func: process },
	);

	this.regexList = xmlBrush.regexList;
}

export default HtmlScript;
