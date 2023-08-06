import Navbar from "./Navbar";

export default function Layout({ children }) {
    return (
        <div className="layout">
            <div className="backdrop"></div>
            <div className="modal">
                <h1 className="modal__title">We have a winner!</h1>
                <div className="modal_actions">
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
            <Navbar />
            {children}
        </div>
    );
}
