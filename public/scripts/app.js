$(document).ready(() => {

    //prevent XSS attacks
    function escape(str) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    function createTweetElement(tweet) {
        const output = `
        <article class="tweet">
        <header>
          <img src="${escape(tweet.user.avatars.large)}" alt="${escape(tweet.user.name)}'s avatar">
          <h2>${escape(tweet.user.name)}</h2><span>${escape(tweet.user.handle)}</span>
        </header>
        <div>
          ${escape(tweet.content.text)}
        </div>
        <footer>
          ${escape(tweet.created_at)}
          <span class="favicons">
            <i class="fas fa-heart"></i><i class="fas fa-flag"></i><i class="fas fa-retweet"></i>
          </span>
        </footer>
      </article>
        `;
        return output;
    }

    function renderTweets(tweets) {
        $("#tweet-container").empty();
        for (let object = 0; object < tweets.length; object++) {
            $('#tweet-container').prepend(createTweetElement(tweets[object]));
        }
    }

    function loadTweets() {
        $.getJSON("http://localhost:8080/tweets/")
            .then(tweets => {
                return renderTweets(tweets);
            });
    }

    $("form").submit(function (event) {
        event.preventDefault();
        const $tweetText = $("textarea").val().trim();
        if ($tweetText.length <= 140 && $tweetText.length > 0) {
            const $tweetToPost = $("textarea").serialize();
            $.ajax("/tweets/", { method: "POST", data: $tweetToPost })
                .then(() => {
                    loadTweets();
                    $("textarea").val("").attr("placeholder", "What are you quacking about?");
                    $(".counter").text(140);
                });
        } else if ($tweetText === "" || $tweetText === null || $tweetText.length > 140) {
            $("#popup").slideDown("fast", () => { });
        } else {
            console.log("congrats on finding a new edge case");
        }
    })

    $(".compose-button").click(() => {
        $(".new-tweet").slideDown("fast", () => { });
        $("textarea").focus();
        $(".compose-button").css("display", "none")
    });

    $("textarea").on("input", () => {
        $("#popup").slideUp("fast", () => { });
    })

    loadTweets();

});