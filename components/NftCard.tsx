'use client'
import type { Nft } from '../types';
import styles from '../styles/NftCard.module.css'
import Image from 'next/image';
import { useState } from 'react';

type Props = {
    nft: Nft;
};

const NftCard: React.FC<Props> = ({ nft }) => {
    const [isHover, setIsHover] = useState(false);
    function handleHover(condition: boolean) {
        console.log(condition)
        setIsHover(condition)
    }
    return (
        <div className={styles.container} style={{ position: "relative" }} onMouseMove={() => { handleHover(true) }} onMouseLeave={()=>{handleHover(false)}} >
            <Image className={styles.imgPrincipalNftCard} width={287} height={303} src={nft.media.image} alt="principal-image-nft" />
            {/* <div className={styles.containerHover} style={{ position: "absolute",width:"232px",height:"303px",marginTop:"12px",opacity:"0"}}>
                    <label className={styles.typeNft}>Rare</label>
                    <div className={styles.heartContainer} >
                        <Image src="/heart.svg" alt="highest-bid" width={24} height={24} />
                    </div>
                    <div className={styles.placeABid} >
                        Place a bid
                        <Image src="/scatterUp.svg" alt="scatterup" width={24} height={24} />
                    </div>                   
                </div> */}
            {isHover ? (
                <div className={styles.containerHover} style={{ position: "absolute", width: "232px", height: "303px", zIndex: '0px' }}>
                    <label className={styles.typeNft}>{nft.attributes.type.toUpperCase()}</label>
                    <div className={styles.heartContainer} >
                        <Image src="/heart.svg" alt="highest-bid" width={24} height={24} />
                    </div>
                    <div className={styles.placeABidContainer} >
                        <p className={styles.placeABid}>Place a bid</p>
                        <Image src="/scatterUp.svg" alt="scatterup" width={24} height={24} />
                    </div>
                </div>) : (null)}

            <div className={styles.allInfoContainer}>
                <div className={styles.containerInfoNftCard} >
                    <p className={styles.titlePrincipal}>Amazing digital Art</p>
                    <p className={styles.ethPrice} style={{ margin: "0px", fontSize: "14px" }}>{nft.instantPrice}</p>
                </div>
                <div className={styles.containerUsersStock}  >
                    <div className={styles.bidUsersContainer}>
                        {nft.bidUsers.map((biduser, i) => {
                            return (
                                <Image key={`${biduser.id}+${i}`} id='bidUserImage' src={biduser.avatar} width={24} height={24} className={styles.bidUsersPerfil} alt='bidUsers' />
                            )
                        })}
                    </div>
                    <p className={styles.stock}>{nft.stock} in stock</p>
                </div>
                <div className={`${styles.containerBidsCard} ${styles.borderTop}`}>
                    <div className={`${styles.row} ${styles.center}`}>
                        <p className={styles.titleBid}><Image style={{ paddingRight: "4px" }} src="/filter.svg" alt="highest-bid" width={16} height={16} />Highest bid </p><p className={styles.highBid}>{nft.highestBid}</p>
                    </div>
                    <p className={styles.titleBid}>New bid 🔥</p>
                </div>
            </div>
        </div>)
};
export default NftCard
