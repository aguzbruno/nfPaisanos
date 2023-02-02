import type { Nft } from "../../types";
import styles from "../../styles/NftDetail.module.css";
import Image from "next/image";

type Props = {
    selectedFavorite: Nft;
};

const HeaderDetail: React.FC<Props> = ({ selectedFavorite }) => {
    return (
        <div className={styles.row} style={{ gap: "15px" }}>
            <div className={styles.row} style={{ width: "100%" }}>
                <Image
                    className={styles.imageSmall}
                    src={selectedFavorite.authorAvatar}
                    alt="author-nft-image"
                    width={40}
                    height={40}
                />
                <div className={styles.col}>
                    <p className={styles.creatorLabel}>Creator</p>
                    <p className={styles.authorLabel}>
                        {selectedFavorite.author}
                    </p>
                </div>
            </div>
            <div className={styles.row} style={{ width: "250px" }}>
                <Image
                    className={styles.imageSmall}
                    src={"/ethPrice.svg"}
                    alt="eth-price-image"
                    width={40}
                    height={40}
                />
                <div className={styles.col}>
                    <p className={styles.creatorLabel}>Instant price</p>
                    <p className={styles.authorLabel}>
                        {selectedFavorite.instantPrice}
                    </p>
                </div>
            </div>
        </div>
    );
};
export default HeaderDetail;
