/** @format */

import { create } from "zustand";
import { Nft, Filters } from "../types";
import { stringEthToNumber } from "../utils";
type OrderFn = (nfts: Nft[], filters: Filters)=> Nft[]


interface NftStore {
    allNfts: Nft[];
    nftsFilteredAndOrder: Nft[];
    favoritesNfts: Nft[];
    selectedFavorite?: Nft;
    filters: Filters;
    setAllNfts: (nfts: Nft[]) => void;
    setNftsFilteredAndOrder: (nfts: Nft[]) => void;
    setFavorites: (nfts: Nft[]) => void;
    setSelectedFavorite: (nft: Nft) => void;
    setFilters: (filters: Filters,orderFn:OrderFn) => void;
    setSearchCreator: (search: string) => void;
    resetFilters: () => void;
}

export const useNftStore = create<NftStore>()((set) => ({
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
    setFilters: (filters: Filters,orderFn:OrderFn) => {
        set((state) => {
            return {
                ...state,
                nftsFilteredAndOrder: orderAndFilter(state, filters,orderFn),
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

function orderAndFilter(state: NftStore, filters: Filters,orderFn:OrderFn) {
    const nftsFilteredByCategory = filterByCategory(state, filters);
    const nftsFilteredByPrice = filterByPrice(nftsFilteredByCategory, filters);
    const nftsFilteredByColor = filterByColor(nftsFilteredByPrice, filters);
    // const nftsOrderedByDate = orderByDate(nftsFilteredByColor, filters);

    return orderFn(nftsFilteredByColor, filters);
}

export function orderByLikes(nfts: Nft[], filters: Filters) {
    let orderByLikes;
    if (filters.likesFilter === "Most liked") {
        orderByLikes = nfts.sort(
            (productA, productB) => productB["likes"] - productA["likes"]
        ); //Menor a mayor
    } else {
        orderByLikes = nfts.sort(
            (productA: Nft, productB: Nft) =>
                productA["likes"] - productB["likes"]
        );
    }
    return orderByLikes;
}
export function orderByDate(nfts: Nft[], filters: Filters): Nft[] {
    if (filters.timeFilter === "Newest") {
        return nfts.sort(function (a, b) {
            return (
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            );
        });
    }
    return nfts.sort(function (a, b) {
        return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    });
}


function filterByCategory(state: NftStore, filters: Filters) {
    if (filters.category === "All") {
        return state.allNfts;
    } else {
        return state.allNfts.filter(
            (element: any) => element.type === filters.category
        );
    }
}
function filterByPrice(nfts: Nft[], filters: Filters) {
    return nfts.filter(
        (element: any) =>
            Number(stringEthToNumber(element.instantPrice)) > filters.priceRange
    );
}
function filterByColor(nfts: Nft[], filters: Filters) {
    if (filters.colorFilter === "All colors") {
        return nfts;
    } else {
        return nfts.filter(
            (element: any) =>
                element.attributes.color === filters.colorFilter.toLowerCase()
        );
    }
}

