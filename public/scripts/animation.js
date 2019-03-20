$(document).ready(function () {

    $(".compose-button").click(() => {
        $(".new-tweet").animate({
            height: 'toggle'
        });
        $("textarea").focus();
        console.log("hello")
    });

});