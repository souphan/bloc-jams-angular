 (function() {
     function SongPlayer($rootScope, Fixtures) {
         var SongPlayer = {};
        
         /**
         * @desc Inject the Fixtures service into the SongPlayer service. Then use the getAlbum method to store the album information
         * @type {Object} getAlbum method
         */
         var currentAlbum = Fixtures.getAlbum();
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
                SongPlayer.currentSong.playing = null;
        }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
        });
             
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
             });
         });

            SongPlayer.currentSong = song;
        };
        
         var playSong = function(private) {
            currentBuzzObject.play();
            song.playing = true;
        }
         
        var stopSong = function(private) {
            currentBuzzObject.stop();
            song.playing = null;
         }
          /**
          * @desc function to get the index of a song
          * @type {Object} 
          * @param {Object} song
          */
        var getSongIndex = function(song) {
        return currentAlbum.songs.indexOf(song);
       };
          /**
          * @desc Active song object from list of songs
          * @type {Object}
          */
         SongPlayer.currentSong = null;
         
         /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
         SongPlayer.currentTime = null;
         
         /**
         * @desc set SongPlayer volume attribute to hold volume
         * @type {Object}
         */
         SongPlayer.volume  = null;
         
         /**
         * @function SongPlayer
         * @desc Update the play method with a condition that checks if the currently playing song is not equal to the song the user clicks
         * @param {Object} song
         */     
          SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                 setSong(song);
                 currentBuzzObject.play();
                 song.playing = true;
            } else if (SongPlayer.currentSong === song) {
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
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
            };
         /**
         * @function SongPlayer
         * @desc method to go to the previous song
         * @type
         */ 
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
             }
        };
         
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
             }
        };
         
         SongPlayer.setVolume = function(volume) {
             if (SongPlayer.volume) {
                 SongPlayer.setVolume(volume);
             }
         };

         var playerBar = $(element);

         attributes.$observe('max', function(newValue) {
             scope.max = newValue;
         });
         
         /**
         * @function setCurrentTime
         * @desc Set current time (in seconds) of currently playing song
         * @param {Number} time
         */
         SongPlayer.setCurrentTime = function(time) {
             if (currentBuzzObject) {
                 currentBuzzObject.setTime(time);
             }
         };
            return SongPlayer;
        }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
