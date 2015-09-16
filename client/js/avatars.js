
import $ from 'jquery';
import faker from 'faker'
import {writeToClipboard} from './ipc'

const $avatars = $("#avatars");
const avatarTemplate = $("#avatar-template").html();

const populateAvatars = () => {
	for (var i = 0; i <= 6; i++) {
		var template = avatarTemplate.format(faker.image.avatar());
		$avatars.prepend(template);
	};
}
populateAvatars();

$avatars.on('click', '.load-new', function(e) {
	e.preventDefault();
	$avatars.find('.img-wrapper').remove();
	populateAvatars();
});

$avatars.on('click', '.img-wrapper', function(e) {
	e.preventDefault();
	const src = $(this).find('img').attr('src');
	writeToClipboard(`fetchImage('${src}')`);
});
