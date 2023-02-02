'use client'
import styles from '../styles/Select.module.css'
import Image from 'next/image';
import { useState } from 'react';


const Select: React.FC<any> = ({ handle, options,selected }) => {
    const [select,setSelect] = useState(true)
    function handleSelected(option:string){
        setSelect(!select)
        console.log(`Seleccionamos ${option} en selected`)
        handle(option)

    }
    return (
        // <div className={styles.selectContainer}>
        //     <select className={styles.select} onChange={(e) => { handle(e) }}>

        //         {options.map((option1: any, i: any) => {
        //             return (
        //                 <option key={i} className={styles.option} value={option1}>{option1}</option>
        //             )
        //         })}
        //     </select>
        //     <div className={styles.containerDownArrow}>
        //         <Image src="/down-arrow.svg" alt="select arrow" width={12} height={12} />
        //     </div>
        // </div>

                <div className={styles.dropdown} >
            <div onClick={()=>{setSelect(!select)}} className={styles.select + ' '+(select ? styles.select : styles.selectClicked)} >
                <span className={styles.selected}>{selected}</span>
                <div className={styles.containerDownArrow}>
                    <Image src="/down-arrow.svg" alt="select arrow" width={12} height={12} />
                </div>
            </div>
            <ul  className={styles.menu + ' '+(select ? styles.menu : styles.menuOpen)} onMouseLeave={()=>setSelect(true)}>
                {options.map((option: any, i: any) => {
                    return (
                        <li key={i} onClick={()=>{handleSelected(option)}} className={styles.menuLi} >{option}</li>
                    )
                })}
            </ul>
        </div>



    )
};
export default Select;



