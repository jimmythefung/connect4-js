import styles from "./game.module.css";
import Board from "./board";
import { useState } from "react";

export default function Game() {
    const [col_select, setColSelect] = useState(0);
    let [m, n] = [6, 7];
    let BLANK = '';

    let empty_board = Array.from(Array(m), () => new Array(n).fill(BLANK));
    const [currentBoard, setCurrentBoard] = useState(empty_board);

    function handleCellClick(row, column) {
        // meta
        setColSelect(column);
        console.log("Cell " + [row, column] + " clicked.");

        // Drop the token to the bottom at the given column
        let newBoard = currentBoard.slice();
        for (let r = newBoard.length - 1; r >= 0; r--) {
            if (newBoard[r][column] === BLANK) {
                newBoard[r][column] = "X";
                setCurrentBoard(newBoard);
                console.log("Updated column: " + column + " at row: " + r);
                return;
            }
        }
    }

    return (
        <>
            <div className={`${styles.game}`}>
                <div className={`${styles["game-div"]}`}>Connect 4 Game!</div>
                <div className={`${styles["game-div"]}`}>
                    <Board
                        current_board={currentBoard}
                        onCellClick={handleCellClick}
                    />
                </div>
                <div className={`${styles["game-div"]}`}>
                    Select column: {col_select}
                </div>
            </div>
        </>
    );
}
