import BrushBase from '../brush-base/brush-base.js';
import { commonRegExp as regexLib } from '../../utilities/syntaxhighlight-regex/syntaxhighlight-regex.js';

function Brush() {
	const keywords = 'abstract assert boolean break byte case catch char class const ' +
		'continue default do double else enum extends ' +
		'false final finally float for goto if implements import ' +
		'instanceof int interface long native new null ' +
		'package private protected public return ' +
		'short static strictfp super switch synchronized this throw throws true ' +
		'transient try void volatile while';

	this.regexList = [{
		regex: regexLib.singleLineCComments,
		css: 'comments',
	}, {
		regex: /\/\*([^*][\s\S]*?)?\*\//gm,
		css: 'comments',
	}, {
		regex: /\/\*(?!\*\/)\*[\s\S]*?\*\//gm,
		css: 'preprocessor',
	}, {
		regex: regexLib.doubleQuotedString,
		css: 'string',
	}, {
		regex: regexLib.singleQuotedString,
		css: 'string',
	}, {
		regex: /\b([\d]+(\.[\d]+)?f?|[\d]+l?|0x[a-f0-9]+)\b/gi,
		css: 'value',
	}, {
		regex: /(?!@interface\b)@[$\w]+\b/g,
		css: 'color1',
	}, {
		regex: /@interface\b/g,
		css: 'color2',
	}, {
		regex: new RegExp(this.getKeywords(keywords), 'gm'),
		css: 'keyword',
	}];

	this.forHtmlScript({
		left: /(&lt;|<)%[@!=]?/g,
		right: /%(&gt;|>)/g,
	});
}

Brush.prototype = new BrushBase();
export default Brush;
