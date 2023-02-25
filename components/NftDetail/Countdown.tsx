"use client";
import React from "react";
import type { Nft } from "../../types";
import styles from "../../styles/NftDetail.module.css";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import Loader from "../../utils/Loader/Loader";

type Props = {
    date: string;
};

const Countdown: React.FC<Props> = ({ date }) => {
    const [isLoading, setIsLoading] = useState(true);
    //end *1.01 ya que todos los bids estan caducados
    const end = new Date(date).getTime() * 1.012;
    const initialTime = new Date().getTime();
    const [time,setTime] = useState({hours:0,minutes:0,seconds:0})

    useEffect(() => {
        setTimeout(() => {
            const distance = end - new Date().getTime();
            setTime({...time,hours:getHours(distance),minutes:getMinutes(distance),seconds:getSeconds(distance)})
            setIsLoading(false);
        }, 1000);
    }, [time.seconds]);

    const getDays = (unixDate: number) => {
        return Math.floor(unixDate / (1000 * 60 * 60 * 24));
    };

    const getHours = (unixDate: number) => {
        return Math.floor(unixDate / (1000 * 60 * 60));
    };

    const getMinutes = (unixDate: number) => {
        return Math.floor((unixDate % (1000 * 60 * 60)) / (1000 * 60));
    };

    const getSeconds = (unixDate: number) => {
        return Math.floor((unixDate % (1000 * 60)) / 1000);
    };

    return !isLoading ? (
        <>
            <p className={styles.auctionEnding}>Auction ending in</p>
            <div className={`${styles.col} ${styles.countdownContainer} `}>
                <span className={`${styles.col} ${styles.center}`}>
                    <p className={styles.timeParragraph}>{time.hours}</p>
                    <label className={styles.timeLabel}>Hrs</label>
                </span>
                <span className={`${styles.col} ${styles.center}`}>
                    <p className={styles.timeParragraph}>{time.minutes}</p>
                    <label className={styles.timeLabel}>mins</label>
                </span>
                <span className={`${styles.col} ${styles.center}`}>
                    <p className={styles.timeParragraph}>{time.seconds}</p>
                    <label className={styles.timeLabel}>secs</label>
                </span>
            </div>
        </>
    ) : (
        <Loader size={24} />
    );
};
export default Countdown;
