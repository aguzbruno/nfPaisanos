/** @format */

import { create } from "zustand";
import { Nft, Filters } from "../types";
import { stringEthToNumber } from "../utils";

interface nftStore {
    allNfts: Nft[];
    nftsFilteredAndOrder: Nft[];
    favoritesNfts: Nft[];
    selectedFavorite?: Nft;
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
                    element.author.toLowerCase().includes(search.toLowerCase())
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
    const nftsOrderedByDate = orderByDate(nftsFilteredByColor, filters);

    return orderByLikes(nftsOrderedByDate, filters);
}

function orderByLikes(nfts: any, filters: any) {
    let orderByLikes;
    if (filters.likesFilter === "Most liked") {
        orderByLikes = nfts.sort(
            (productA: any, productB: any) =>
                productB["likes"] - productA["likes"]
        ); //Menor a mayor
    } else {
        orderByLikes = nfts.sort(
            (productA: any, productB: any) =>
                productA["likes"] - productB["likes"]
        ); 
    }
    return orderByLikes;
}
function filterByCategory(state: any, filters: any) {
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
function orderByDate(nfts:any,filters:any){
    const nftsOrderByDate =nfts.sort(
        (a:any,b:any) => 
            a['createdAt'] - b['createdAt']
        )
    return nftsOrderByDate
    }
