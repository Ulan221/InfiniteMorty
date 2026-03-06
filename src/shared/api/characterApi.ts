import axios from "axios";
import {ApiResponse} from "@/constants/types";

const URL = "https://rickandmortyapi.com/api/character";

export const getCharactersPage = async (page: number = 1): Promise<ApiResponse> => {
    const response = await axios.get<ApiResponse>(URL, {
        params: {page}
    });
    return response.data;
}
