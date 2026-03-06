import {Character} from "@/src/entities/character.ui/model/types";


export interface ApiResponse {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: Character[];
}