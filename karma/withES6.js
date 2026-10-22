/* eslint-env jasmine */
/* exported withHtml */

// Defers karma's start until DOMContentLoaded so that native ES modules
// (loaded with <script type="module">) have finished executing before the
// specs run. Vendored from the unpublished `karma-jasmine-es6` package.

const initStart = window.__karma__.start;

window.__karma__.start = function() {
	if (window.addEventListener) {
		document.addEventListener('DOMContentLoaded', function() {
			console.info('Modules should be loaded, start it');
			initStart();
		});
	} else {
		// Hack for IE7 and IE8.
		// In IE7 and IE8, we don't care about native es6-module, since they are not implemented anyway
		console.warn('IE7 hacking mode: we are not waiting for modules to be loaded (and they will never be since IE7 does not support it)');
		initStart();
	}
};
