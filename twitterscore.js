var request = require('request');
var Twit = require('twit');

var T = new Twit({
    consumer_key: '
    consumer_secret: '
    access_token: '
    access_token_secret: '
});

var p_matchId;
var c_matchId;

setInterval(function() {
    request('https://api.opendota.com/api/proMatches',
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var importedJSON = JSON.parse(body);
                console.log("bot is starting");
                c_matchId = importedJSON[0].match_id;
                if (p_matchId !== c_matchId) {
                    //  console.log(importedJSON[0]);

                    if (importedJSON[0].radiant_win == 'true') {
                        var f_tweet = "#Dota2 " + importedJSON[0].league_name + ". " + importedJSON[0].radiant_name + ' vs ' + importedJSON[0].dire_name +
                            ". " + importedJSON[0].radiant_name + " wins";
                        var tweet = {
                            status: f_tweet
                        }
                        T.post('statuses/update', tweet, tweeted);

                        function tweeted(err, data, response) {
                            if (err) {
                                console.log('not working');
                            } else {
                                console.log('worked');
                            }
                        }
                    } else {
                        var f2_tweet = "#Dota2 " + importedJSON[0].league_name + ". " + importedJSON[0].radiant_name + " vs " + importedJSON[0].dire_name +
                            ". " + importedJSON[0].dire_name + " wins";
                        var tweet = {
                            status: f2_tweet
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

                } else {
                    console.log("no new match");
                }
                p_matchId = c_matchId;
            }
        });
}, 60000 * 10);
