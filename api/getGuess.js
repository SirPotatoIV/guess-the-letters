const axios = require('axios')

// https://github.com/axios/axios
async function requestApi(){
    // Make a request for a tv show or movie title from omdb that will be used as the answer the user must guess.
    try{ 
        const {data} = await axios.get('http://omdbapi.com/?apikey=24eb1040&s=star%20wars&type=movie')
        // currently just console logging the data, will eventually send a title to another part of the code.
        const randomAnswer = Math.floor(Math.random()*data.Search.length)
        console.log(data.Search[randomAnswer].Title);
    }
    catch(error) {
        // handle error
        console.log(error);
    }
}
requestApi();

