import BrushBase from '../brush-base/brush-base.js';
import { commonRegExp as regexLib } from '../../utilities/syntaxhighlight-regex/syntaxhighlight-regex.js';

function Brush() {
	const keywords = 'break case catch class continue ' +
		'default delete do else enum export extends false  ' +
		'for function if implements import in instanceof ' +
		'interface let new null package private protected ' +
		'static return super switch ' +
		'this throw true try typeof var while with yield' +
		' any bool declare get module never number public readonly set string'; // TypeScript-specific, everything above is common with JavaScript

	this.regexList = [{
		regex: regexLib.multiLineDoubleQuotedString,
		css: 'string',
	}, {
		regex: regexLib.multiLineSingleQuotedString,
		css: 'string',
	}, {
		regex: regexLib.singleLineCComments,
		css: 'comments',
	}, {
		regex: regexLib.multiLineCComments,
		css: 'comments',
	}, {
		regex: new RegExp(this.getKeywords(keywords), 'gm'),
		css: 'keyword',
	}];

	this.forHtmlScript(regexLib.scriptScriptTags);
}

Brush.prototype = new BrushBase();
export default Brush;
