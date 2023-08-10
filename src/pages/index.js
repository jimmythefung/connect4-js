import Head from "next/head";
import Game from "../components/Game/game";
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
            </Head>
            <main>
                <Game m={6} n={7} />
            </main>
        </>
    );
}
