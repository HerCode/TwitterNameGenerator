angular.module('twitterApp').controller('MainController', function($http){
  var vm = this;
  vm.nouns = [];
  vm.adjectives = [];
  vm.usernames = [];

  vm.getNouns = function() {
      $http.get('/nouns').then(function(response){
        console.log('Here are all of your nouns: ', response)
        vm.nouns = response.data;

        })
  }
  vm.getAdjectives = function() {
  $http.get('/adjectives').then(function(response){
    console.log('Here are all of your adjectives: ', response)
    vm.adjectives = response.data;

    })
  }

  vm.getNouns();
  vm.getAdjectives();

    vm.randomNames = function() {

      vm.nouns = shuffle(vm.nouns);
      vm.adjective = shuffle(vm.adjectives);
      for(i=0; i < 10; i++) {
          vm.usernames[i] = vm.adjectives[i] + vm.nouns[i];
          if (vm.usernames[i].length > 15){
            vm.usernames[i] = vm.adjectives[i] + "Ox";
          }
      }
      console.log('here are your usernames', vm.usernames);
    }

    function shuffle(array) {
      var m = array.length, t, i;
      // While there remain elements to shuffle…
      while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
      return array;
    }

  })
