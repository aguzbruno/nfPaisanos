import styles from '../styles/NavBar.module.css'
import Logo from '../assets/nfpaisanos.png'
import Image from 'next/image'
import { DM_Sans } from '@next/font/google'

const dmFont = DM_Sans({ weight: "400", subsets: ["latin"] });
export default function NavBar({ }) {

    return <div className={styles.container}>
        <div className={styles.containerNavbarInfo}>
            <div className={styles.containerLeftInfo}>

                <div className={styles.dividerRight} style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0px", justifyContent: "center" }}>
                    <Image src="/nfpaisanos.png" alt="logo nfpaisanos" width={32} height={32} />
                    <a className={styles.logoNfpaisanos}>NFPaisanos</a>
                </div>
                <a className={styles.greyLink}>Discover </a>
                <a className={styles.greyLink}>What we do </a>

            </div>
            <Image className={styles.hamburguerMenu} src="/hamburguerMenu.svg" alt="logo nfpaisanos" width={32} height={32} />
            <div className={styles.button}>Connect Wallet </div>
        </div>
    </div>;
};