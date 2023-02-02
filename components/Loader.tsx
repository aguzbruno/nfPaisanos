import styles from "../styles/Catalogue.module.css";
import Image from "next/image";

type Props = {
    size: number;
};

const Loader: React.FC<Props> = ({ size }) => {
    return (
        <div className={styles.loadMoreContainer} style={{ marginLeft: "0px" }}>
            <Image
                className={styles.loader}
                src="/loader.svg"
                alt="loader"
                width={size}
                height={size}
            />
        </div>
    );
};
export default Loader;
