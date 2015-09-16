const ipc = window.require('ipc');
const clipboard = window.require('clipboard');
const faker = require('faker');

window.jQuery = require('jquery');
const $ = window.jQuery
require('bootstrap');
require('bootstrap-select');

require('./js/tabs');
require('./js/lorem');

const $buttons = $('button');
const activeBtnClass = 'btn-info';

window.writeToClipboard = (obj) => {
	ipc.send('new-clipboard', obj);
}

window.setLocale = (locale) => {
	ipc.send('set-locale', locale);
}

$buttons.click(function (e) {
  e.preventDefault();
  const $this = $(this);
  const method = $this.data('method');
	$buttons.removeClass(activeBtnClass);
  $this.addClass(activeBtnClass);
  window.writeToClipboard(method);
});

String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
    ;
  });
};

var avatarTemplate = $("#avatar-template").html();

const populateAvatars = () => {
	for (var i = 0; i <= 6; i++) {
		var template = avatarTemplate.format(faker.image.avatar());
		$("#avatars").prepend(template);
	};
}
populateAvatars();

$("#avatars").on('click', '.load-new', function(event) {
	event.preventDefault();
	$("#avatars").find('.img-wrapper').remove();
	populateAvatars();
});

$("#avatars").on('click', '.img-wrapper', function(event) {
	event.preventDefault();
	const src = $(this).find('img').attr('src');
	window.writeToClipboard(`fetchImage('${src}')`);
});

$('.dropdown').on('click', 'li', function(e) {
	e.preventDefault();
	const $this = $(this);
	$('.dropdown li').removeClass('active');
	$this.addClass('active');
	window.setLocale($this.data('code'));
});
