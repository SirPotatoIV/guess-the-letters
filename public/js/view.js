// gets the element where the word or sentence being guessed will be displayed
// const answerDisplayEl = document.getElementById("answerDisplay");

function renderAnswerDisplay(){
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
}
// renderAnswerDisplay()

const lettersToGuessEl = document.getElementById("lettersToGuess");
const lettersGuessedEl = document.getElementById("lettersGuessed");

function renderLettersToGuess(){
  let lettersToGuessHtml = "";
  
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  letters.map(function(letter, i){
   
    lettersToGuessHtml = lettersToGuessHtml + `<button class="guessLetters" id="guess-${letter}">${letter}</button>`;
  })
  
  lettersToGuessEl.innerHTML = lettersToGuessHtml;
  startGuessLetterTriggers();
}
renderLettersToGuess()

function startGuessLetterTriggers(){
  
  const lettersToGuessEls = document.querySelectorAll(".guessLetters");
  // console.log(lettersToGuessEls)
  for (const letter of lettersToGuessEls){
    letter.addEventListener('click', function(){
      letterRemoval();
      lettersGuessedRender();
      checkGuess();      
    })
  }
}

function letterRemoval(){
  const currentId = event.target.id;
  const currentLetter = document.getElementById(`${currentId}`)
  currentLetter.classList.add("guessed")
}

function lettersGuessedRender(){
  const letterGuessed = event.target.innerText;
  const lettersAlreadyGuessed = lettersGuessedEl.innerText;
  const allLettersGuessed = lettersAlreadyGuessed + letterGuessed;

  lettersGuessedEl.innerText = allLettersGuessed;
}

async function checkGuess(){
  try {
    const outcome = await axios.post('/api/answers', {test: 'test'})

    console.log(outcome)

  } catch(error) {
    // handle error
    console.log(error);
  }
}

