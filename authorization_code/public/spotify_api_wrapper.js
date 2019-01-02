(function() {
	$.getScript('spotify-web-api.js', function(){
		function getHashParams() {
          var hashParams = {};
          var e, r = /([^&;=]+)=?([^&;]*)/g,
              q = window.location.hash.substring(1);
          while ( e = r.exec(q)) {
             hashParams[e[1]] = decodeURIComponent(e[2]);
          }
          return hashParams;
        }
        var params = getHashParams();

  		var access_token = params.access_token,
      		refresh_token = params.refresh_token,
      		error = params.error;

      	console.log(access_token);

		var spotifyApi = new SpotifyWebApi();
		spotifyApi.setAccessToken(access_token);

		var artistProfileSource = document.getElementById('artist-template').innerHTML,
		        artistProfileTemplate = Handlebars.compile(artistProfileSource),
		        artistProfilePlaceholder = document.getElementById('artist');


		// get Elvis' albums, passing a callback. When a callback is passed, no Promise is returned
		spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function(err, data) {
		  if (err) console.log(err);
		  else {
		  	console.log('Artist albums', data);
		  	artistProfilePlaceholder.innerHTML = artistProfileTemplate(data);
		  }
		});
	});
})();
