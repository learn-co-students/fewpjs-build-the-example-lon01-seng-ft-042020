// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

//Add .hidden class to the error modal in the HTML so it does not appear when the page first loads
 const errorStrip = document.querySelector("#modal");
 errorStrip.setAttribute("class", "hidden")

document.addEventListener("DOMContentLoaded", () => { 
 

  //Add event listener for when a user clicks on an empty heart
  //Find all the hearts
  const allHearts = document.querySelectorAll(".like-glyph");
  //Iterate over the array of all hearts
  for (const heart of allHearts){
    //Add an event listener for a click event on an empty heart
    if (heart.innerHTML == EMPTY_HEART){
      heart.addEventListener("click", function() {
       //Invoke mimicServerCall to simulate making a server request
       //Which randomly fails to simulate faulty network conditions
       mimicServerCall(url="http://mimicServer.example.com", config={});
       //When the server returns a success status
       //Change the heart to a full heart
       //Add the .activated-heart class to make the heart appear red
       .then(() => {
        heart.innerHTML = FULL_HEART;
        heart.setAttribute("class", "activated-heart");
        }
       )
       //When the server returns a failure status
       .catch((returnMessage) => {
         //Display the error modal by removing the .hidden class
        errorStrip.removeAttribute("class");
        //Display the server error message in the modal
        const errorMessage = document.querySelector("#modal-message");
        errorMessage.innerHTML = returnMessage;
        //Hide the modal after 5 seconds (5k milliseconds)
        setTimeout(() => { errorStrip.setAttribute("class", "hidden") }, 5000);
       })
      })
    }
    //Add an event listener for a click event on a FULL heart
    else { 
      heart.addEventListener("click", () => {
        //Change the heart back to an empty heart
        heart.innerHTML = EMPTY_HEART;
        //Remove the .activated-heart class
        heart.removeAttribute("class");
      })
    }
  }
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
