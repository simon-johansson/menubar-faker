'use strict';

var app = require('app');
var ipc = require('ipc');
var clipboard = require('clipboard');
var globalShortcut = require('global-shortcut');
var NativeImage = require('native-image');
var menubar = require('menubar');
var applescript = require('applescript');
var faker = require('faker');
// path relative to build folder

var _require = require('../utils');

var dataURL = _require.dataURL;

var latestCall = null;
var mb = menubar({
	"always-on-top": true,
	"height": 250,
	"width": 390
});

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

function sentences(sentenceCount) {
	if (typeof sentenceCount == 'undefined') {
		sentenceCount = 3;
	}
	var sentences = [];
	for (; sentenceCount > 0; sentenceCount--) {
		sentences.push(faker.lorem.sentence());
	}
	return sentences.join(" ");
}

function paragraph(sentenceCount) {
	if (typeof sentenceCount == 'undefined') {
		sentenceCount = 3;
	}
	return sentences(sentenceCount + faker.random.number(3));
};

function paragraphs(paragraphCount) {
	if (typeof paragraphCount == 'undefined') {
		paragraphCount = 3;
	}
	var paragraphs = [];
	for (; paragraphCount > 0; paragraphCount--) {
		paragraphs.push(paragraph());
	}
	return paragraphs.join('\n\n');
}

ipc.on('new-clipboard', function (event, arg) {
	latestCall = arg;
	writeToClipboard();
});

ipc.on('set-locale', function (event, arg) {
	faker.locale = arg;
});

ipc.on('close', function (event, arg) {
	console.log('close');
	app.quit();
});

function fetchImage(url) {
	dataURL(url, function (data) {
		var img = NativeImage.createFromDataUrl(data);
		clipboard.writeImage(img);
	});
}

var writeToClipboard = function writeToClipboard() {
	var method = arguments.length <= 0 || arguments[0] === undefined ? latestCall : arguments[0];

	if (method) {
		if (method.indexOf('fetchImage') !== -1) {
			eval(method);
		} else {
			var toClip = eval(method);
			toClip = typeof toClip === 'string' ? toClip : toClip.toDateString();
			clipboard.writeText(toClip);
		}
		setTimeout(function () {
			mb.hideWindow();
		}, 200);
	}
};

mb.on('ready', function ready() {
	console.log('app is ready');

	var ret = globalShortcut.register('cmd+g', function () {
		writeToClipboard();
		var script = 'tell application "System Events" to keystroke "v" using command down';
		applescript.execString(script, function (err, rtn) {
			if (err) {
				console.log(err);
			}
		});
	});
});
