document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');

    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // Function to handle cell clicks
    const handleCellClick = (index) => {
        if (gameActive && boardState[index] === '') {
            boardState[index] = currentPlayer;
            renderBoard();
            if (checkWin()) {
                status.textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
            } else if (checkDraw()) {
                status.textContent = 'It\'s a draw!';
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    };

    // Function to render the board
    const renderBoard = () => {
        board.innerHTML = '';
        boardState.forEach((cell, index) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.textContent = cell;
            cellDiv.addEventListener('click', () => handleCellClick(index));
            board.appendChild(cellDiv);
        });
    };

    // Function to check for a win
    const checkWin = () => {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return boardState[index] === currentPlayer;
            });
        });
    };

    // Function to check for a draw
    const checkDraw = () => {
        return boardState.every(cell => {
            return cell !== '';
        });
    };

    // Event listener for reset button
    resetButton.addEventListener('click', () => {
        currentPlayer = 'X';
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.textContent = `Player ${currentPlayer}'s turn`;
        renderBoard();
    });

    // Initial board render
    renderBoard();
});
