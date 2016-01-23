 (function() {
     function seekBar($document) {
         var calculatePercent = function(seekBar, event) {
             var offsetX = event.pageX - seekBar.offset().left;
             var seekBarWidth = seekBar.width();
             var offsetXPercent = offsetX / seekBarWidth;
             offsetXPercent = Math.max(0, offsetXPercent);
             offsetXPercent = Math.min(1, offsetXPercent);
             return offsetXPercent;
     };
         
        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: {
                 onChange: '&'
             },
            link: function(scope, element, attributes) {
                // directive logic to return
             scope.value = 0;
             scope.max = 100;
                
             var seekBar = $(element);
             /**
             * @attributes observe method to monitor value changes to this directive
             * @desc code observes the values of the attributes we declare in the HTML by specifying the attribute name in the first argument. 
             When the observed attribute is set or changed, we execute a callback (the second argument)
             * @param
             * @type
             */
             attributes.$observe('value', function(newValue) {
                 scope.value = newValue;
             });

             attributes.$observe('max', function(newValue) {
                 scope.max = newValue;
             });        
                
             var percentString = function () {
                 var value = scope.value;
                 var max = scope.max;
                 var percent = value / max * 100;
                 return percent + "%";
             };
 
         /**
         * @function fill seek bar
         * @desc calculates seek bar and fills it
         * @param
         * @type
         */
             scope.fillStyle = function() {
                 return {width: percentString()};
             };
            
         /**
         * @function updates seek bar thumb
         * @desc calculates seek bar and fills it
         * @param
         * @type
         */
             scope.thumbStyle = function() {
                 return {width: percentString()};
             };
                
             scope.onClickSeekBar = function(event) {
                 var percent = calculatePercent(seekBar, event);
                 scope.value = percent * scope.max;
                 notifyOnChange(scope.value);
            };
         /** @desc user drags the seek bar and track thumb*/
             scope.trackThumb = function() {
                 $document.bind('mousemove.thumb', function(event) {
                     var percent = calculatePercent(seekBar, event);
                     scope.$apply(function() {
                         scope.value = percent * scope.max;
                         notifyOnChange(scope.value);
            });
             var notifyOnChange = function(newValue) {
                 if (typeof scope.onChange === 'function') {
                     scope.onChange({value: newValue});
                 }
             };
        });
 
             $document.bind('mouseup.thumb', function() {
                 $document.unbind('mousemove.thumb');
                 $document.unbind('mouseup.thumb');
             });
        };
        }
     };
}
 
     angular
         .module('blocJams')
         .directive('seekBar', ['$document', seekBar]);
 })();
