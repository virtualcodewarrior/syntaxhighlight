import BrushBase from '../brush-base/brush-base.js';
import { commonRegExp as regexLib } from '../../utilities/syntaxhighlight-regex/syntaxhighlight-regex.js';

function Brush() {
	// Contributed by Joel 'Jaykul' Bennett, http://PoshCode.org | http://HuddledMasses.org
	const keywords = 'while validateset validaterange validatepattern validatelength validatecount ' +
		'until trap switch return ref process param parameter in if global: ' +
		'function foreach for finally filter end elseif else dynamicparam do default ' +
		'continue cmdletbinding break begin alias \\? % #script #private #local #global ' +
		'mandatory parametersetname position valuefrompipeline ' +
		'valuefrompipelinebypropertyname valuefromremainingarguments helpmessage ';

	const operators = ' and as band bnot bor bxor casesensitive ccontains ceq cge cgt cle ' +
		'clike clt cmatch cne cnotcontains cnotlike cnotmatch contains ' +
		'creplace eq exact f file ge gt icontains ieq ige igt ile ilike ilt ' +
		'imatch ine inotcontains inotlike inotmatch ireplace is isnot le like ' +
		'lt match ne not notcontains notlike notmatch or regex replace wildcard';

	const verbs = 'write where wait use update unregister undo trace test tee take suspend ' +
		'stop start split sort skip show set send select scroll resume restore ' +
		'restart resolve resize reset rename remove register receive read push ' +
		'pop ping out new move measure limit join invoke import group get format ' +
		'foreach export expand exit enter enable disconnect disable debug cxnew ' +
		'copy convertto convertfrom convert connect complete compare clear ' +
		'checkpoint aggregate add';

	// I can't find a way to match the comment based help in multi-line comments, because SH won't highlight in highlights, and javascript doesn't support lookbehind
	const commenthelp = ' component description example externalhelp forwardhelpcategory forwardhelptargetname forwardhelptargetname functionality inputs link notes outputs parameter remotehelprunspace role synopsis';

	this.regexList = [{
		regex: new RegExp(`^\\s*#[#\\s]*\\.(${this.getKeywords(commenthelp)}).*$`, 'gim'),
		css: 'preprocessor help bold',
	}, {
		regex: regexLib.singleLinePerlComments,
		css: 'comments',
	}, {
		regex: /(&lt;|<)#[\s\S]*?#(&gt;|>)/gm,
		css: 'comments here',
	}, {
		regex: new RegExp('@"\\n[\\s\\S]*?\\n"@', 'gm'),
		css: 'script string here',
	}, {
		regex: new RegExp('@\'\\n[\\s\\S]*?\\n\'@', 'gm'),
		css: 'script string single here',
	}, {
		regex: new RegExp('"(?:\\$\\([^\\)]*\\)|[^"]|`"|"")*[^`]"', 'g'),
		css: 'string',
	}, {
		regex: new RegExp('\'(?:[^\']|\'\')*\'', 'g'),
		css: 'string single',
	}, {
		regex: new RegExp('[\\$|@|@@](?:(?:global|script|private|env):)?[A-Z0-9_]+', 'gi'),
		css: 'variable',
	}, {
		regex: new RegExp(`(?:\\b${verbs.replace(/ /g, '\\b|\\b')})-[a-zA-Z_][a-zA-Z0-9_]*`, 'gmi'),
		css: 'functions',
	}, {
		regex: new RegExp(this.getKeywords(keywords), 'gmi'),
		css: 'keyword',
	}, {
		regex: new RegExp(`-${this.getKeywords(operators)}`, 'gmi'),
		css: 'operator value',
	}, {
		regex: new RegExp('\\[[A-Z_\\[][A-Z0-9_. `,\\[\\]]*\\]', 'gi'),
		css: 'constants',
	}, {
		regex: new RegExp(`\\s+-(?!${this.getKeywords(operators)})[a-zA-Z_][a-zA-Z0-9_]*`, 'gmi'),
		css: 'color1',
	}];
}

Brush.prototype = new BrushBase();
export default Brush;
