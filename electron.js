
const app = require('app');
const ipc = require('ipc');
const clipboard = require('clipboard');
const globalShortcut = require('global-shortcut');
const menubar = require('menubar');
const applescript = require('applescript');
const faker = require('faker');
const dataURL = require('./js/dataURL');

var latestCall = null;
var mb = menubar({
  "always-on-top": true,
  "height": 220,
})

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

ipc.on('new-clipboard', function(event, arg) {
	latestCall = arg;
	writeToClipboard()
});

var NativeImage = require('native-image');
dataURL(faker.image.avatar(), function(data) {
	var img = NativeImage.createFromDataUrl(data);
	clipboard.writeImage(img);
})

const writeToClipboard = (method = latestCall) => {
	if(method) {
		clipboard.writeText(eval(method));
		setTimeout(() => {
			mb.hideWindow();
		}, 200);
	}
}

mb.on('ready', function ready () {
  console.log('app is ready');

  var ret = globalShortcut.register('cmd+g', function() {
  	writeToClipboard()
		const script = 'tell application "System Events" to keystroke "v" using command down';
		applescript.execString(script, function(err, rtn) {
		  if (err) { console.log(err); }
		});
  });
})



