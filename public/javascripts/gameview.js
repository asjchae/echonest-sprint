$(function() {
  $.getScript('https://raw.github.com/rdio/jquery.rdio.js/master/jquery.rdio.js', function(){
    $(".playbutton").click(function(){
        console.log(this.id);
        $('#'+this.id).bind('ready.rdio', function() {
            $(this).rdio().play(this.id);
        });
        $('#'+this.id).rdio('GAlNi78J_____zlyYWs5ZG02N2pkaHlhcWsyOWJtYjkyN2xvY2FsaG9zdEbwl7EHvbylWSWFWYMZwfc=');
    })

    $(".submitbutton").click(function(){
        console.log(this.id);
        $.post("/playersubmit", this.id);
            
    })
  })


  // $('#api').bind('ready.rdio', function() {
  //   $(this).rdio().play('t21400296');
  // });
  // $('#api').bind('playingTrackChanged.rdio', function(e, playingTrack, sourcePosition) {
  //   if (playingTrack) {
  //     duration = playingTrack.duration;
  //     $('#art').attr('src', playingTrack.icon);
  //     $('#track').text(playingTrack.name);
  //     $('#album').text(playingTrack.album);
  //     $('#artist').text(playingTrack.artist);
  //   }
  //   });
  // $('#api').bind('positionChanged.rdio', function(e, position) {
  //   $('#position').css('width', Math.floor(100*position/duration)+'%');
  // });
  // $('#api').bind('playStateChanged.rdio', function(e, playState) {
  //   if (playState == 0) { // paused
  //     $('#play').show();
  //     $('#pause').hide();
  //   } else {
  //     $('#play').hide();
  //     $('#pause').show();
  //   }
  // });
  // // this is a valid playback token for localhost.
  // // but you should go get your own for your own domain.
  // $('#api').rdio('GAlNi78J_____zlyYWs5ZG02N2pkaHlhcWsyOWJtYjkyN2xvY2FsaG9zdEbwl7EHvbylWSWFWYMZwfc=');

  // $('#previous').click(function() { $('#api').rdio().previous(); });
  // $('#play').click(function() { $('#api').rdio().play(); });
  // $('#pause').click(function() { $('#api').rdio().pause(); });
  // $('#next').click(function() { $('#api').rdio().next(); });
})    