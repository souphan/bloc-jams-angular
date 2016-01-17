(function() {
     function AlbumCtrl(Fixtures, SongPlayer) {
         this.albumData = Fixtures.getAlbum();
         this.songPlayer = SongPlayer;
     }

     angular
         .module('blocJams')
         .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
 })();

/*
(function() {
     function AlbumCtrl(Fixtures) {
         this.albumData = angular.copy(albumPicasso)
         }
(function() {
     function AlbumCtrl() {
         this.albumData = albumPicasso;
         
     }
 
     angular
         .module('blocJams')
         .controller('AlbumCtrl', AlbumCtrl);
 })();


         function CollectionCtrl() {
     this.albums = [];
     for (var i=0; i < 12; i++) {
         this.albums.push(angular.copy(albumPicasso));
     }
 }*/