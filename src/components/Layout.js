import Navbar from "./Navbar";
import Footer from "./Footer";
import Script from "next/script";

export default function Layout({ children }) {
    return (
        <div className="layout">
            <div className="top-flexbox">
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
                <Navbar />
                {children}
            </div>
            <div className="bottom-flexbox">
                <Footer />
            </div>
            <Script src="/shared.js" />
        </div>
    );
}
