const axios = require('axios')

// https://github.com/axios/axios
function requestApi(){
    // Make a request for a user with a given ID
    axios.get('http://omdbapi.com/?apikey=24eb1040&t=the+matrix')
        .then(function ({data}) {
        // handle success
        console.log(data);
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
        .finally(function () {
        // always executed
        });
}
requestApi();