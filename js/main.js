// Add JQuery Ready Wrap
$(document).ready(function() {
	// Variables
	// const $siteHeader = $('.siteHeader');
	// const $siteForm = $('.site-form');
	const $loadingBar = $('.loading');
	const $loadingGif = $('.loading-gif');
	const $select = $('#article-select');
	const $stories = $('.stories');
	let $newStory = $('newStory');

	// 'Select' dropdown style
	$select.prettyDropdown({});

	// $loadingBar.empty();
	// 'Select' Value on Change
	$select.on('change', function(event) {
		event.preventDefault();
		const selected = $(this).val();

		if (selected !== '') {
			console.log('The value you picked is: ' + selected);
			setTimeout(() => {}, 2000);
			// Load Ajax function
			if (loadAjax(selected) === true) {
			}

			$loadingGif.show();
		}
	});

	// Query on Selection
	function loadAjax(selected) {
		// Connecting to API
		$.ajax({
			method: 'get',
			dataType: 'JSON',
			url:
				'https://api.nytimes.com/svc/topstories/v2/' +
				selected +
				'.json?api-key=9OfuvmOA7HptDqMvq03iw3MsZVXAInAT',
		})
			.done(function(data) {
				$stories.empty();
				console.log('mydata', data.results);
				const results = data.results;

				const filteredResults = results
					.filter(function(value) {
						return value.multimedia[4] !== undefined;
					})
					.slice(0, 12);

				$.each(filteredResults, function(index, article) {
					// console.log(article);

					const articleTemplate = `
					<div class="newStory" style="background: url(${article.multimedia[4].url}) center/cover;">
						<a href="${article.url}" target="_blank">
							<h2 class="article-title">${article.title}<h2>
						</a>
						<p class="article-abstract">${article.abstract}</p>
					</div>
					`;

					$('.stories').append(articleTemplate);

					// if (
					// 	this.title !== undefined &&
					// 	this.abstract !== undefined &&
					// 	this.url !== undefined &&
					// 	this.multimedia[0] !== undefined
					// ) {
					// 	$("<a class='newStory'></a>").appendTo('.stories');

					// 	$newStory.css('background-image', 'url(' + this.multimedia[0].url) + ')';
					// 	$newStory.append('<h1>' + this.title + '</h1>');
					// }
				});
			})
			.fail(function() {
				$loadingBar.show();
				$loadingGif.remove();
				$('.stories').append(
					'<h2>You have encountered an error. Please refresh the website and try again.</h2>'
				);
			})

			.always(function() {
				$loadingGif.hide();
			});
	}
}); // End of Ready - Good!
