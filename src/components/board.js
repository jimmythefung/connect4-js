import styles from "./game.module.css";

export default function Board({ m_rows, n_columns, onColumnClick }) {
    // Build up a board made of columns
    let full_board = [];
    for (let c = 0; c < n_columns; c++) {
        // Construct a column
        let a_column = [];
        for (let r = 0; r < m_rows; r++) {
            let index = "(" + r.toString() + ", " + c.toString() + ")";
            a_column.push(<Cell key={index} text={index} row={r} col={c} />);
        }

        // Add column to board
        full_board.push(
            <div
                key={c}
                className={`${styles.column}`}
                onMouseEnter={() => onColumnClick(c)}
            >
                {a_column}
            </div>
        );
    }
    return <div className={`${styles.board}`}>{full_board}</div>;
}

function Cell({ text, row, col }) {
    return (
        <div
            className={`${styles.cell}`}
            onClick={() => console.log("Clicked " + text)}
        >
            {text}
        </div>
    );
}
