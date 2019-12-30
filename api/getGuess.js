const axios = require('axios')

// https://github.com/axios/axios
function requestApi(){
    // Make a request for a tv show or movie title from omdb that will be used as the answer the user must guess.
    axios.get('http://omdbapi.com/?apikey=24eb1040&t=the+matrix')
        // deconstructs the response to just get the data, which is all we care about.
        .then(function ({data}) {
            // currently just console logging the data, will eventually send a title to another part of the code.
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