$(document).ready(function () {




    // Fake data taken from tweets.json
    // const dataStore = [
    //     {
    //         "user": {
    //             "name": "Newton",
    //             "avatars": {
    //                 "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
    //                 "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
    //                 "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    //             },
    //             "handle": "@SirIsaac"
    //         },
    //         "content": {
    //             "text": "If I have seen further it is by standing on the shoulders of giants"
    //         },
    //         "created_at": 1461116232227
    //     },
    //     {
    //         "user": {
    //             "name": "Descartes",
    //             "avatars": {
    //                 "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
    //                 "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
    //                 "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
    //             },
    //             "handle": "@rd"
    //         },
    //         "content": {
    //             "text": "Je pense , donc je suis"
    //         },
    //         "created_at": 1461113959088
    //     },
    //     {
    //         "user": {
    //             "name": "Johann von Goethe",
    //             "avatars": {
    //                 "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
    //                 "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
    //                 "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
    //             },
    //             "handle": "@johann49"
    //         },
    //         "content": {
    //             "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    //         },
    //         "created_at": 1461113796368
    //     }
    // ];

    //create a string of html from object data



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
            $('#tweet-container').append(createTweetElement(tweets[object]));
        }
    }

    //ajax post request that serializes textarea value maybe a mistake here?
    $("form").submit(function (event) {
        event.preventDefault();
        console.log("you submitted wow");
        if ($("textarea").val().length <= 140) {
            var $tweetText = $("textarea").serialize();
            console.log($tweetText);
            $.ajax($tweetText, { method: "POST" });
        } else {
            console.log("tweet too long");
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