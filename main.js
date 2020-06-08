// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'
let allHearts = document.querySelectorAll('.like-glyph')

let glyphStates = {
  "♡": "♥",
  "♥": "♡"
};

let colorStates = {
  "red" : "",
  "": "red"
};

// Your JavaScript code goes here!
document.addEventListener('DOMContentLoaded', () => {

const like = (e) => {
  mimicServerCall("http://mimicServer.example.com")
  // this is where the heart should change style and color
  .then(resp => {
    e.target.innerText = glyphStates[e.target.innerText];
    e.target.style.color = colorStates[e.target.style.color]
  })
  // this is wehere the error messahe goes from hidden to visible for 5 seconds 
  .catch(error => {
    document.querySelector('#modal').className = "";
    setTimeout(() => {document.querySelector('#modal').className = "hidden"}, 2000);
  });
};

// add an event listener to all hearts 
for (const heart of allHearts) {
heart.addEventListener('click', like)
};

})

//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
