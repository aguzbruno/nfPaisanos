'use client'
import React from 'react';
import type { Nft } from '../../types';
import styles from '../../styles/NftDetail.module.css'
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

type Props = {
    date: string;
};

const Countdown: React.FC<Props> = ({ date }) => {
    const [isLoading, setIsLoading] = useState(true)    
    //end *1.01 ya que todos los bids estan caducados
    const end = new Date(date).getTime()*1.01;
    const initialTime = new Date().getTime();    
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    useEffect(() => { 
        setTimeout(() => {
            const distance = end- new Date().getTime()
            setHours(getHours(distance))
            setMinutes(getMinutes(distance))
            setSeconds(getSeconds(distance))
            setIsLoading(false)
        }, 1000);
    }, [seconds])
    
    const getDays = (unixDate: number) => {
        return Math.floor(unixDate / (1000 * 60 * 60 * 24));
    }

    const getHours = (unixDate: number) => {
        return Math.floor(unixDate / (1000 * 60 * 60 ));
    }

    const getMinutes = (unixDate: number) => {
        return Math.floor((unixDate % (1000 * 60 * 60)) / (1000 * 60));
    }

    const getSeconds = (unixDate: number) => {
        return Math.floor((unixDate % (1000 * 60)) / 1000);
    }

    return !isLoading ? (

        <>
            <p className={styles.auctionEnding} >Auction ending in</p>
            <div className={`${styles.col} ${styles.countdownContainer} `} >
                <span className={`${styles.col} ${styles.center}`}>
                    <p className={styles.timeParragraph}>{hours}</p>
                    <label className={styles.timeLabel} >Hrs</label>
                </span>
                <span className={`${styles.col} ${styles.center}`}>
                    <p className={styles.timeParragraph}>{minutes}</p>
                    <label className={styles.timeLabel}>mins</label>
                </span>
                <span className={`${styles.col} ${styles.center}`}>
                    <p className={styles.timeParragraph}>{seconds}</p>
                    <label className={styles.timeLabel}>secs</label>
                </span>
            </div>
        </>) : (
        <p className={styles.auctionEnding} >Auction ended</p>
    )
};
export default Countdown



