import BrushBase from '../brush-base/brush-base.js';
import { commonRegExp as regexLib } from '../../utilities/syntaxhighlight-regex/syntaxhighlight-regex.js';
import { Match } from '../../utilities/syntaxhighlight-match/lib/match.js';

function Brush() {
	const keywords = 'abstract as base bool break byte case catch char checked class const ' +
		'continue decimal default delegate do double else enum event explicit volatile ' +
		'extern false finally fixed float for foreach get goto if implicit in int ' +
		'interface internal is lock long namespace new null object operator out ' +
		'override params private protected public readonly ref return sbyte sealed set ' +
		'short sizeof stackalloc static string struct switch this throw true try ' +
		'typeof uint ulong unchecked unsafe ushort using virtual void while var ' +
		'from group by into select let where orderby join on equals ascending descending';

	function fixComments(match) {
		const css = (match[0].indexOf('///') === 0) ? 'color1' : 'comments';
		return [new Match(match[0], match.index, css)];
	}

	this.regexList = [{
		regex: regexLib.singleLineCComments,
		func: fixComments,
	}, {
		regex: regexLib.multiLineCComments,
		css: 'comments',
	}, {
		regex: /@"(?:[^"]|"")*"/g,
		css: 'string',
	}, {
		regex: regexLib.doubleQuotedString,
		css: 'string',
	}, {
		regex: regexLib.singleQuotedString,
		css: 'string',
	}, {
		regex: /^\s*#.*/gm,
		css: 'preprocessor',
	}, {
		regex: new RegExp(this.getKeywords(keywords), 'gm'),
		css: 'keyword',
	}, {
		regex: /\bpartial(?=\s+(?:class|interface|struct)\b)/g,
		css: 'keyword',
	}, {
		regex: /\byield(?=\s+(?:return|break)\b)/g,
		css: 'keyword',
	}];

	this.forHtmlScript(regexLib.aspScriptTags);
}

Brush.prototype = new BrushBase();
export default Brush;
