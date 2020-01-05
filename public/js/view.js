// gets the element where the word or sentence being guessed will be displayed
const answerDisplayEl = document.getElementById("answerDisplay");
const lettersToGuessEl = document.getElementById("lettersToGuess");
const lettersGuessedEl = document.getElementById("lettersGuessed");
const startBtnEl = document.getElementById("startBtn");

function renderLettersToGuess(){
  // Used to create a long string that will be used for changing the html to display a button for each letter that can be guessed by the player
  let lettersToGuessHtml = "";
  // All the possible letters the player can guess
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  // Every letter is taken and turned into a button.
  letters.map(function(letter, i){ 
    lettersToGuessHtml = lettersToGuessHtml + `<button class="guessLetters" id="guess-${letter}">${letter}</button>`;
  })
  // Changes the html to display all the letter buttons
  lettersToGuessEl.innerHTML = lettersToGuessHtml;
  // Calls function, which starts event listeners for each letter button
  startGuessLetterTriggers();
}
renderLettersToGuess()

function startBtn(){
  startBtnEl.addEventListener("click", async function(){
    // performs a route to the backend, which results in a new row being created in the database and returns the id of the row and the answer for the round.
    try{const {data} = await axios.get('/api/round')
      // deconstructs the information sent back by the backend
      const {roundId, roundHtml} = data;
      // The id of the row where the answer for this round is stored is saved in local storage to be used for reference
      localStorage.setItem("roundId", roundId);
      // changes the html to the recieved html from the server, which is what the user is guessing.
      answerDisplayEl.innerHTML = roundHtml;
    }
    catch(err) {
      // logs the message recieved if the axios get ends in an error
      console.log("start button error: ", err)
    }
  })
}
startBtn()

function startGuessLetterTriggers(){
  
  const lettersToGuessEls = document.querySelectorAll(".guessLetters");
  // console.log(lettersToGuessEls)
  for (const letter of lettersToGuessEls){
    letter.addEventListener('click', async function(){
      try{
        await letterRemoval();
      }
      catch(err){
        console.log(err)
      }
      try{
        await lettersGuessedRender();
      }
      catch(err){
        console.log(err)
      }
      try{
        await checkGuess();      
      }
      catch(err){
        console.log(err)
      }
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
  const letterGuessed = event.target.innerText;
  const roundId = localStorage.getItem('roundId')
  try {
    const {data} = await axios.put('/api/answers', {
      letterGuessed: letterGuessed,
      roundId: roundId
    })  
    const {guessCount, answerHtml} = data
    console.log(guessCount)
    answerDisplayEl.innerHTML = answerHtml
  } 
  catch(error) {
    // handle error
    console.log(error);
  }
}

