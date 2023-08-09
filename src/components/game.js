import styles from "./game.module.css";
import Board from "./board";
import Layout from "./Layout";
import { useEffect, useState } from "react";
import * as utils from "./utils.js";
let PLAYER1 = "RED";
let PLAYER2 = "GREEN";

export default function Game() {
    const [col_select, setColSelect] = useState(0);
    let [m, n] = [6, 7];
    let BLANK = "";

    let empty_board = Array.from(Array(m), () => new Array(n).fill(BLANK));
    const [currentBoard, setCurrentBoard] = useState(empty_board);
    const [turn, setTurn] = useState(PLAYER2);
    const is_p1_turn = turn === PLAYER1;

    // Check winner on board re-render
    useEffect(() => {
        let symbol = turn == PLAYER1 ? PLAYER2 : PLAYER1;
        if (check_winner(currentBoard, symbol)) {
            utils.openModal();
        }
    }, [currentBoard]);

    // Helpers
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
                    1 +
                    scan_direction(board, r + 1, c, l - 1, direction, symbol)
                );
            } else {
                return 0;
            }
        }
        if (direction === "h") {
            if (board[r][c] === symbol) {
                return (
                    1 +
                    scan_direction(board, r, c + 1, l - 1, direction, symbol)
                );
            } else {
                return 0;
            }
        }
        if (direction === "dl") {
            if (board[r][c] === symbol) {
                return (
                    1 +
                    scan_direction(
                        board,
                        r + 1,
                        c - 1,
                        l - 1,
                        direction,
                        symbol
                    )
                );
            } else {
                return 0;
            }
        }
        if (direction === "dr") {
            if (board[r][c] === symbol) {
                return (
                    1 +
                    scan_direction(
                        board,
                        r + 1,
                        c + 1,
                        l - 1,
                        direction,
                        symbol
                    )
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

    function handleCellClick(row, column) {
        // meta
        setColSelect(column);
        console.log("Cell " + [row, column] + " clicked.");

        // Drop the token to the bottom at the given column
        // Note: slice is neccessary to trigger react to refresh/update the board
        let newBoard = currentBoard.slice();
        let symbol = is_p1_turn ? PLAYER1 : PLAYER2;
        for (let r = newBoard.length - 1; r >= 0; r--) {
            if (newBoard[r][column] === BLANK) {
                // Place the player's token based on the turn
                newBoard[r][column] = symbol;
                setTurn(is_p1_turn ? PLAYER2 : PLAYER1);
                setCurrentBoard(newBoard);
                return;
            }
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
            </div>
        </Layout>
    );
}
