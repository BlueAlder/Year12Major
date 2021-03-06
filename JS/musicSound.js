var backgroundMusic = new Howl(
{
	urls: ["MusicSounds/battlemusic.ogg"],
	autoplay: false,
	loop: false,
	buffer: true,
	volume: 0.1,
	onend: function(){backgroundMusic.pos(0);
					  backgroundMusic.play();}
} );

var countdownSFX = new Howl(
{
	urls: ["MusicSounds/countdown.ogg"],
	loop: false,
	buffer: true,
	volume: 1
});

var gotCodeSFX = new Howl(
{
	urls: ["MusicSounds/gotCode.ogg"],
	loop: false,
	autoplay: false,
	buffer: true,
	volume: 1,
	onend: function(){backgroundMusic.unmute();}
});

var story = new Howl(
{
	urls:["MusicSounds/story.ogg"],
	loop: false,
	autoplay:false,
	buffer: true,
	volume: 1,
	onend: function(){storyPlaying = false;}
});