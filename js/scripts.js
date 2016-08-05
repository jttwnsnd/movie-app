$(document).ready(function(){
	// this is the base url for all our API calls
	var apiBaseUrl = 'http:api.themoviedb.org/3/';
	// base url for all images
	// after the / comes the width. e.g. imageBaseUrl + 'w300' + poster_path
	var imgBaseUrl = 'http://image.tmdb.org/t/p/'
	// the query string, including the api key
	var apiKey = 'api_key=fec8b5ab27b292a68294261bb21b04a5';
	var userSearchOptions = 'now_playing'
	var npUrl = apiBaseUrl + 'movie/'+ userSearchOptions + '?' + apiKey;
	var genreListUrl = apiBaseUrl + 'genre/movie/list?' + apiKey;
	//create a function for calling the JSON.
	function callJson(npUrl){
		$.getJSON(npUrl, function(theData){
			$('.poster_grid').html('');
			console.log(theData);
			var npHTML = '';
			for(var i = 0; i < theData.results.length; i++){
				npHTML += '<figure class="col">';
					var posterUrl = imgBaseUrl + 'w300'+ theData.results[i].poster_path;
					//img
					npHTML += '<img class="poster" src="' + posterUrl + '">';
					//name of movie
					npHTML += '<figcaption class="info"><span>'+ theData.results[i].overview + '</span></figcaption>';
				npHTML += '</figure>';
			}
			$('.poster-grid').html(npHTML);
			//lets info be seen when hovered over
			$('.info').hover(function(){
				$(this).toggleClass('appear')
			})
		})
	}
	callJson(npUrl);
	$('.input-form').submit(function(){
		event.preventDefault();
		$('.poster-grid').html('');
		var searching = $('.search').val();
		var searchUrl = apiBaseUrl + 'search/movie?query='+ searching + '&' + apiKey;
		callJson(searchUrl);
	})
})