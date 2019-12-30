// gets the element where the word or sentence being guessed will be displayed
const answerDisplayEl = document.getElementById("answerDisplay");

// recieves html from the server to display. This is a bunch of divs that equate to whatever the user must guess, the answer.
axios.get('/api/answers')
        .then(function ({data}) {
          // changes the html to the recieved html from the server, which is what the user is guessing.
          answerDisplayEl.innerHTML = data;
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
        .finally(function () {
        // always executed
        });
