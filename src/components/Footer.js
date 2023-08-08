import Link from "next/link";
import Script from "next/script";

export default function Footer() {
    return (
        <>
            <div className="footer">
                <ul className="footer__items">
                    <li className="footer__item">
                        <Link href="/">Support</Link>
                    </li>
                    <li className="footer__item">
                        <Link href="/">Terms of Use</Link>
                    </li>
                </ul>
            </div>

            <Script src="shared.js" />
        </>
    );
}
