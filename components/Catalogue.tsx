'use client'
import type { Nft,Filters } from '../types';
import NftCard from './NftCard';
import styles from '../styles/Catalogue.module.css'
import Select from './Select';
import { useState } from 'react';
import Image from 'next/image';
import { useNftStore } from '../store/nftStore';
import { useEffect } from 'react';

const Catalogue: React.FC = () => {
    const { setFavorites,setFilters,resetFilters,nftsFilteredAndOrder,filters } = useNftStore((state) => state)
    const [selectedColor, setSelectedColor] = useState('All colors')
    const [selectedLiked, setSelectedLiked] = useState('Most liked')
    const [priceRange, setPriceRange] = useState(0)
    const likesOptions = ['Most liked', 'Least liked']
    const colorOptions = ['All colors', 'Black', 'Orange', 'Pink', 'Purple']


    function handleChangeColors(selected: string) {
        setSelectedColor(selected)
        console.log(`Seleccionamos ${selected}`)
    }
    function handleChangeLikes(selected: string) {
        setSelectedLiked(selected)
        console.log(`Seleccionamos ${selected}`)
    }
    function handlePriceRange(e: any) {
        setPriceRange(e.target.value)
        
    }
    function handleResetFilters(){
        setSelectedColor('All colors')
        setSelectedLiked('Most liked')
        setPriceRange(0)
        resetFilters()
    }
    useEffect(()=>{
        setSelectedColor(filters.colorFilter)
        setSelectedLiked(filters.likesFilter)
        setPriceRange(filters.priceRange)
    },[filters])

    useEffect(() => {
        const filtersChanged = {
            ...filters,
            likesFilter:selectedLiked,
            colorFilter:selectedColor,
            priceRange:Number(priceRange),
        }
        console.log(filtersChanged)
        setFilters(filtersChanged);
    }, [selectedColor,selectedLiked,priceRange])

    return (
        <div className={styles.catalogueContainer}>
            <div className={styles.catalogue}>
                <div className={styles.filtersContainer}>
                    <label style={{ transform: 'translate(0,-45px' }}>PRICE RANGE</label>

                    <div className={styles.sliderContainer}>
                        <div className={styles.field}>
                            <input className={styles.slider} type="range" min="0" max="10" step="0.001" onChange={(e)=>{handlePriceRange(e)}} value={priceRange} />
                            <div className={styles.valueContainer}>
                                <span className={styles.labelRange}>{priceRange}
                                    <Image style={{ position: "absolute", top: "0px", left: "0px", transform: "translate(225%, 265%)", justifyContent: "center" }} src="/arrowSlideRange.svg" alt="arrow" width={12} height={12} />
                                </span>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <span>0.000 ETH</span>
                                <span>10 ETH</span>
                            </div>
                        </div>

                    </div>
                    <label>LIKES</label>
                    <Select handle={handleChangeLikes} options={likesOptions} selected={selectedLiked} />
                    <label>OPEN</label>
                    <Select handle={handleChangeColors} options={colorOptions} selected={selectedColor} />
                    <div className={styles.containerResetFilters} >
                        <Image src="/cross.svg" alt="cross" width={25} height={25} onClick={()=>{handleResetFilters()}} /><p className={styles.textResetFilter} onClick={()=>{handleResetFilters()}}>Reset filter</p>
                    </div>
                </div>
                <div className={styles.cardsContainer} >
                    {nftsFilteredAndOrder.map((nft, i) => {
                        return (
                            <NftCard nft={nft} key={`${nft.id}+${i}`} />
                        )
                    })}

                </div>


            </div>;
            {nftsFilteredAndOrder?.length >= 6 ? (
                <div className={styles.loadMoreContainer}>
                    <div className={styles.button}>
                        <Image className={styles.loader} src="/loader.svg" alt="loader" width={16} height={16} />
                        Load more
                    </div>
                </div>) : (null)

            }
        </div>)
};
export default Catalogue;
