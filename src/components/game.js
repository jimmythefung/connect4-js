import styles from "./game.module.css";
import Board from "./board";
import { useState } from "react";

export default function Game() {
    const [col_select, setColSelect] = useState(0);
    let [m, n] = [6, 7];

    function handleColClick(column) {
        setColSelect(column);
    }

    return (
        <>
            <div className={`${styles.game}`}>
                <div className={`${styles["game-div"]}`}>Connect 4 Game!</div>
                <div className={`${styles["game-div"]}`}>
                    <Board m_rows={m} n_columns={n} onColumnClick={handleColClick} />
                </div>
                <div className={`${styles["game-div"]}`}>Select column: {col_select}</div>
            </div>
        </>
    );
}
