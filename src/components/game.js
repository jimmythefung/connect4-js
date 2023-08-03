import styles from "./game.module.css";
import Board from "./board";
import { useEffect, useState } from "react";

export default function Game() {
    const [col_select, setColSelect] = useState(0);
    let [m, n] = [6, 7];
    let BLANK = "";
    let PLAYER1 = "X";
    let PLAYER2 = "O";

    let empty_board = Array.from(Array(m), () => new Array(n).fill(BLANK));
    const [currentBoard, setCurrentBoard] = useState(empty_board);
    const [turn, setTurn] = useState(PLAYER2);
    const is_p1_turn = turn === PLAYER1;

    function handleCellClick(row, column) {
        // meta
        setColSelect(column);
        console.log("Cell " + [row, column] + " clicked.");

        // Drop the token to the bottom at the given column
        // Note: slice is neccessary to trigger react to refresh/update the board
        let newBoard = currentBoard.slice();
        for (let r = newBoard.length - 1; r >= 0; r--) {
            if (newBoard[r][column] === BLANK) {
                // Place the player's token based on the turn
                newBoard[r][column] = is_p1_turn ? PLAYER1 : PLAYER2;
                setTurn(is_p1_turn ? PLAYER2 : PLAYER1);
                setCurrentBoard(newBoard);

                // meta
                console.log("Updated column: " + column + " at row: " + r);
                return;
            }
        }

        // // Drop the token to the bottom at the given column
        // // Note: slice is neccessary to trigger react to refresh/update the board
        // let newBoard = currentBoard.slice();
        // let symbol = is_p1_turn ? PLAYER1 : PLAYER2;
        // for (let r = 0; r < newBoard.length; r++) {
        //     if (newBoard[r][column] === BLANK) {
        //         // Place the player's token based on the turn
        //         newBoard[r][column] = symbol;
        //         setCurrentBoard(newBoard);

        //         // Clear the animation
        //         useEffect(() => {
        //             setTimeout(() => {
        //                 if (r > 0) {
        //                     newBoard[r - 1][column] = BLANK;
        //                     setCurrentBoard(newBoard);
        //                 }
        //             }, 500);
        //         }, [currentBoard]);
        //     }
        // }
        // setTurn(is_p1_turn ? PLAYER2 : PLAYER1);
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
