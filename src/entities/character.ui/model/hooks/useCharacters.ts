import {useInfiniteQuery} from "@tanstack/react-query";
import {getCharactersPage} from "@/src/shared/api/characterApi";


export const useCharacters = () => {
    return useInfiniteQuery ({
        queryKey: ['characters'],
        queryFn: ({ pageParam }) => getCharactersPage(pageParam),

        initialPageParam: 1,

        getNextPageParam: (lastPage ) => {
            const nextUrl = lastPage.info.next;

            if (!nextUrl) {
                return undefined;
            }

            const url = new URL(nextUrl);
            return Number(url.searchParams.get("page"));
        }
    });
};
