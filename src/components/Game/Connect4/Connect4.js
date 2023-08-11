import styles from "./connect4.module.css";
import Layout from "../../UI/Layout";
import { useEffect, useState } from "react";
import * as utils from "../../scripts/utils.js";
import * as rules from "../../scripts/c4rules.js";

let PLAYER1 = "1";
let PLAYER2 = "AI";

export default function Connect4({ m, n }) {
    const [currentBoard, setCurrentBoard] = useState(rules.create_board(m, n));
    const [col_select, setColSelect] = useState(0);
    const [turn, setTurn] = useState(PLAYER1);
    const [isGameOver, setIsGameOver] = useState(false);
    const is_p1_turn = turn === PLAYER1;

    console.log("Is game over? " + isGameOver);
    if (is_p1_turn) {
        handle_p1();
    } else {
        handle_ai();
    }

    // Check winner on board re-render
    useEffect(() => {
        let symbol = turn == PLAYER1 ? PLAYER2 : PLAYER1;
        if (rules.check_winner(currentBoard, symbol)) {
            setIsGameOver(true);
            utils.openModal();
            // console.log("Is game over? " + isGameOver);
        }
    }, [currentBoard]);

    function handleCellClick(row, column) {
        if (!isGameOver) {
            setColSelect(column);
            place_token_and_process_turn(column);
        }
    }

    function place_token_and_process_turn(column) {
        let symbol = is_p1_turn ? PLAYER1 : PLAYER2;
        let newBoard = currentBoard.slice();
        if (rules.place_token(column, newBoard, symbol)) {
            setTurn(is_p1_turn ? PLAYER2 : PLAYER1);
            setCurrentBoard(newBoard);
            return true;
        }
        return false;
    }

    function handle_p1() {
        console.log("P1 turn.");
        if (typeof window !== "undefined") {
            var backdrop = document.querySelector(".backdrop");
            backdrop.style.display = "none";
        }
    }

    function handle_ai() {
        console.log("AI turn.");
        if (typeof window !== "undefined") {
            var backdrop = document.querySelector(".backdrop");
            backdrop.style.display = "block";
        }
        setTimeout(() => {
            // AI picks a random column (integer) between 0 to 6 inclusive:
            let placed = false;
            while (!placed) {
                let column = Math.floor(Math.random() * 7);
                placed = place_token_and_process_turn(column);
            }
        }, 1000);
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

                <div className={`${styles["game-div"]}`}>
                    <audio loop controls>
                        <source
                            src="/ebi_tempura.mp3"
                            type="audio/mpeg"
                        ></source>
                    </audio>
                </div>

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

// **********************
// Game board components
// **********************
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
