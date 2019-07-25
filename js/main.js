// Add JQuery Ready Wrap
$(document).ready(function() {
	// Define or choose value to change
	$('#article-select').on('change', function() {
		const selected = $(this).val();
		if (selected !== '') {
			console.log('The value you picked is: ' + selected);
			// Load Ajax function
			loadAjax(selected);
		}
	});

	function loadAjax(selected) {
        // console.log(selected);
        const $body = $('body');
        const $
		$.ajax({
			method: 'get',
			// Add Variable Value selected
			url:
				'https://api.nytimes.com/svc/topstories/v2/' +
				selected +
				'.json?api-key=9OfuvmOA7HptDqMvq03iw3MsZVXAInAT',
		})
			.done(function(data) {
				console.log('mydata', data.results);
				// const results = data.results;
				// append your data
				// try template strings
				// $.each(results, function(index, value){'<div><p>${abstract}<div>`})
				//
			})
			.fail(function() {
                $body.empty();
                $body.append("<p></p>");
            })
			.always(function() {
                $("").hide();
                console.log("string");
            });
	}
}); // good!

// Results Array
// Text first
//.each titles

// .filter images
// .slice images

// Content

//image

// description

// URL
