 (function() {
     function SongPlayer() {
          var SongPlayer = {};
         
          var currentSong = null;
         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
          var currentBuzzObject = null;
         
         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */      
         var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
        }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
        });

            currentSong = song;
     };
        
         var playSong = function(private) {
            currentBuzzObject.play();
            song.playing = true;
        }
         /**
         * @function SongPlayer
         * @desc Update the play method with a condition that checks if the currently playing song is not equal to the song the user clicks
         * @param {Object} song
         */     
          SongPlayer.play = function(song) {
            if (currentSong !== song) {
                 setSong(song);
                 currentBuzzObject.play();
                 song.playing = true;
            } else if (currentSong === song) {
            if (currentBuzzObject.isPaused()) {
                currentBuzzObject.play();
            }
        }
     };          
         /**
         * @function SongPlayer.pause
         * @desc Pause currently playing song
         * @param {Object} song
         */      
        SongPlayer.pause = function(song) {
        currentBuzzObject.pause();
        song.playing = false;
        };
          return SongPlayer;
    }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();