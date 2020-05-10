//***************************************
// pseudocode - Last Revision - 050820
//***************************************


// Determine the constants for the game
---> // Declare a variable with an object of difficulty levels and any objects we’ll need
    ---> // Squares on x-axis
    ---> // Squares on y-axis
    ---> // Background color reference
    ---> // Number of mines placed
    ---> // Score needed to win
    // Declare a object with the states of our squares
    // Occupied by mines
    ---> // color/Image reference
    // We will use the index of the a square based on how our difficulty to occupy a square with a mine.
    // Place the indexes into an array and assign to variable of mines.
    ---> //Uncovered State
    ---> // Color reference
    ---> // Covered State
    ---> /// Color reference
    ---> // Create an object for the different states of our emoji guy
    ---> // Normal
    ---> // Active
    ---> // Lose
    ---> // Win
    ---> //  Create an object for audio clips
    ---> //  Uncover square
    ---> //  Click
    ---> //  Adjacent squares
    ---> //  Game start
    ---> //  Game reset
    ---> //  Lose
    ---> //  win
    ---> // Instantiate our winner accumulator variable to zero.
    // Intantate our game board
    ---> //Instantiate difficulty

    // Create any cached element references
    // Emoji element for our “messaging”
    // Body for background image changing

    // Establish any event listeners
    ---> // Create an event listener for our squares
    // Will be used for our square actions and timer
    ---> // Also will invoke our handleClick function
    ---> // Create an event listener for our difficulty selector
    ---> //Create an event listener for our flag
    XX--// button in nav
// Right click on square
---> // Create an event listener for our reset button
    ---> //  Create event listener for “cheat code”
    XX// Sequence of keypresses

// Create our Initialization function
---> // Create our board
    ---> // Reference our difficulty object for our game board information
    ---> // Append elements to the DOM to create board
    ---> // Set difficulty to spicy (default)
    // Reset our timer and and a click event to start


    ---> // create random landmines function
    ---> //add isolate random squares    
    ---> //find random number along x-axis
    ---> //ind random number along y-axis
    ---> //oncatenate randX and randY to find ID of current square
    ---> //push random square to occupied array for later use

// Create our handle click function
    // If click on square
        //invoke win-logic function
    // If current index is not occupied by a mine, 
        //invoke uncoverSquares functions 
    // Clicks on flag icon or right clicks on a square element, invoke our flag function
    // When game starts, change the emoji guy to our ‘normal’ state to render
    // When user clicks on an square, send active state to render function

// Create uncoversquares function
    // Check to see if adjacent squares are empty (check in the following pattern:
            // Top, top-right, right, bottom-right, bottom, bottom-left, left, top-left
                // While adjacent squares are empty
                    // Check next set of adjacent squares
                // If the adjacent square is occupied by a mine
                    // Place the number of elements that have a mine in the uncovered element
    // Add number of uncovered squares to our winner accumulator value.

// Create our flagging function
        // right click allows the user to place a flag

// Create our win-logic function
    // If the current index matches anything in our occupied mines array.
        // If winner is === -1, send losing parameter to render function.
    // If winner is === to minimum based on difficulty,
        //send win parameter to our render function.

// Create our Render function
    // Audio
        // When user click on uncovered square
        // Uncovering adjacent squares
        // Game start
        // Game end
    // Display
        // While game is playing, show normal emoji guy
        // If argument is win, change emoji to sunglasses guy
        // If argument is active, change emoji to shocked guy
        // If argument is lose, change emoji to x-eyes guy

