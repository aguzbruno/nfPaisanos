"use client";
import styles from "../styles/Header.module.css";

export default function Header() {
    function handleExplore(e: any) {
        e.preventDefault();
        window.scroll({
            top: 625,
            behavior: "smooth",
        });
    }
    return (
        <main
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: "485px",
                backgroundColor: "#141416",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                }}
            >
                <p className={styles.titleSecondary}>
                    CREATE, EXPLORE, & SELL DIGITAL ART NFTS.
                </p>
                <p className={styles.titlePrincipal}>
                    The new creative economy.
                </p>
                <div
                    className={styles.button}
                    onClick={(e) => {
                        handleExplore(e);
                    }}
                >
                    Explore
                </div>
            </div>
        </main>
    );
}
