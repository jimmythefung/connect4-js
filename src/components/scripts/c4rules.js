// *****************
// Interface
// *****************
let BLANK = "";
export function create_board(m, n) {
    let empty_board = Array.from(Array(m), () => new Array(n).fill(BLANK));
    return empty_board;
}

export function place_token(column, gameBoard, symbol) {
    // Drop the token to the bottom at the given column
    // Note: slice is neccessary to trigger react to refresh/update the board
    for (let r = gameBoard.length - 1; r >= 0; r--) {
        if (gameBoard[r][column] === BLANK) {
            // Place the player's token based on the turn
            gameBoard[r][column] = symbol;
            return true;
        }
    }
    return false;
}

export function check_winner(board) {
    let [m, n] = [board.length, board[0].length];
    let hasWinner = false;
    let symbol = BLANK;
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            symbol = board[r][c];
            if (symbol != BLANK) {
                hasWinner = check_winner_helper(board, r, c, symbol);
                if (hasWinner) {
                    return true;
                }
            }
        }
    }
    return false;
}

export function get_ai_move(board, symbol) {
    let newBoard = board.map(function (arr) {
        return arr.slice();
    });
    let placed = false;
    let column = 0;
    while (!placed) {
        column = Math.floor(Math.random() * 7);
        placed = place_token(column, newBoard, symbol);
    }
    return column;
}

// *****************
// Helpers
// *****************
function check_winner_helper(board, r, c, symbol) {
    const win_length = 4;
    // const symbol = board[r][c];
    let h = scan_direction(board, r, c, win_length, "h", symbol);
    if (h === win_length) {
        return true;
    }
    let v = scan_direction(board, r, c, win_length, "v", symbol);
    if (v === win_length) {
        return true;
    }
    let dl = scan_direction(board, r, c, win_length, "dl", symbol);
    if (dl === win_length) {
        return true;
    }
    let dr = scan_direction(board, r, c, win_length, "dr", symbol);
    if (dr === win_length) {
        return true;
    }
    return false;
}

function scan_direction(board, r, c, l, direction, symbol) {
    let [m, n] = [board.length, board[0].length];
    // Base case: boundary check
    if (r > m - 1 || r < 0) {
        return 0;
    }
    if (c > n - 1 || c < 0) {
        return 0;
    }
    if (l === 0) {
        return 0;
    }
    if (direction === "v") {
        if (board[r][c] === symbol) {
            return (
                1 + scan_direction(board, r + 1, c, l - 1, direction, symbol)
            );
        } else {
            return 0;
        }
    }
    if (direction === "h") {
        if (board[r][c] === symbol) {
            return (
                1 + scan_direction(board, r, c + 1, l - 1, direction, symbol)
            );
        } else {
            return 0;
        }
    }
    if (direction === "dl") {
        if (board[r][c] === symbol) {
            return (
                1 +
                scan_direction(board, r + 1, c - 1, l - 1, direction, symbol)
            );
        } else {
            return 0;
        }
    }
    if (direction === "dr") {
        if (board[r][c] === symbol) {
            return (
                1 +
                scan_direction(board, r + 1, c + 1, l - 1, direction, symbol)
            );
        } else {
            return 0;
        }
    }
}
