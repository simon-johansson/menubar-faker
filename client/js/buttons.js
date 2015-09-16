
import $ from 'jquery';
import {writeToClipboard} from './ipc'

const $buttons = $('button');
const activeBtnClass = 'btn-info';

$buttons.click(function (e) {
  e.preventDefault();
  const $this = $(this);
  const method = $this.data('method');
	$buttons.removeClass(activeBtnClass);
  $this.addClass(activeBtnClass);
  writeToClipboard(method);
});
