import '../styles/globals.css'
import { getApiKey, getNfts,getFavoritesNfts,getEthPrice } from "./nfts-api";
import Header from '../components/Header';
import Container from '../components/Container';

const Home = async ({ }) => {
  const apiKey = await getApiKey();
  // const nfts = await getNfts(apiKey);
  // const favoritesNfts = await getFavoritesNfts(apiKey);
  // const ethPrice = await getEthPrice(apiKey);
  const [nfts, favoritesNfts, ethPrice] = await Promise.all([getNfts(apiKey),getFavoritesNfts(apiKey),getEthPrice(apiKey)])
  return (
    <main >
      <Header />
      <Container nfts={nfts} favoritesNfts = {favoritesNfts} ethPrice ={ethPrice}/>
    </main>
  );
}
export default Home;
