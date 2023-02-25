/** @format */

"use client";
import NftCard from "./NftCard";
import styles from "../styles/Catalogue.module.css";
import Select from "./Select";
import { useState } from "react";
import Image from "next/image";
import { orderByDate, orderByLikes, useNftStore } from "../store/nftStore";
import { useEffect } from "react";
import Loader from "../utils/Loader/Loader";
import NoResults from "../utils/NoResults/NoResults";
const Catalogue: React.FC = () => {
    const { setFilters, resetFilters, nftsFilteredAndOrder, filters } =
        useNftStore((state) => state);
    const [isLoading, setIsLoading] = useState(true);
    const [filtersAndOrder, setFiltersAndOrder] = useState({
        colorFilter: "All colors",
        likesFilter: "Most liked",
        priceRange: 0,
    });
    const likesOptions = ["Most liked", "Least liked"];
    const colorOptions = ["All colors", "Black", "Orange", "Pink", "Purple"];


    function handleFilterAndOrders(
        selectedValue: string,
        filterToChange: string
    ) {
        const filtersChanged = {
            ...filters,
            [filterToChange]: selectedValue,
        };
        setFiltersAndOrder({
            ...filtersAndOrder,
            [filterToChange]: selectedValue,
        });
        setFilters(filtersChanged, orderByDate);
    }

    function handleResetFilters() {
        const filtersReset = {
            ...filters,
            colorFilter: "All colors",
            likesFilter: "Most liked",
            priceRange: 0,
        };

        setFiltersAndOrder(filtersReset);
        setFilters(filtersReset, orderByDate);
        resetFilters();
    }

    useEffect(() => {
        if (isLoading) {
            {
                setTimeout(() => {
                    setIsLoading(false);
                }, 200);
            }
        }
    }, []);

    return (
        <div className={styles.catalogueContainer}>
            <div className={styles.catalogue}>
                <div className={styles.filtersContainer}>
                    <label style={{ transform: "translate(0,-45px" }}>
                        PRICE RANGE
                    </label>

                    <div className={styles.sliderContainer}>
                        <div className={styles.field}>
                            <input
                                className={styles.slider}
                                type="range"
                                min="0"
                                max="10"
                                step="0.001"
                                onChange={(e) => {
                                    handleFilterAndOrders(
                                        e.target.value,
                                        "priceRange"
                                    );
                                }}
                                value={filtersAndOrder.priceRange}
                            />
                            <div className={styles.valueContainer}>
                                <span className={styles.labelRange}>
                                    {filtersAndOrder.priceRange}
                                    <Image
                                        style={{
                                            position: "absolute",
                                            top: "0px",
                                            left: "0px",
                                            transform: "translate(225%, 265%)",
                                            justifyContent: "center",
                                        }}
                                        src="/arrowSlideRange.svg"
                                        alt="arrow"
                                        width={12}
                                        height={12}
                                    />
                                </span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span>0.000 ETH</span>
                                <span>10 ETH</span>
                            </div>
                        </div>
                    </div>
                    <label>LIKES</label>
                    <Select
                        onChangeFunction={handleFilterAndOrders}
                        options={likesOptions}
                        selected={filtersAndOrder.likesFilter}
                        nameOfSelect={"likesFilter"}
                    />
                    <label>OPEN</label>
                    <Select
                        onChangeFunction={handleFilterAndOrders}
                        options={colorOptions}
                        selected={filtersAndOrder.colorFilter}
                        nameOfSelect={"colorFilter"}
                    />
                    <div className={styles.containerResetFilters}>
                        <Image
                            src="/cross.svg"
                            alt="cross"
                            width={25}
                            height={25}
                            onClick={() => {
                                handleResetFilters();
                            }}
                        />
                        <p
                            className={styles.textResetFilter}
                            onClick={() => {
                                handleResetFilters();
                            }}
                        >
                            Reset filter
                        </p>
                    </div>
                </div>
                <div className={styles.cardsContainer}>
                    {nftsFilteredAndOrder.length ? (
                        nftsFilteredAndOrder.map((nft, i) => {
                            return <NftCard nft={nft} key={`${nft.id}+${i}`} />;
                        })
                    ) : isLoading ? (
                        <>
                            <Loader size={60} />
                        </>
                    ) : (
                        <NoResults />
                    )}
                </div>
            </div>
            ;{/* Lazy Loading Infinte Scroll */}
            {nftsFilteredAndOrder?.length > 6 ? (
                <div className={styles.loadMoreContainer}>
                    <div className={styles.button}>
                        <Image
                            className={styles.loader}
                            src="/loader.svg"
                            alt="loader"
                            width={16}
                            height={16}
                        />
                        Load more
                    </div>
                </div>
            ) : null}
        </div>
    );
};
export default Catalogue;
