import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div className="layout">
            <div className="backdrop"></div>
            <div className="modal">
                <h1 className="modal__title">We have Winner!</h1>
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
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
