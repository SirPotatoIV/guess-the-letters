// gets the element where the word or sentence being guessed will be displayed
const answerDisplayEl = document.getElementById("answerDisplay");
const lettersToGuessEl = document.getElementById("lettersToGuess");
const lettersGuessedEl = document.getElementById("lettersGuessed");
const startBtnEl = document.getElementById("startBtn");

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

function startBtn(){
  startBtnEl.addEventListener("click", async function(){
    try{const {data} = await axios.get('/api/round')
        const {roundId, roundHtml} = data;
        // console.log("Start round data recieved.", roundId)
        localStorage.setItem("roundId", roundId);
        answerDisplayEl.innerHTML = roundHtml;
    }
    catch(err) {
      console.log("start button error: ", err)
    }
  })
}
startBtn()

function renderAnswerDisplay(){
  // recieves html from the server to display. This is a bunch of divs that equate to whatever the user must guess, the answer.
  axios.get('/api/answers')
    .then(function ({roundHtml, roundId}) {
      // changes the html to the recieved html from the server, which is what the user is guessing.
      localStorage.setItem(roundId);
      console.log(roundHtml, roundId)
      answerDisplayEl.innerHTML = roundHtml;
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
    const outcome = await axios.put('/api/answers', {
      letterGuessed: letterGuessed,
      roundId: roundId
    })

    console.log(outcome)

  } catch(error) {
    // handle error
    console.log(error);
  }
}

