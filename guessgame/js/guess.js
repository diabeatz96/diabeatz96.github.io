// Number guessing

let y = Math.floor(Math.random() * 100 + 1);
let guess = 1;
let score = 10;
const historyArray = [];
const backgroundArray = ["images/2825711.gif", "images/bg1.gif", "images/bg2.jpg", "images/b3.jpg", "images/b4.jpg"];
let currentBackground = 0;
let progressBar = document.querySelector(".progress-bar");

document.querySelector("#score").innerHTML = `Type a number to get started`;

if(currentBackground === 0) {
   document.querySelector("body").style.backgroundImage = `url('${backgroundArray[currentBackground]}')`;
}

/**
 *
 * UTILITY FUNCTIONS
 *
 * **/



/** Function for clicking on reset **/
document.querySelector("#reset").onclick = function() {
   historyArray.splice(0,historyArray.length);
   y = Math.floor(Math.random() * 100 + 1);
   score = 10;

   document.querySelector("#score").innerHTML = `Reset! Try again your life total is back to: ${score}`;
   document.querySelector(".card-text").innerHTML = "";

   progressBar.ariaValueNow = "0";
   progressBar.style.width = "0%";
};

/** Fun utility function for changing background back and forth. */

document.querySelector("#changebg").onclick = function() {
      if(currentBackground === 4) {
         currentBackground = 0;
         document.querySelector("body").style.backgroundImage = `url('${backgroundArray[currentBackground]}')`;
      } else {
         currentBackground++;
         document.querySelector("body").style.backgroundImage = `url('${backgroundArray[currentBackground]}')`;
      }
}



/*** MAIN CALL BACK FOR CLICK ON BUTTON
 *   MAIN SECTION PROCESS SCORE ETC.
 */
document.querySelector("#submit_guess").onclick = function()
{

   let x = document.querySelector("#guess_field").value;
   // Point system
   // starting score 

   if( x < 0 || x > 100) {
      document.querySelector("#score").innerHTML = `Please pick a number between 0 and 100`;
      return;
   }

   for(let number of historyArray) {
      if(x === number) {
         document.querySelector("#score").innerHTML = `You already picked that number.`;
         return;
      }
   }

   if (score == 0)
   {
      document.querySelector("#score").innerHTML = `You are at 0 health points! Click reset to try again`;
      return;
   }

   if(x == y)
      {
         document.querySelector('#score').innerHTML = "Great! You guessed the number right in " + guess + " guess! Your health is " + score + " points" ;
         progressBar.ariaValueNow = "100";
         progressBar.style.width = "100%";
      }
   else if(x > y)
      {
         guess++;
         score -= 1;
         historyArray.push(x);
         document.querySelector("#score").innerHTML = `Not a winner! Choose a smaller number! health: ${score}`;
         document.querySelector(".card-text").innerHTML += "<li>" + historyArray[historyArray.length - 1] + "</li>" ;
      }
   else if (x < y)
      {
         guess++;
         score -= 1;
         historyArray.push(x);
         document.querySelector("#score").innerHTML = `Not a winner! Choose a greater number! health: ${score}`;
         document.querySelector(".card-text").innerHTML += "<li>" + historyArray[historyArray.length - 1] + "</li>" ;
      }

   /** Determining progress bar width **/

   if(Math.abs(x - y) > 50) {
      progressBar.ariaValueNow = "25";
      progressBar.style.width = "25%";
   } else if(Math.abs(x - y) > 25) {
      progressBar.ariaValueNow = "50";
      progressBar.style.width = "50%";
   } else if(Math.abs(x - y) >= 2) {
      progressBar.ariaValueNow = "75";
      progressBar.style.width = "75%";
   }
}



