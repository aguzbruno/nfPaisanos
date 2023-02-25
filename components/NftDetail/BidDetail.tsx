import type { Nft } from "../../types";
import styles from "../../styles/NftDetail.module.css";
import Image from "next/image";
import Countdown from "./Countdown";
import { parseStringToEth } from "../../utils/parseStringToEth";

type Props = {
    selectedFavorite: Nft;
    ethPrice: string;
};



const BidDetail: React.FC<Props> = ({ selectedFavorite, ethPrice }) => {
    const ethPriceOfNft = (
        parseStringToEth(ethPrice) *
        Number(selectedFavorite.highestBid.slice(0, 5))
    ).toFixed(2);

    return (
        <div className={styles.bidContainer}>
            <div className={styles.currentBidContainer}>
                <p className={styles.currentBid}>Current Bid</p>
                <p className={styles.highestBid}>
                    {selectedFavorite.highestBid}
                </p>
                <p className={styles.ethPrice}>${ethPriceOfNft}</p>
            </div>
            <div className={styles.endingContainer}>
                <Countdown date={selectedFavorite.endsAt} />
            </div>
        </div>
    );
};
export default BidDetail;
