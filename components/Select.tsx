"use client";
import styles from "../styles/Select.module.css";
import Image from "next/image";
import { useState } from "react";

interface Props{
    onChangeFunction: any,
    options:string[],
    selected:string,
    nameOfSelect:string
}

const Select: React.FC<Props> = ({ onChangeFunction, options, selected,nameOfSelect }) => {

    const [select, setSelect] = useState(true);
    function handleSelected(option: string) {
        setSelect(!select);
        onChangeFunction(option,nameOfSelect);
    }
    return (
        <div className={styles.dropdown}>
            <div
                onClick={() => {
                    setSelect(!select);
                }}
                className={
                    styles.select +
                    " " +
                    (select ? styles.select : styles.selectClicked)
                }
            >
                <span className={styles.selected}>{selected}</span>
                <div className={styles.containerDownArrow}>
                    <Image
                        src="/down-arrow.svg"
                        alt="select arrow"
                        width={12}
                        height={12}
                    />
                </div>
            </div>
            <ul
                className={
                    styles.menu + " " + (select ? styles.menu : styles.menuOpen)
                }
                onMouseLeave={() => setSelect(true)}
            >
                {options.map((option: any, i: any) => {
                    return (
                        <li
                            key={i}
                            onClick={() => {
                                handleSelected(option);
                            }}
                            className={styles.menuLi}
                        >
                            {option}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
export default Select;
