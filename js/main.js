// Add JQuery Ready Wrap
$(document).ready(function() {
	// 'Select' dropdown style

	$('#article-select').prettyDropdown({});

	// 'Select' Value on Change
	$('#article-select').on('change', function() {
		const selected = $(this).val();
		if (selected !== '') {
			console.log('The value you picked is: ' + selected);
			// Load Ajax function
			loadAjax(selected);
		}
	});

	// Query on Selection
	function loadAjax(selected) {
		const $body = $('body');
		const $siteHeader = $('.siteHeader');
		// const $
		$.ajax({
			method: 'get',
			dataType: 'JSON',
			url:
				'https://api.nytimes.com/svc/topstories/v2/' +
				selected +
				'.json?api-key=9OfuvmOA7HptDqMvq03iw3MsZVXAInAT',
		})
			.done(function(data) {
				// console.log('mydata', data.results);
				const results = data.results;

				// $.each(results, function(index, value) {
				// 	console.log(value);
				// });

				// $(selector).append(content);

				// try template strings

				// $.each(results, function(index, value){'<div><p>${abstract}<div>`})
				//
			})
			.fail(function() {
				// $body.empty();
				// $body.append('<p></p>');
			})
			.always(function() {
				// $('').hide();
				// console.log('');
			});
	}
}); // End of Ready - Good!

// Results Array
// Text first
//.each titles

// .filter images
// .slice images

// Content

//image

// description

// URL
