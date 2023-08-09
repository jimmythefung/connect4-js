import Head from "next/head";
import Game from "../components/game";
import Script from "next/script";

export default function Home() {
    return (
        <>
            <Head>
                <title>Connect4</title>
                <meta name="description" content="Connect4 Game" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                    user-scalable="yes"
                />
                <link rel="icon" href="/favicon.ico" />
                <Script
                    src="/shared.js"
                    strategy="lazyOnload"
                    onLoad={() => console.log(`Loaded shared.js`)}
                />
            </Head>
            <main>
                {/* <audio autoplay loop controls>
                    <source src="/ebi_tempura.mp3" type="audio/mpeg"></source>
                </audio> */}
                <Game />
            </main>
        </>
    );
}
