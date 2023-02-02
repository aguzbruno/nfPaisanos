'use client'
import styles from '../styles/SearchBar.module.css'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useNftStore } from '../store/nftStore';

const SearchBar: React.FC = () => {
    const [search,setSearch] = useState('')
    const [isMobile,setIsMobile] = useState(false)
    const { setSearchCreator } = useNftStore((state) => state)

    const handleResize = () => {
        if (window.innerWidth < 1200) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
      }
      
      // create an event listener
      useEffect(() => {
        window.addEventListener("resize", handleResize)
      })

    useEffect(()=>{
        setSearchCreator(search)
    },[search])
    
    return (
        <div className={styles.searchBarContainer} >
            <div className={styles.searchBar} >
                <input
                    onChange={(e)=>{setSearch(e.target.value)}}
                    className={styles.inputSearch}
                    type="text"
                    placeholder="Search here by creator"
                />
                {isMobile ?(
                    <Image className={styles.buttonSearch} src="/searchButton2.svg" alt="search-button" width={24} height={24} />
                ):(
                    <Image className={styles.buttonSearch} src="/searchButton.svg" alt="search-button" width={40} height={40} />
                )
                }
            </div>
        </div>)
};
export default SearchBar;
