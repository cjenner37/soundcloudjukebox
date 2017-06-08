$(document).ready(function () {

	SC.initialize({
		client_id: 'bGdTMklEcIjmpLGvIaOO0wbUUovPL3AH'
	});

	SC.get('/tracks', {
	  q: 'griz', license: 'cc-by-sa'
	}).then(function(tracks) {
	  console.log(tracks);
	  SC.stream(`/tracks/${tracks[1].id}`).then(function (player) {
	  	player.play();

	  	// When the song is over...
	  	player.on('finish', function () {
	  		console.log("Done-zo.");
	  	})
	  });
	});	

});

// function playNext()