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
        </>
    );
}
