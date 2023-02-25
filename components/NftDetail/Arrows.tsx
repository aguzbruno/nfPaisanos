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

    function handleArrow(number:number) {
        const nextIndex = indexOfFavorite + number
        if((number > 0 && nextIndex <favoritesNfts.length) || (number<0 && nextIndex>=0)){
            setIndexOfFavorite(nextIndex);
            setSelectedFavorite(favoritesNfts[nextIndex]);
        }
    }

    return (
        <div className={styles.arrowContainer}>
            <Image
                onClick={() => {
                    handleArrow(-1);
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
                        handleArrow(1);
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
