var app = angular.module('nbaRoutes');

app.service('teamService', function ($http, $q, $stateParams) {

  this.addNewGame = function(gameObj){
    var url = 'https://api.parse.com/1/classes/' + gameObj.homeTeam;

    var homeScore = parseInt(gameObj.homeTeamScore);
    var opponentScore = parseInt(gameObj.opponentScore);

    if(homeScore > opponentScore){
      gameObj.won = true;
    }else{
      gameObj.won = false;
    }

    return $http.post(url, gameObj);
  }

  this.getTeamData = function(team){
    var dfd = $q.defer();
    var url = 'https://api.parse.com/1/classes/' + team;

    $http.get(url).then(function(res){
      var results = res.data.results;
      var wins = 0;
      var losses = 0;

      for(var i = 0; i < results.length; i++){
        if(results[i].won === true){
          wins++;
        }else{
          losses++;
        }
      }
      results.wins = wins;
      results.losses = losses;

      dfd.resolve(results);
    })

    return dfd.promise;
  }

});
