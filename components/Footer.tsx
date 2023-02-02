import styles from "../styles/Footer.module.css";
import Image from "next/image";

export default function Footer() {
    return (
        <div className={styles.containerFooter}>
            <div className={styles.footer}>
                <div className={styles.logoContainer}>
                    <Image
                        src="/nfpaisanos.png"
                        alt="logo nfpaisanos"
                        width={32}
                        height={32}
                    />
                    <a className={styles.logoNfpaisanos}>NFPaisanos</a>
                </div>
                <p className={styles.textFooter}>The New Creative Economy. </p>
            </div>
            <span className={styles.spanFooter}>Created with ❤ XXXX</span>
        </div>
    );
}
