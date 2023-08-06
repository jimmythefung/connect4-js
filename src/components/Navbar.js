import Link from "next/link";
import Script from "next/script";

export default function Navbar() {
    return (
        <>
            <div className="navbar">
                {/* Mobile screen - Hamberger Navigation*/}
                <button className="toggle-button">
                    <span className="toggle-button__bar"></span>
                    <span className="toggle-button__bar"></span>
                    <span className="toggle-button__bar"></span>
                </button>
                <div className="mobile-nav">
                    <ul className="mobile-nav__items">
                        <li className="mobile-nav__item">
                            <Link href="/">Connect 4</Link>
                        </li>
                        <li className="mobile-nav__item">
                            <Link href="/">Contact</Link>
                        </li>
                        <li className="mobile-nav__item">
                            <Link href="/">About</Link>
                        </li>
                    </ul>
                </div>
                {/* Normal Screen Navigation*/}
                <div className="navbar-left">
                    <Link className="navbar-left__brand" href="/">
                        Home
                    </Link>
                </div>
                <div className="navbar-right">
                    <ul className="navbar-right__items">
                        <li className="navbar-right__item">
                            <Link href="/">Connect 4</Link>
                        </li>
                        <li className="navbar-right__item">
                            <Link href="/">Contact</Link>
                        </li>
                        <li className="navbar-right__item">
                            <Link href="/">About</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <Script src="shared.js" />
        </>
    );
}
