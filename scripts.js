// -------Object Constructors-------

var currentSong = 0;

function Jukebox() {
	this.play = play;
	this.pause = pause;
	this.skip = skip;
	this.soundCloudSongs = [];
	this.soundCloudSearch = soundCloudSearch;
	this.soundCloudLoad = soundCloudLoad;
	this.soundCloudPause = soundCloudPause;
	this.display = display;
	juke = this;
}

// ----------Jukebox Functionality-------------

var jukebox = new Jukebox();

playButton.addEventListener("click", play);
pauseButton.addEventListener("click", pause);
skipButton.addEventListener("click", skip);

var displayText = document.getElementsByClassName("display-text");
var albumArt = document.getElementsByClassName("albumArt")[0];

function display() {
	albumArt.src = juke.soundCloudSongs[currentSong].artwork_url;
	displayText[0].innerHTML = juke.soundCloudSongs[currentSong].title;
	displayText[1].innerHTML = juke.soundCloudSongs[currentSong].genre;
	displayText[2].innerHTML = juke.soundCloudSongs[currentSong].description;
}

function play() {
	jukebox.player.play()
	juke.display()
}

function pause() {
	jukebox.player.pause()
}

function skip() {
	if (currentSong === juke.soundCloudSongs.length -1) {
		currentSong = 0;
	}
	else {
		currentSong += 1
	}
	soundCloudLoad(jukebox.soundCloudSongs);
}

// -------SoundCloud Integration-------

SC.initialize({
	client_id: "f665fc458615b821cdf1a26b6d1657f6"
})

var search = document.getElementsByClassName("soundCloud-button")[0];

search.addEventListener("click", soundCloudSearch);

function soundCloudSearch() {
	var searchField = document.getElementById("soundCloud").value;
	SC.get('/tracks', {
		q: searchField
	}).then(function(tracks) {
		for(var i=0; i < tracks.length; i++) {
			jukebox.soundCloudSongs.push(tracks[i])
		}
		console.log(jukebox.soundCloudSongs)
		soundCloudLoad(jukebox.soundCloudSongs)
	})
}

function soundCloudLoad(soundCloudSongs) {
	SC.stream('/tracks/' + soundCloudSongs[currentSong].id).then(function(player){
			jukebox.player = player
			player.play();
			juke.display();	
	});
}

function soundCloudPause() {
	jukebox.player.pause();
}













