
window.jQuery = require('jquery');
const $ = window.jQuery
require('bootstrap');

require('./js/format');
require('./js/tabs');
require('./js/lorem');
require('./js/buttons');
require('./js/avatars');
require('./js/locale');

const {closeApp} = require('./js/ipc');

$('.glyphicon-remove').on('click', function(e) {
	e.preventDefault();
	console.log('close')
	closeApp();
});
