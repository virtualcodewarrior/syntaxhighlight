import BrushBase from '../brush-base/brush-base.js';
import { commonRegExp as regexLib } from '../../utilities/syntaxhighlighter-regex/syntaxhighlighter-regex.js';

function Brush() {
	const keywords = 'AddHandler AddressOf AndAlso Alias And Ansi As Assembly Auto ' +
		'Boolean ByRef Byte ByVal Call Case Catch CBool CByte CChar CDate ' +
		'CDec CDbl Char CInt Class CLng CObj Const CShort CSng CStr CType ' +
		'Date Decimal Declare Default Delegate Dim DirectCast Do Double Each ' +
		'Else ElseIf End Enum Erase Error Event Exit False Finally For Friend ' +
		'Function Get GetType GoSub GoTo Handles If Implements Imports In ' +
		'Inherits Integer Interface Is Let Lib Like Long Loop Me Mod Module ' +
		'MustInherit MustOverride MyBase MyClass Namespace New Next Not Nothing ' +
		'NotInheritable NotOverridable Object On Option Optional Or OrElse ' +
		'Overloads Overridable Overrides ParamArray Preserve Private Property ' +
		'Protected Public RaiseEvent ReadOnly ReDim REM RemoveHandler Resume ' +
		'Return Select Set Shadows Shared Short Single Static Step Stop String ' +
		'Structure Sub SyncLock Then Throw To True Try TypeOf Unicode Until ' +
		'Variant When While With WithEvents WriteOnly Xor';

	this.regexList = [{
		regex: /'.*$/gm,
		css: 'comments',
	}, {
		regex: regexLib.doubleQuotedString,
		css: 'string',
	}, {
		regex: /^\s*#.*$/gm,
		css: 'preprocessor',
	}, {
		regex: new RegExp(this.getKeywords(keywords), 'gm'),
		css: 'keyword',
	}];

	this.forHtmlScript(regexLib.aspScriptTags);
}

Brush.prototype = new BrushBase();
export default Brush;
