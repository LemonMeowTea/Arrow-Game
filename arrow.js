let arrows = ['↔', '↔', '↔', '↔', '↔']; // Default arrow representations
let color = ""
let uniformDirection = "";
let centerArrowDirection = "";
let count = 0;
let gameEnd = false;
let time = 60;
const startButton = document.getElementById('startButton');
const arrowsContainer = document.getElementById('arrowsContainer');


function timer(){
    if(time <=0){
        gameEnd = true;
        document.getElementById("time").innerHTML= "End"
        return;
    }
    document.getElementById("time").innerHTML= --time;
    setTimeout(timer,1000)
}

// Function to start the game
startButton.onclick = () => {
    startGame();
    timer()
};

function startGame() {
    arrowsContainer.style.display = 'flex'; // Show arrow container
    createArrows(); // Generates and displays arrows
}

// Function to generate directions and colors for arrows
function createArrows() {
    // Randomly determine arrow directions
    uniformDirection = Math.random() < 0.5 ? '←' : '→'; // 50% chance for left or right
    centerArrowDirection = Math.random() < 0.5 ? '←' : '→';

    // Update arrows array
    arrows[0] = uniformDirection; // arr1
    arrows[1] = uniformDirection; // arr2
    arrows[3] = uniformDirection; // arr4
    arrows[4] = uniformDirection; // arr5
    arrows[2] = centerArrowDirection; // arr3 - may have different direction

    // Randomly choose a color for the arrows
    const colorChoice = Math.random();
    if (colorChoice < 0.1) { // 33% chance for black
        color = 'black';
        drawArrows(color); // Only draw the center arrow for black
    } else if (colorChoice < 0.55) { // 33% chance for blue
        color = 'blue';
        drawArrows(color); // Show all arrows for blue
    } else { // 34% chance for red
        color = 'red';
        drawArrows(color); // Show all arrows but require input for non-center
    }

}

// Function to draw arrows based on the color
function drawArrows(color) {
    const arrowElements = document.querySelectorAll('#arrowsContainer .arrow'); // Get arrow elements


    //arrowElements[0].innerHTML = ""
    
    for (let i = 0; i < arrowElements.length; i++)
        // arrowElements[i].classList.remove('hidden'); 
        arrowElements[0].innerHTML = arrows[i];


    for (let i = 0; i < arrowElements.length; i++) {
        arrowElements[i].textContent = arrows[i]; // Set the arrow direction
        arrowElements[i].style.color = color;
    }


    // Work with hiding logic
    if (color === 'black') {
        // Hide all except the center arrow
        for (let i = 0; i < arrowElements.length; i++) {
            if (i !== 2) {
                arrowElements[i].innerHTML=""; // Add class to hide
            }
        }
    }

    setTimeout(()=>{
        for (let i = 0; i < arrowElements.length; i++)
                arrowElements[i].innerHTML = "" 
    },200)


}

// Adding controls for user input
document.addEventListener('keydown', (event) => {

    if(!gameEnd){ 
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            const direction = (event.key === 'ArrowLeft') ? '←' : '→';

            // Check against the current direction (which is for the center arrow)
            if ((color=== "blue" || color==="black") && (direction === centerArrowDirection) || (color=== "red") && (direction === uniformDirection)) {
                document.getElementById("mark").textContent = ++count;
                document.getElementById("correct").textContent = "correct";
            } else {
                document.getElementById("correct").textContent = "wrong";
            }
        }

        
            createArrows()
    }    
});