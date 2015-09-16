
import $ from 'jquery';
import {setLocale} from './ipc'

$('.dropdown').on('click', 'li', function(e) {
	e.preventDefault();
	const $this = $(this);
	$('.dropdown li').removeClass('active');
	$this.addClass('active');
	setLocale($this.data('code'));
});

