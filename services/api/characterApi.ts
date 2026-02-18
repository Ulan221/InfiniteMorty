import axios from "axios";
import {ApiResponse} from "@/constants/types";

const URL = "https://rickandmortyapi.com/api/character";

export const getData = async (page: number = 1) => {
    try {
        const response = await axios.get<ApiResponse>(URL, {
            params: {
                page: page,
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}
