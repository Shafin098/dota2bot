console.log("bot is starting");

var Twit = require('twit');
// var config = require('config');
var T = new Twit({
  consumer_key:         '32yctIg7WIVxc4UbScngUgxDF',
  consumer_secret:      'OWX2YDzMJzYVvkHw0mHny0qGNMB3Kiz1oBTjxuQ1r10iSbyVjB',
  access_token:         '888603347535581189-6rCJJDXntGB9jPpBV1zyeWDn0GDIEfP',
  access_token_secret:  'jywtCMo9S9SlpNHxIb0AolOTL76rFeBRkCrDUZrP9OpMh'
});

tweetIt();
setInterval(tweetIt, 60000*35)

function tweetIt() {

    var random = Math.floor(Math.random()*100);

    var params = {
      q: '#ti7',
      count: 5
    }

    T.get('search/tweets', params, gotData);



    function gotData(err, data, response) {
      var tweets = data.statuses;
      for (var i = 0; i < tweets.length; i++) {
          console.log(tweets[i].user.screen_name);

          var tweet = {
            status:  '@' + tweets[i].user.screen_name + ' Arteezy will win #ti7 this time I am' + ' ' + random + '% sure'
          }
          T.post('statuses/update', tweet, tweeted);

          function tweeted(err, data, response) {
            if (err) {
              console.log('not working');
            } else {
                console.log('worked');
            }
          }

      }
    };
}
