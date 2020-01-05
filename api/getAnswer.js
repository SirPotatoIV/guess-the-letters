const axios = require('axios')

// https://github.com/axios/axios
async function getAnswer(){
    // Make a request for movie titles from omdb that will be used as the answer the user must guess.
    // -- Currently just searching for Star Wars movies. API needs a search term. Tried "Marvel", but it didn't return great results.
    try{ 
        const response = await axios.get('http://omdbapi.com/?apikey=24eb1040&s=star%20wars&type=movie')
        // makes referencing the response less complicated.
        const searchResults = response.data.Search;
        // Creates a random index to select a random title from the search results.
        const randomTitleIndex = Math.floor(Math.random()*searchResults.length)
        // stores the random title selected
        const randomTitle = searchResults[randomTitleIndex].Title;
        // console.log(randomTitle);
        // returns a movie title to be used as an asnwer
        return randomTitle;
    }
    catch(error) {
        // handle error
        console.log(error);
    }
}

module.exports = getAnswer;



