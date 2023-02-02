"use client";
import { Nft } from "../types";
import NftDetail from "../components/NftDetail/NftDetail";
import Catalogue from "../components/Catalogue";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import Loader from "./Loader";
import styles from "../styles/Home.module.css";
import { useNftStore } from "../store/nftStore";
import { useEffect } from "react";
type Props = {
    nfts: Nft[];
    favoritesNfts: Nft[];
    ethPrice: string;
};
const Container: React.FC<Props> = ({ nfts, favoritesNfts, ethPrice }) => {
    const {
        setAllNfts,
        setFavorites,
        allNfts,
        setNftsFilteredAndOrder,
        setSelectedFavorite,
        selectedFavorite,
    } = useNftStore((state) => state);

    useEffect(() => {
        if (!allNfts[0]) {
            console.log(nfts);
            setAllNfts(nfts);
            setNftsFilteredAndOrder(nfts);
            setFavorites(favoritesNfts);
            setSelectedFavorite(favoritesNfts[0]);
        }
    }, []);

    return (
        <section
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {selectedFavorite ? (
                <article>
                    <NftDetail ethPrice={ethPrice} />
                </article>
            ) : (
                <div>
                    <Loader size={64} />
                </div>
            )}
            <div className={styles.searchFilterContainer}>
                <SearchBar />
                <FilterBar />
            </div>
            <Catalogue />
        </section>
    );
};
export default Container;
