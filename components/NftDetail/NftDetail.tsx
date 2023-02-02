"use client";
import type { Nft } from "../../types";
import styles from "../../styles/NftDetail.module.css";
import Image from "next/image";
import Arrows from "./Arrows";
import BidDetail from "./BidDetail";
import ButtonsDetail from "./ButtonsDetail";
import HeaderDetail from "./HeaderDetail";
import { Box } from "theme-ui";
import React, { useEffect, useState } from "react";
import { useNftStore } from "../../store/nftStore";

interface MagnifierProps {
    imgSrc: string;
    imgWidth?: number;
    imgHeight?: number;
    magnifierRadius: number;
}

type Props = {
    ethPrice: string;
};
function Magnifier({
    imgSrc,
    imgHeight,
    imgWidth,
    magnifierRadius,
}: MagnifierProps) {
    // Store the position of the magnifier and position of the large image relative to the magnifier.
    const [magnifierState, setMagnifierState] = useState({
        top: 0,
        left: 0,
        offsetX: 0,
        offsetY: 0,
    });

    // Store whether the magnifier is currently visible.
    const [isVisible, setIsVisible] = useState(false);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box sx={{ position: "relative" }}>
                <Image
                    src={imgSrc}
                    width={imgWidth}
                    height={imgHeight}
                    className={styles.imgPrincipalNftDetail}
                    alt={imgSrc}
                    // Set the magnifier state on every move of the mouse over the image.
                    onMouseMove={(e) => {
                        setIsVisible(true);
                        const smallImage = e.currentTarget;
                        // mouse position on the small image.
                        const x = e.nativeEvent.offsetX;
                        const y = e.nativeEvent.offsetY;
                        setMagnifierState({
                            top: y - magnifierRadius,
                            left: x - magnifierRadius,
                            // scale up to get position relative to the large image.
                            offsetX:
                                (x / smallImage.width) *
                                    smallImage.naturalWidth -
                                magnifierRadius,
                            offsetY:
                                (y / smallImage.height) *
                                    smallImage.naturalHeight -
                                magnifierRadius,
                        });
                    }}
                    // Hide the magnifier when leaving the image.
                    onMouseLeave={() => setIsVisible(false)}
                />
                <Box
                    sx={{
                        // Constants:
                        boxShadow: "0 5px 10px -2px rgba(0, 0, 0, 0.3)",
                        pointerEvents: "none",
                        position: "absolute",
                        border: "2px solid #efefef",
                        zIndex: 99,
                        display: "block",
                        transition: "opacity 0.2s",
                        // Set background to the image from props:
                        background: `url("${imgSrc}") no-repeat #fff`,
                        // Set sizing based on the magnifierRadius from props:
                        width: 2 * magnifierRadius,
                        height: 2 * magnifierRadius,
                        borderRadius: magnifierRadius,
                        // Set position based on on the magnifier state:
                        top: magnifierState.top + "px",
                        left: magnifierState.left + "px",
                        backgroundPositionX: -1 * magnifierState.offsetX,
                        backgroundPositionY: -1 * magnifierState.offsetY,
                        // Toggle opacity based on the isVisible state:
                        opacity: isVisible ? 1 : 0,
                    }}
                />
            </Box>
        </Box>
    );
}

const NftDetail: React.FC<Props> = ({ ethPrice }) => {
    const selectedFavorite = useNftStore((state) => state)
        .selectedFavorite as Nft;

    return (
        <div className={styles.nftDetailContainer}>
            <div className={styles.imgPrincipalContainer}>
                {/* <picture><img className={styles.imgPrincipalNftDetail} src={nft.media.image} alt="principal-image-nft"></img></picture> */}
                <Magnifier
                    imgSrc={selectedFavorite.media.image}
                    imgWidth={1280}
                    imgHeight={1600}
                    magnifierRadius={100}
                />
                <div className={styles.hoverToZoom}>
                    Hover to zoom
                    <Image
                        src="/zoom.svg"
                        width={18}
                        height={18}
                        alt="zoom-image"
                    />
                </div>
            </div>
            <div className={styles.infoNftDetailContainer}>
                <p className={styles.titlePrincipal}>the creator network</p>
                <HeaderDetail selectedFavorite={selectedFavorite} />
                <BidDetail
                    selectedFavorite={selectedFavorite}
                    ethPrice={ethPrice}
                />
                <ButtonsDetail />
                <Arrows />
            </div>
        </div>
    );
};
export default NftDetail;
