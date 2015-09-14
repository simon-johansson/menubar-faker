
import $ from 'jquery';

const $tab = $('#lorem');
const $word = $tab.find('.word');
const $sentence = $tab.find('.sentence');
const $paragraph = $tab.find('.paragraph');
const $amount = $tab.find('.amount');
const $type = $tab.find('.type');

const resetOpacity = () => {
	$word.css('opacity', '1');
	$sentence.css('opacity', '1');
	$paragraph.css('opacity', '1');
}

const setText = (amount, type) => {
	$amount.text(amount);
	$type.text(type);
}

const onMouseEnter = function ($el) {
	const $this = $(this);
	const index = $this.index();
	const type = `${$this[0].className}s`;
	resetOpacity();
	setText(index + 1, type);
	$el.each(function (i, el) {
		if(i <= index) {
			$(el).css('opacity', '0.5');
		}
	});
}

var arr = [$word, $sentence, $paragraph];
arr.forEach(($el) => {

	$el.on('mouseenter', function (e) {
		e.preventDefault();
		onMouseEnter.call(this, $el);
	});

	$el.on('click', function (e) {
		e.preventDefault();
		const method = $(this).data('method');
		window.writeToClipboard(method);
	});

});
