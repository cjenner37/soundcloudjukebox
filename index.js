$(document).ready(function () {

	// Create instance of Jukebox
	var myJukebox = new Jukebox();

	// Play button, also pauses song
	$('#play-button').click(function () {
		let playing = $(this).attr("data-playing");
		if (playing === "false") {
			myJukebox.play();
			$(this).attr("data-playing", true);
			$('#play-button').css("border-left", "80px solid black");
		} else {
			myJukebox.pause();
			$(this).attr("data-playing", false);
			$('#play-button').css("border-left", "80px solid grey");
		};
	});

	// Search for songs
	$('#search').keyup(function(){
		let searchTerm = $(this).val();
		myJukebox.searchForSong(searchTerm);
	});

	// Load Song, dynamically add result-container element (.on makes this possible)
	$(document).on('click', '.result-container', function(){
		myJukebox.loadSong($(this).attr("data-song-id"));
	});




	// playNext();
});




function Jukebox (){
	
	let $playWindow = $('#playing');

	// Ask Casey about this later
	let self = this;

	self.audio = null;
	// Load Array of Songs
	self.songs = [];



	// Initialize SounCloud API
	SC.initialize({
		client_id: 'bGdTMklEcIjmpLGvIaOO0wbUUovPL3AH'
	});


	// console.log(self.songs);
	self.mySongId = 293;
	self.myStream = SC.stream(`/tracks/${this.mySongId}`);

	this.play = function () {	
		self.myStream.then(function(player){
		  player.play();
		});
	};

	this.pause = function () {
		self.myStream.then(function(player){
		  player.pause();
		});
	};

	this.searchForSong = function (query) {

		// Empty results list
		$('.results').empty();

		// Search Soundcloud for query entered
		SC.get('/tracks', {
			q: query, license: 'cc-by-sa'
		}).then(function(tracks) {
			self.songs = tracks;

			// Display results
			for (var i = 0; i < 11; i++) {
				let song = self.songs[i];
				// console.log(self.songs[0]);
				$('.results').append(
					`<div class="result-container" data-song-id="${song.id}"><p>${song.title}</p>`
				);
			}
		});		
	}

	this.loadSong = function (chosenSongId) {
		// Match chosenSongId with that song in songs array, 
		// set self.audio to that song object
		self.audio = self.songs.filter(function (song) {
			return song.id == parseInt(chosenSongId);
		});
		if (self.audio.length === 0){
			$('#error').append(`<p>Oops! We hit a bug :( try your search again, please!</p>`)
		} else {
		$('#error').empty();
		self.mySongId = parseInt(chosenSongId);
		self.myStream = SC.stream(`/tracks/${chosenSongId}`);
		let thisSong = self.audio[0];
		$('#song-info').empty();
		$('#song-info').append(
			`<img src="${self.audio[0].artwork_url}"><h2>Song: <a href=${self.audio[0].permalink_url} target="_blank">${self.audio[0].title}</a></h2><h4><p>Artist: <a href=${self.audio[0].user.permalink_url} target="_blank">${self.audio[0].user.permalink}</a></p><p>Genre: ${self.audio[0].genre}</p></h4><p>${self.audio[0].description}</p>`
			);
		}
	};

};


// user.permalink
// user.permalink_url









// OPTIONS TO ADD 

	// function playNext() {
	// 	console.log(songs);
	// 	SC.stream(`/tracks/${songs[currentSong].id}`).then(function (player) {
	// 		player.play();

	// 		player.on("finish", function () {
	// 			currentSong += 1;
	// 			playNext();
	// 		});
	// 	});
	// };

// When Song Changes
// chosenSongElement.addEventListener('change', function () {
// 	let chosenSong = chosenSongElement.value.split('\\').pop();
// 	myJukebox.loadNewSong(chosenSong);
// });