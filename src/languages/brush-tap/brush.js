import BrushBase from '../brush-base/brush-base.js';
import { commonRegExp as regexLib } from '../../utilities/syntaxhighlight-regex/syntaxhighlight-regex.js';

function Brush() {
	// Contributed by Chad Granum
	this.regexList = [{
		regex: new RegExp('^1..\\d+', 'gm'),
		css: 'plain bold italic',
	}, {
		regex: new RegExp('^ok( \\d+)?', 'gm'),
		css: 'keyword',
	}, {
		regex: new RegExp('^not ok( \\d+)?', 'gm'),
		css: 'color3 bold',
	}, {
		regex: new RegExp('(?!^\\s*)#.*$', 'gm'),
		css: 'variable bold',
	}, {
		regex: new RegExp('^#.*$', 'gm'),
		css: 'comments bold',
	}, {
		regex: new RegExp('^(?!(not )?ok)[^1].*$', 'gm'),
		css: 'comments',
	}, {
		regex: regexLib.doubleQuotedString,
		css: 'string',
	}, {
		regex: regexLib.singleQuotedString,
		css: 'string',
	}];
}

Brush.prototype = new BrushBase();
export default Brush;
