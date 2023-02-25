import styles from "../../styles/Catalogue.module.css";
import Image from "next/image";


const Loader: React.FC = () => {
    return (
        <div className={styles.loadMoreContainer} style={{ marginLeft: "0px" }}>
           <h1 style={{ color: "#fff" }}>No se han encontrado resultados</h1>
        </div>
    );
};
export default Loader;
