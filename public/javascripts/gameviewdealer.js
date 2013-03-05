$(function(){

  var dealerupdate = function(){
    $.get("/getupdates", function(data){
        $("#gameview").remove()
        $("#page").append(data)          
    })
  }

  var dealerinterval = setInterval(dealerupdate, 5000);
})