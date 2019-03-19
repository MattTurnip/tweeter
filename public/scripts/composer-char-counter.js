
$(document).ready(function () {
    console.log("fully loaded, jquery ready ;\)")
});

$("textarea").on("input", function () {
    let charCount = 140 - this.value.length;
    if (charCount > 0) {
        $(".counter").text(charCount).removeClass("red-text");
    } else if (charCount === 0) {
        $(".counter").text(charCount).removeClass("red-text");
    } else {
        $(".counter").html(charCount).addClass("red-text");
    }
});