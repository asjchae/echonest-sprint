$(function(){

  $(".selectbutton").click(function(){
    console.log(this.id);
    $.post("/dealersubmit", {title: this.id});

  })

  var dealerupdate = function(){
    console.log("Here")
    $.get("/getupdates", function(data){
        $("#gameview").remove()
        $("#page").append(data)  

    })
  }

  var dealerinterval = setInterval(dealerupdate, 5000);
})