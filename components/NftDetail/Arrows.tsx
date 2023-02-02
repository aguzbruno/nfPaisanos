"use client";
import styles from "../../styles/NftDetail.module.css";
import Image from "next/image";
import { useState } from "react";
import { useNftStore } from "../../store/nftStore";

export default function Arrows() {
    const [indexOfFavorite, setIndexOfFavorite] = useState(0);
    const { favoritesNfts, setSelectedFavorite } = useNftStore(
        (state) => state
    );
    const selectedFavorite = useNftStore((state) => state.selectedFavorite);

    function handleArrow(side: string) {
        if (side === "right") {
            if (indexOfFavorite + 1 < favoritesNfts.length) {
                setIndexOfFavorite(indexOfFavorite + 1);
                setSelectedFavorite(favoritesNfts[indexOfFavorite + 1]);
            } else {
                setSelectedFavorite(favoritesNfts[0]);
                setIndexOfFavorite(0);
            }
        }
        if (side === "left") {
            if (indexOfFavorite - 1 >= 0) {
                setIndexOfFavorite(indexOfFavorite - 1);
                setSelectedFavorite(favoritesNfts[indexOfFavorite - 1]);
            } else {
                setSelectedFavorite(favoritesNfts[favoritesNfts.length - 1]);
                setIndexOfFavorite(favoritesNfts.length - 1);
            }
        }
    }

    return (
        <div className={styles.arrowContainer}>
            <Image
                onClick={() => {
                    handleArrow("left");
                }}
                style={{ cursor: "pointer" }}
                src="/arrow.svg"
                alt="flecha izquierda"
                width={40}
                height={40}
            />
            <div className={styles.rightArrowCircle}>
                <Image
                    onClick={() => {
                        handleArrow("right");
                    }}
                    style={{ rotate: "180deg", cursor: "pointer" }}
                    src="/arrow.svg"
                    alt="flecha derecha"
                    width={40}
                    height={40}
                />
            </div>
        </div>
    );
}
