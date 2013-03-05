$(function() {
  $.getScript('https://raw.github.com/rdio/jquery.rdio.js/master/jquery.rdio.js', function(){
    $(".playbutton").click(function(){
        console.log(this.id);
        console.log($('#'+this.id))
        if ($('#'+this.id)[0].textContent == "Play"){
          $('#'+this.id)[0].textContent = "Pause"
          $('#'+this.id).bind('ready.rdio', function() {
              $(this).rdio().play(this.id);
          });
          $('#'+this.id).rdio('GAlNi78J_____zlyYWs5ZG02N2pkaHlhcWsyOWJtYjkyN2xvY2FsaG9zdEbwl7EHvbylWSWFWYMZwfc=');
        } else if ($('#'+this.id)[0].textContent == "Pause"){
          $('#'+this.id)[0].textContent = "Play"
          $('#'+this.id).rdio().pause()        
        }
    })

    //actual token 'GB9RNVyF_____3RyYnR6czNqcnE0ejN5cWE2a3l4a3V3bmRyeS13b29kbGFuZC05NDgwLmhlcm9rdWFwcC5jb23SVXD5VVuhJReswyax9tJf')

    $(".submitbutton").click(function(){
        console.log(this.id);
        $.post("/dealerwait", {title: this.id})
        $.post("/playersubmit", {title: this.id}, function(data) {
          $("#gameview").remove()
          $("#page").append(data)
          clearInterval(x);
        });
    })

    $(".selectbutton").click(function(){
        console.log(this.id);
        $.post("/dealersubmit", {title: this.id});

    })

    var start = new Date;

    var timer = function() {
      var currtime = Math.floor((new Date).getTime()/1000)
 
      var time = 60 - Math.floor((new Date - start) / 1000)
      if (time==0){
        clearInterval(x);
        $.get("/roundfinish", function(data) {
          $("#gameview").remove()
          $("#page").append(data)
          
        });   
      }
      $('.Timer').text( ( time ) + " Seconds");
    }  

    var x = setInterval(timer, 1000);


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