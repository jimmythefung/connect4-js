import styles from "./game.module.css";
import Layout from "../UI/Layout";
import { useEffect, useState } from "react";
import * as utils from "../scripts/utils.js";
let PLAYER1 = "RED";
let PLAYER2 = "GREEN";

export default function Game({ m, n }) {
    const [currentBoard, setCurrentBoard] = useState(create_board(m, n));
    const [col_select, setColSelect] = useState(0);
    const [turn, setTurn] = useState(PLAYER2);
    const is_p1_turn = turn === PLAYER1;

    // Check winner on board re-render
    useEffect(() => {
        let symbol = turn == PLAYER1 ? PLAYER2 : PLAYER1;
        if (check_winner(currentBoard, symbol)) {
            utils.openModal();
        }
    }, [currentBoard]);

    function handleCellClick(row, column) {
        // meta
        setColSelect(column);
        let symbol = is_p1_turn ? PLAYER1 : PLAYER2;
        let newBoard = currentBoard.slice();
        if (place_token(column, newBoard, symbol)) {
            setTurn(is_p1_turn ? PLAYER2 : PLAYER1);
            setCurrentBoard(newBoard);
        }
    }

    return (
        <Layout>
            <div className={`${styles.game}`}>
                <div className={`${styles["game-div"]}`}>
                    <h1>Connect 4</h1>
                </div>
                <div className={`${styles["game-div"]}`}>
                    <Board
                        current_board={currentBoard}
                        onCellClick={handleCellClick}
                    />
                </div>
                <div className={`${styles["game-div"]}`}>
                    <h2>Player Turn: {turn}</h2>
                </div>
                {/* <div className={`${styles["game-div"]}`}>
                    <audio autoplay loop controls>
                        <source
                            src="/ebi_tempura.mp3"
                            type="audio/mpeg"
                        ></source>
                    </audio>
                </div> */}

                {/* Not displayed by default */}
                <div className="backdrop"></div>
                <div className="modal">
                    <h1 className="modal__title">Game!</h1>
                    <div className="modal__actions">
                        <a href="/" className="modal__action">
                            New game
                        </a>
                        <button
                            className="modal__action modal__action--continue"
                            type="button"
                        >
                            Continue
                        </button>
                    </div>
                </div>

            </div>
        </Layout>
    );
}

function Board({ current_board, onCellClick }) {
    let m_rows = current_board.length;
    let n_columns = current_board[0].length;

    // Build up a board made of columns
    let full_board = [];
    for (let c = 0; c < n_columns; c++) {
        // Construct a column
        let a_column = [];
        for (let r = 0; r < m_rows; r++) {
            let index = "(" + r.toString() + ", " + c.toString() + ")";
            a_column.push(
                <Cell
                    key={index}
                    text={current_board[r][c]}
                    row={r}
                    col={c}
                    clickHandler={onCellClick}
                />
            );
        }

        // Add column to board
        full_board.push(
            <div key={c} className={`${styles.column}`}>
                {a_column}
            </div>
        );
    }
    return <div className={`${styles.board}`}>{full_board}</div>;
}

function Cell({ text, row, col, clickHandler }) {
    return (
        <div
            className={`
                ${styles.cell} 
                ${text === PLAYER1 ? styles.player1 : ""}
                ${text === PLAYER2 ? styles.player2 : ""}
            `}
            onClick={() => clickHandler(row, col)}
        ></div>
    );
}

// Game mechanics
function create_board(m, n) {
    let BLANK = "";
    let empty_board = Array.from(Array(m), () => new Array(n).fill(BLANK));
    return empty_board;
}
function place_token(column, currentBoard, symbol) {
    // meta
    let BLANK = "";

    // Drop the token to the bottom at the given column
    // Note: slice is neccessary to trigger react to refresh/update the board
    for (let r = currentBoard.length - 1; r >= 0; r--) {
        if (currentBoard[r][column] === BLANK) {
            // Place the player's token based on the turn
            currentBoard[r][column] = symbol;
            return true;
        }
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

function check_winner(board, symbol) {
    let [m, n] = [board.length, board[0].length];
    let hasWinner = false;
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            hasWinner = check_winner_helper(board, r, c, symbol);
            if (hasWinner) {
                return true;
            }
        }
    }
    return false;
}
