/** @format */

import { create } from "zustand";
import { Nft, Filters } from "../types";
import { stringEthToNumber } from "../utils";

interface nftStore {
    allNfts: Nft[];
    nftsFilteredAndOrder: Nft[];
    favoritesNfts: Nft[];
    selectedFavorite: Nft;
    filters: Filters;
    setAllNfts: (nfts: Nft[]) => void;
    setNftsFilteredAndOrder: (nfts: Nft[]) => void;
    setFavorites: (nfts: Nft[]) => void;
    setSelectedFavorite: (nft: Nft) => void;
    setFilters: (filters: Filters) => void;
    setSearchCreator: (search: string) => void;
    resetFilters: () => void;
}

export const useNftStore = create<nftStore>()((set) => ({
    allNfts: [],
    nftsFilteredAndOrder: [],
    favoritesNfts: [],
    selectedFavorite: {
        id: 19,
        instantPrice: "1.00 ETH",
        highestBid: "0.012 ETH",
        author: "Martin Russo",
        authorAvatar:
            "https://res.cloudinary.com/dvmll0ruo/image/upload/v1657153929/NFPAISANOS/06_mjddoi.png",
        type: "Art",
        stock: 1,
        likes: 30,
        createdAt: "2022-06-10T11:10:33.000Z",
        endsAt: "2022-07-06T11:42:33.000Z",
        media: {
            id: 13,
            image: "https://res.cloudinary.com/dvmll0ruo/image/upload/c_scale,w_1000/v1657121532/NFPAISANOS/img_122_s2bk3s.png",
            image2x:
                "https://res.cloudinary.com/dvmll0ruo/image/upload/c_scale,w_1500/v1657121532/NFPAISANOS/img_122_s2bk3s.png",
        },
        attributes: { id: 13, color: "black", type: "legendary" },
        bidUsers: [
            {
                id: 8,
                name: "Nicolas Sieiro",
                avatar: "https://res.cloudinary.com/dvmll0ruo/image/upload/v1657153929/NFPAISANOS/02_nqwu5e.png",
            },
            {
                id: 8,
                name: "Nicolas Sieiro",
                avatar: "https://res.cloudinary.com/dvmll0ruo/image/upload/v1657153929/NFPAISANOS/02_nqwu5e.png",
            },
        ],
    },
    filters: {
        likesFilter: "Most liked",
        colorFilter: "All colors",
        priceRange: 0,
        category: "All",
        timeFilter: "Newest",
    },
    setAllNfts: (nfts: Nft[]) => {
        set((state) => {
            return {
                ...state,
                allNfts: nfts,
            };
        });
    },
    setNftsFilteredAndOrder: (nfts: Nft[]) => {
        // const nftsFilterAndOrder = filterAndOrder(nft)
        set((state) => {
            return {
                ...state,
                nftsFilteredAndOrder: nfts,
            };
        });
    },
    setFavorites: (favoritesNfts: Nft[]) => {
        set((state) => {
            return {
                ...state,
                favoritesNfts: favoritesNfts,
            };
        });
    },
    setSelectedFavorite: (nft: Nft) => {
        set((state) => {
            return {
                ...state,
                selectedFavorite: nft,
            };
        });
    },
    setSearchCreator: (search: string) => {
        //Me falta ignorar capital letters
        set((state) => {
            if (search.length) {
                const nftsSearchCreator = state.allNfts.filter((element) =>
                    element.author.includes(search)
                );
                return {
                    ...state,
                    nftsFilteredAndOrder: nftsSearchCreator,
                };
            } else {
                return {
                    ...state,
                    nftsFilteredAndOrder: state.allNfts,
                };
            }
        });
    },
    setFilters: (filters: Filters) => {
        set((state) => {
            return {
                ...state,
                nftsFilteredAndOrder: orderAndFilter(state, filters),
                filters: filters,
            };
        });
    },
    resetFilters: () => {
        set((state) => {
            return {
                ...state,
                filters: {
                    likesFilter: "Most liked",
                    colorFilter: "All colors",
                    priceRange: 0,
                    category: "All",
                    timeFilter: "Newest",
                },
            };
        });
    },
}));

function orderAndFilter(state: any, filters: any) {
    console.log("esto llego a la maestra");
    console.log(filters);
    const nftsFilteredByCategory = filterByCategory(state, filters);
    const nftsFilteredByPrice = filterByPrice(nftsFilteredByCategory, filters);
    const nftsFilteredByColor = filterByColor(nftsFilteredByPrice, filters);

    return orderByLikes(nftsFilteredByColor, filters);
}

function orderByLikes(nfts: any, filters: any) {
    let orderByLikes;
    if (filters.likesFilter === "Most liked") {
        orderByLikes = nfts.sort(
            (productA: any, productB: any) =>
                productB["likes"] - productA["likes"]
        ); //Menor a mayor para mayor a menor cambiar a por b en la ultima linea dsps de la flecha
    } else {
        orderByLikes = nfts.sort(
            (productA: any, productB: any) =>
                productA["likes"] - productB["likes"]
        ); //Menor a mayor para mayor a menor cambiar a por b en la ultima linea dsps de la flecha
    }
    return orderByLikes;
}
function filterByCategory(state: any, filters: any) {
    console.log("Ordene por categoria");
    console.log(filters.category);
    if (filters.category === "All") {
        return state.allNfts;
    } else {
        return state.allNfts.filter(
            (element: any) => element.type === filters.category
        );
    }
}
function filterByPrice(nfts: any, filters: any) {
    return nfts.filter(
        (element: any) =>
            Number(stringEthToNumber(element.instantPrice)) > filters.priceRange
    );
}
function filterByColor(nfts: any, filters: any) {
    if (filters.colorFilter === "All colors") {
        return nfts;
    } else {
        return nfts.filter(
            (element: any) =>
                element.attributes.color === filters.colorFilter.toLowerCase()
        );
    }
}
// function orderByDate(nfts:any,filters:any){
//     if(filters.timeFilter ==='Newest'){
//         return nfts
//     }else{
//         return nfts.filter(
//             ((element:any)=> (element.attributes.color) === filters.colorFilter.toLowerCase()))
//         }
//     }
