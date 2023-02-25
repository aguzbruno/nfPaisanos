/** @format */

"use client";
import { useState } from "react";
import styles from "../styles/FilterBar.module.css";
import Image from "next/image";
import Select from "./Select";
import { orderByDate, useNftStore } from "../store/nftStore";
import { useEffect } from "react";

const FilterBar: React.FC = () => {
    const { setFilters, filters } = useNftStore((state) => state);

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedTimeFilter, setSelectedTimeFilter] = useState("Newest");
    const optionsTime = ["Newest", "Older"];
    const radioOptions = [
        { value: "All" },
        { value: "Art" },
        { value: "Photography" },
    ];

    function handleFilterBar(selectedValue: string, filterToChange: string) {
        const filtersChanged = {
            ...filters,
            [filterToChange]: selectedValue,
        };
        if (filterToChange === "category") {
            setSelectedCategory(selectedValue);
        } else setSelectedTimeFilter(selectedValue);
        setFilters(filtersChanged, orderByDate);
    }

    useEffect(() => {
        setSelectedCategory(filters.category);
        setSelectedTimeFilter(filters.timeFilter);
    }, [filters]);

    return (
        <div className={styles.filterBarContainer}>
            <div className={styles.filterBar}>
                <Select
                    onChangeFunction={handleFilterBar}
                    options={optionsTime}
                    selected={selectedTimeFilter}
                    nameOfSelect={'timeFilter'}
                />
                <div className={styles.radios}>
                    {radioOptions.map((selected: any, i: any) => {
                        return (
                            <div
                                key={i}
                                onClick={() => {
                                    handleFilterBar(selected.value, "category");
                                }}
                                className={
                                    styles.radio +
                                    " " +
                                    (selectedCategory === selected.value
                                        ? styles.active
                                        : "")
                                }
                            >
                                {selected.value}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
export default FilterBar;
