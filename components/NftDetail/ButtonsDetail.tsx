'use client'
import styles from '../../styles/NftDetail.module.css'
import Image from 'next/image';

export default function ButtonsDetail() {

    return <div className={styles.buttonsContainer} >
        <div className={`${styles.buttonNftDetail} ${styles.bidButton}`} >Place a bid</div>
        <div className={`${styles.buttonNftDetail} ${styles.viewButton}`} >View item</div>
    </div>
};

