
const ipc = window.require('ipc');

module.exports = {
	writeToClipboard(obj) {
		ipc.send('new-clipboard', obj);
	},

	setLocale(locale) {
		ipc.send('set-locale', locale);
	},

	closeApp(locale) {
		ipc.send('close');
	}
}
