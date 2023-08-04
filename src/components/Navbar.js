import Link from "next/link";

export default function Navbar() {
    return (
        <>
            <div className="navbar">
                <div className="navbar-left">
                    <Link className="navbar-left__brand" href="/">Home</Link>
                </div>
                <div className="navbar-right">
                    <ul className="navbar-right__items">
                        <li className="navbar-right__item">
                            <Link href="/connectfour">Connect 4</Link>
                        </li>
                        <li className="navbar-right__item">
                            <Link href="/contact">Contact</Link>
                        </li>
                        <li className="navbar-right__item">
                            <Link href="/about">About</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
