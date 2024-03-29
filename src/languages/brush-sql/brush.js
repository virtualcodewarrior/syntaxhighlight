import BrushBase from '../brush-base/brush-base.js';
import { commonRegExp as regexLib } from '../../utilities/syntaxhighlight-regex/syntaxhighlight-regex.js';

function Brush() {
	const funcs = 'abs avg case cast coalesce convert count current_timestamp ' +
		'current_user day isnull left lower month nullif replace right ' +
		'session_user space substring sum system_user upper user year';

	const keywords = 'absolute action add after alter as asc at authorization begin bigint ' +
		'binary bit by cascade char character check checkpoint close collate ' +
		'column commit committed connect connection constraint contains continue ' +
		'create cube current current_date current_time cursor database date ' +
		'deallocate dec decimal declare default delete desc distinct double drop ' +
		'dynamic else end end-exec escape except exec execute false fetch first ' +
		'float for force foreign forward free from full function global goto grant ' +
		'group grouping having hour ignore index inner insensitive insert instead ' +
		'int integer intersect into is isolation key last level load local max min ' +
		'minute modify move name national nchar next no numeric of off on only ' +
		'open option order out output partial password precision prepare primary ' +
		'prior privileges procedure public read real references relative repeatable ' +
		'restrict return returns revoke rollback rollup rows rule schema scroll ' +
		'second section select sequence serializable set size smallint static ' +
		'statistics table temp temporary then time timestamp to top transaction ' +
		'translation trigger true truncate uncommitted union unique update values ' +
		'varchar varying view when where with work';

	const operators = 'all and any between cross in join like not null or outer some';

	this.regexList = [{
		regex: /--(.*)$/gm,
		css: 'comments',
	}, {
		regex: /\/\*([^*][\s\S]*?)?\*\//gm,
		css: 'comments',
	}, {
		regex: regexLib.multiLineDoubleQuotedString,
		css: 'string',
	}, {
		regex: regexLib.multiLineSingleQuotedString,
		css: 'string',
	}, {
		regex: new RegExp(this.getKeywords(funcs), 'gmi'),
		css: 'color2',
	}, {
		regex: new RegExp(this.getKeywords(operators), 'gmi'),
		css: 'color1',
	}, {
		regex: new RegExp(this.getKeywords(keywords), 'gmi'),
		css: 'keyword',
	}];
}

Brush.prototype = new BrushBase();
export default Brush;
