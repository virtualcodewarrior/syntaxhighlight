let HighlighterModule;
onmessage = async(event) => {
	HighlighterModule = HighlighterModule ?? await import('../syntaxhighlight.js');
	const result = await HighlighterModule.default.highlightLanguage(event.data.code, event.data.language, event.data.options);
	postMessage({ formatted: result, id: event.data.id });
};
