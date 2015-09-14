const ipc = window.require('ipc');
const clipboard = window.require('clipboard');
const faker = require('faker');

window.jQuery = require('jquery');
const $ = window.jQuery
require('bootstrap');

require('./js/tabs');
require('./js/lorem');

const $buttons = $('button');
const activeBtnClass = 'btn-info';

window.writeToClipboard = (obj) => {
	ipc.send('new-clipboard', obj);
}

$buttons.click(function (e) {
  e.preventDefault();
  const $this = $(this);
  const method = $this.data('method');
	$buttons.removeClass(activeBtnClass);
  $this.addClass(activeBtnClass);
  window.writeToClipboard(method);
});
