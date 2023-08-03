import Head from "next/head";
import Game from "../components/game";


export default function Home() {
    return (
        <>
            <Head>
                <title>Connect4</title>
                <meta name="description" content="Connect4 Game" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Game />
            </main>
        </>
    );
}