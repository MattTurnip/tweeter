$(document).ready(function () {


    function createTweetElement(tweet) {
        const output = `
        <article class="tweet">
        <header>
          <img src="${tweet.user.avatars.large}" alt="${tweet.user.name}'s avatar">
          <h2>${tweet.user.name}</h2><span>${tweet.user.handle}</span>
        </header>
        <div>
          <p>${tweet.content.text}</p>
        </div>
        <footer>
          ${tweet.created_at}
          <span class="favicons">
            <i class="fas fa-heart"></i><i class="fas fa-flag"></i><i class="fas fa-retweet"></i>
          </span>
        </footer>
      </article>
        `;
        return output;
    }

    function renderTweets(tweets) {
        for (let object = 0; object < tweets.length; object++) {
            $('#tweet-container').prepend(createTweetElement(tweets[object]));
        }
    }



    //maybe a mistake here?
    $("form").submit(function (event) {
        event.preventDefault();
        const $tweetText = $("textarea").val().trim();

        if ($tweetText.length <= 140 && $tweetText.length > 0) {
            const $tweetToPost = $("textarea").serialize();
            console.log("your serialized tweet:", $tweetToPost);
            $.ajax("/tweets/", { method: "POST", data: $tweetToPost });
        } else if ($tweetText === "" || $tweetText === null) {
            $("textarea").attr("placeholder", "Please enter something between 1 and 140 characters");
            alert("enter something between 1 and 140 chars")
        } else {
            console.log("be afraid");
        }


    })

    function loadTweets() {
        $.getJSON("http://localhost:8080/tweets/")
            .then(tweets => {
                return renderTweets(tweets);
            });
    }


    loadTweets();

});