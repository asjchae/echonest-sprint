$(function(){
    //login function. Sends username and password to verification. Server redirects if successful, returns Incorrect message if not.
    $("#login").click( function (evt) {
        $.post("/signin", {inputUsername:$("#inputUsername")[0].value, inputPassword: $('#inputPassword')[0].value}, function(data) {
            $("#page").append(data)
        })
    })
})