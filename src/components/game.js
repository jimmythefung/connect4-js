import styles from "./game.module.css";
import { useState } from "react";

export default function Game() {
    return (
        <div className={`${styles.game}`}>Connect 4 Game!</div>
    );
}
