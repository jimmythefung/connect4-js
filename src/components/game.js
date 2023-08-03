import styles from "./game.module.css";
import Board from "./board";
import { useState } from "react";

export default function Game() {
    const [col_select, setColSelect] = useState(0);
    let [m, n] = [6, 7];

    let empty_board = Array.from(Array(m), () => new Array(n).fill(0));
    const [currentBoard, setCurrentBoard] = useState(empty_board);

    function handleCellClick(row, column) {
        setColSelect(column);


        currentBoard[row][column] = currentBoard[row][column] + 1;
        setCurrentBoard(currentBoard);
    }

    return (
        <>
            <div className={`${styles.game}`}>
                <div className={`${styles["game-div"]}`}>Connect 4 Game!</div>
                <div className={`${styles["game-div"]}`}>
                    <Board current_board={currentBoard} onCellClick={handleCellClick} />
                </div>
                <div className={`${styles["game-div"]}`}>Select column: {col_select}</div>
            </div>
        </>
    );
}
