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

    function handleChange(item: any) {
        const filtersChanged = {
            ...filters,
            category: item.value,
            timeFilter: selectedTimeFilter,
        };
        setSelectedCategory(item.value);
        setFilters(filtersChanged,orderByDate);
    }

    function handleChangeTimeFilter(selected: string) {
        const filtersChanged = {
            ...filters,
            category: selectedCategory,
            timeFilter: selected,
        };
        setSelectedTimeFilter(selected);
        setFilters(filtersChanged,orderByDate);
    }
    
    useEffect(() => {
        setSelectedCategory(filters.category);
        setSelectedTimeFilter(filters.timeFilter);
    }, [filters]);

    return (
        <div className={styles.filterBarContainer}>
            <div className={styles.filterBar}>
                <Select
                    handle={handleChangeTimeFilter}
                    options={optionsTime}
                    selected={selectedTimeFilter}
                />
                <div className={styles.radios}>
                    {radioOptions.map((item: any, i: any) => {
                        return (
                            <div
                                key={i}
                                onClick={() => {
                                    handleChange(item);
                                }}
                                className={
                                    styles.radio +
                                    " " +
                                    (selectedCategory === item.value
                                        ? styles.active
                                        : "")
                                }
                            >
                                {" "}
                                {item.value}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
export default FilterBar;
