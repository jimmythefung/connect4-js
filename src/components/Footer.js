import Link from "next/link";
import Script from "next/script";

export default function Footer() {
    return (
        <>
            <ul className="footer">
                <li className="footer__item">
                    <Link href="/">Support</Link>
                </li>
                <li className="footer__item">
                    <Link href="/">Terms of Use</Link>
                </li>
            </ul>
            <Script src="shared.js" />
        </>
    );
}
