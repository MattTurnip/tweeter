$(document).ready(function () {
    function escape(str) {
        var div = document.createElement('div');
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
          <p>${escape(tweet.content.text)}</p>
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
            $.ajax("/tweets/", { method: "POST", data: $tweetToPost })
                .success(() => {
                    loadTweets()
                    $("textarea").val("");
                });
        } else if ($tweetText === "" || $tweetText === null || $tweetText.length > 140) {
            $("textarea").attr("placeholder", "Please enter something between 1 and 140 characters");
            alert("enter something between 1 and 140 chars");
        } else {
            console.log("congrats on finding a new edge case");
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