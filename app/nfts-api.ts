import type { Nft } from "../types";

export const getApiKey = async ():Promise<string> => {
    const apiKey = await fetch(
        "http://challenges.us-east-1.elasticbeanstalk.com/login",
        {
            method: "POST",
            body: JSON.stringify({
                name: "agustin",
                email: "aguzbruno1@gmail.com"
            }),
        }
    )
    const key = await apiKey.json()
    return key.key as string
};
export const getFavoritesNfts = async (apiKey:string) => {
    const favoritesNfts:Nft[] = await fetch('http://challenges.us-east-1.elasticbeanstalk.com/nfpaisanos/popular',{
        headers: {
          'apiKey': apiKey
        }}).then(response => response.json());
        // favoritesNfts[0].endsAt = '2022-12-07T14:22:33.000Z'
    return favoritesNfts;
};
export const getNfts = async (apiKey:string) => {
    const NFTS:Nft[] = await fetch('http://challenges.us-east-1.elasticbeanstalk.com/nfpaisanos/aunctions',{
        headers: {
          'apiKey': apiKey
        }}).then(response => response.json());
    return NFTS;
};
export const getEthPrice = async (apiKey:string) => {
    const ethPrice= await fetch('http://challenges.us-east-1.elasticbeanstalk.com/nfpaisanos/eth-price',{
        headers: {
          'apiKey': apiKey
        }}).then(response => response.json());
    return ethPrice.usd;
};
