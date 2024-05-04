// Define the gridSections, currentPlayer, turnDisplay, and winningConditions as constants
let gridSections = document.querySelectorAll('.grid-section');
let currentPlayer = 'X'; 
let turnDisplay = document.querySelector('.turnDisplay');

// Function to initialize the restart button and add event listener
const initialiseRestartButton = () => {
    const button = document.querySelector('.restartButton');
    button.addEventListener('click', resetBoard);
    return button;
};

// Define winning conditions
let winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Function to switch the player
const switchPlayer = () => {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    turnDisplay.textContent = `Player ${currentPlayer}'s Turn`;
};



// Function to check if the game has ended
const checkGameEnd = () => {
    for (let i = 0; i < winningConditions.length; i++) {
        const combination = winningConditions[i];
        const symbols = combination.map(index => gridSections[index].textContent);
        const firstSymbol = symbols[0];
        if (firstSymbol && symbols.every(symbol => symbol === firstSymbol)) {
            return true; // Winning combination found
        }
    }
    alert(`Game over! Player ${currentPlayer} wins!`);
    return false; // No winning combination found
};

// Function to reset the board
let resetBoard = () => {
    gridSections.forEach(section => {
        section.textContent = '';
    });
    currentPlayer = 'X';
    turnDisplay.textContent = `Player ${currentPlayer}'s Turn`;
};

// Function to reset the entire game
let resetGame = () => {
    resetBoard();
};

// Function to handle a click on a grid section
const handleSectionClick = (e) => {
    const gridSection = e.target;

    if (!gridSection.textContent) {
        gridSection.textContent = currentPlayer;

        if (checkGameEnd()) {
            alert(`Game over! Player ${currentPlayer} wins!`);
            resetGame();
        } else {
            switchPlayer();
        }
    }
};

// Add event listeners to grid sections
gridSections.forEach(section => {
    section.addEventListener('click', handleSectionClick);
});

//logic above

turnDisplay = { textContent: '' };

 gridSections = [
    { textContent: '' }, { textContent: '' }, { textContent: '' },
    { textContent: '' }, { textContent: '' }, { textContent: '' },
    { textContent: '' }, { textContent: '' }, { textContent: '' }
];

let originalGridSections;

beforeEach(() => {
    originalGridSections = gridSections;
    gridSections = gridSections;
});

afterEach(() => {
    gridSections = originalGridSections; // Restore original gridSections after each test
});

const buttonMock = {
    addEventListener: jest.fn()
};

const sectionMock = {
    addEventListener: jest.fn(),
    textContent: ''
};

// Fake
const alertFake = jest.fn();

// Stub
const resetBoardStub = jest.fn();

describe('switchPlayer', () => {
    it('should switch currentPlayer from X to O', () => {
        currentPlayer = 'X'; // Ensure currentPlayer is initialized before each test
        switchPlayer();
        expect(currentPlayer).toBe('O');
    });

    it('should switch currentPlayer from O to X', () => {
        currentPlayer = 'O'; // Ensure currentPlayer is initialized before each test
        switchPlayer();
        expect(currentPlayer).toBe('X');
    });
});

describe('checkGameEnd', () => {
    beforeEach(() => {
        gridSections; // Ensure gridSections is initialized before each test
    });

    it('should return false when no winning condition is met', () => {
        gridSections = [
            { textContent: '' }, { textContent: '' }, { textContent: '' },
            { textContent: '' }, { textContent: '' }, { textContent: '' },
            { textContent: '' }, { textContent: '' }, { textContent: '' }
        ];
        let emptyGridState = ['', '', '', '', '', '', '', '', ''];
        expect(checkGameEnd(emptyGridState)).toBe(false);
    });
    

    it('should return true when a winning condition is met', () => {
        gridSections = [
            { textContent: 'X' }, { textContent: 'X' }, { textContent: 'X' },
            { textContent: '' }, { textContent: '' }, { textContent: '' },
            { textContent: '' }, { textContent: '' }, { textContent: '' }
        ];
        let winningGridState = ['X', 'X', 'X', '', '', '', '', '', ''];
        expect(checkGameEnd(winningGridState)).toBe(true);
    });
});

jest.spyOn(document, 'querySelector').mockReturnValue(buttonMock);
jest.spyOn(document, 'querySelectorAll').mockReturnValue([sectionMock, sectionMock, sectionMock, sectionMock, sectionMock, sectionMock, sectionMock, sectionMock, sectionMock]);
window.alert = alertFake;

describe('Game functionality UI tests', () => {
    //Mock
    it('should add event listener to button', () => {
        initialiseRestartButton();
        expect(buttonMock.addEventListener).toHaveBeenCalled();
    });

    //Fake
    it('should call alert when the game ends', () => {
        checkGameEnd();
        expect(alertFake).toHaveBeenCalled();
    });
    //Stub
    it('should call resetBoard when resetGame is called', () => {
        const resetBoardSpy = jest.fn(); // Create a mock function
        const originalResetBoard = resetBoard; // Store the original resetBoard function
        
        // Replace resetBoard with the mock function
        resetBoard = resetBoardSpy;

        resetGame();

        expect(resetBoardSpy).toHaveBeenCalled(); // Expect the resetBoard function to have been called
        
        // Restore the original resetBoard function
        resetBoard = originalResetBoard;
    });

    // Mockq
    it('should add event listener to grid sections', () => {
        let handleSectionClick = jest.fn(); // Create a mock function
        let originalHandleSectionClick = handleSectionClick; // Store the original handleSectionClick function
        
        // Replace handleSectionClick with the mock function
        handleSectionClick = handleSectionClick;

        // Create mock grid sections with addEventListener method
        const mockGridSections = Array.from({ length: 9 }, () => ({
            addEventListener: jest.fn(),
        }));

        mockGridSections.forEach(section => {
            section.addEventListener('click', handleSectionClick);
        });

        expect(mockGridSections[0].addEventListener).toHaveBeenCalled(); // Expect addEventListener to have been called on at least one grid section
            handleSectionClick = originalHandleSectionClick;
    });
        // Fake
        it('should display a congratulatory message when the game ends', () => {
            checkGameEnd();
            expect(window.alert).toHaveBeenCalledWith(`Game over! Player ${currentPlayer} wins!`);
        });

        // Stub
        it('should reset the board when resetGame is called', () => {
            resetGame();
            gridSections.forEach(section => {
                expect(section.textContent).toBe('');
            });
            expect(currentPlayer).toBe('X');
            expect(turnDisplay.textContent).toBe(`Player ${currentPlayer}'s Turn`);
        });
});

