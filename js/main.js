// Add JQuery Ready Wrap
$(function() {
	// Variables
	const $loadingBar = $('.loading');
	const $loadingGif = $('.loading-gif');
	const $stories = $('.stories');
	const $select = $('#article-select');

	// 'Select' dropdown style
	$select.prettyDropdown({});

	// 'Select' Value on Change

	$select.on('change', function(event) {
		event.preventDefault();
		const selected = $(this).val();

		if (selected !== '') {
			console.log('The value you picked is: ' + selected);

			// Load Ajax function
			if (loadAjax(selected) === true) {
				return selected;
			}
			// To show loading bar for 2 seconds

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
				// Refresh Content
				$stories.empty();
				// Select 12 stories from the results and validate
				const results = data.results;
				const filteredResults = results
					.filter(function(value) {
						return value.multimedia[4] !== undefined;
					})
					.slice(0, 12);
				console.log(filteredResults);
				// For each story, append the following to the DOM
				$.each(filteredResults, function(index, article) {
					const articleTemplate = `
					<div class="newStory" style="background: url(${article.multimedia[4].url}) center/cover;">
						<a href="${article.url}" target="_blank">
							<h2 class="article-title">${article.title}<h2>
						</a>
						<div class="article-abstract">
							<p>${article.abstract}</p>
						</div>
					</div>
					`;

					$('.stories').append(articleTemplate);
				});
			}) // End of Done

			.fail(function() {
				//Remove loading Gif and append an Error Message
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
});
