document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");
    const resetButton = document.getElementById("reset");
    const turnDisplay = document.getElementById("turn");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""]; // Represents the 3x3 board

    // Create the tic-tac-toe board
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }

    // Handle clicks on cells
    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = clickedCell.dataset.index;

        // Check if the cell is already filled or if the game is over
        if (gameBoard[clickedCellIndex] !== "" || checkForWinner()) {
            return;
        }

        // Update game state
        gameBoard[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        // Check for a winner
        if (checkForWinner()) {
            turnDisplay.textContent = `Player ${currentPlayer} wins!`;
        } else if (checkForDraw()) {
            turnDisplay.textContent = "It's a draw!";
        } else {
            // Switch player
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            turnDisplay.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    // Reset the game
    resetButton.addEventListener("click", function() {
        currentPlayer = "X";
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
        turnDisplay.textContent = `Player ${currentPlayer}'s turn`;
    });

    // Function to check for a winner
    function checkForWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }
        return false;
    }

    // Function to check for a draw
    function checkForDraw() {
        return !gameBoard.includes("");
    }
});
